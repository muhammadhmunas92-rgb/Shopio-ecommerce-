package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.CreateOrderRequest;
import com.forme.ecommerce.dto.OrderItemRequest;
import com.forme.ecommerce.dto.OrderResponse;
import com.forme.ecommerce.exception.BadRequestException;
import com.forme.ecommerce.exception.ResourceNotFoundException;
import com.forme.ecommerce.model.*;
import com.forme.ecommerce.repository.CartItemRepository;
import com.forme.ecommerce.repository.OrderRepository;
import com.forme.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        CartItemRepository cartItemRepository,
                        UserService userService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
    }

    public OrderResponse createOrder(CreateOrderRequest request) {
        User user = userService.getUserById(request.getUserId());

        Order order = new Order();
        String orderNum = "FRM-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd")) + "-" +
                UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        order.setOrderNumber(orderNum);
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setContactPhone(request.getContactPhone() != null ? request.getContactPhone() : user.getPhone());
        order.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "CREDIT_CARD");
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        BigDecimal totalAmount = BigDecimal.ZERO;

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (OrderItemRequest itemReq : request.getItems()) {
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemReq.getProductId()));

                if (product.getStockQuantity() < itemReq.getQuantity()) {
                    throw new BadRequestException("Insufficient stock for product: " + product.getName());
                }

                // Decrement stock
                product.setStockQuantity(product.getStockQuantity() - itemReq.getQuantity());
                productRepository.save(product);

                OrderItem orderItem = new OrderItem(order, product, itemReq.getQuantity(), product.getPrice());
                order.addItem(orderItem);
                totalAmount = totalAmount.add(orderItem.getSubtotal());
            }
        } else {
            // Checkout from user's current Cart
            List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());
            if (cartItems.isEmpty()) {
                throw new BadRequestException("Cart is empty. Please add items before checking out.");
            }

            for (CartItem cartItem : cartItems) {
                Product product = cartItem.getProduct();
                if (product.getStockQuantity() < cartItem.getQuantity()) {
                    throw new BadRequestException("Insufficient stock for product: " + product.getName());
                }

                // Decrement stock
                product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
                productRepository.save(product);

                OrderItem orderItem = new OrderItem(order, product, cartItem.getQuantity(), product.getPrice());
                order.addItem(orderItem);
                totalAmount = totalAmount.add(orderItem.getSubtotal());
            }

            // Clear cart
            cartItemRepository.deleteByUserId(user.getId());
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        return new OrderResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return new OrderResponse(order);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with number: " + orderNumber));
        return new OrderResponse(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId).stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc().stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }

    public OrderResponse updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        order.setStatus(newStatus.toUpperCase());
        Order updated = orderRepository.save(order);
        return new OrderResponse(updated);
    }
}
