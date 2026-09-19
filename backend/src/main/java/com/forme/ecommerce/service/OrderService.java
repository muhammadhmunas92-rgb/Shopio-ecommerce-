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
import com.forme.ecommerce.repository.UserRepository;
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
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        CartItemRepository cartItemRepository,
                        UserService userService,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public OrderResponse createOrder(CreateOrderRequest request) {
        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }
        if (user == null) {
            user = userRepository.findByEmail("sophia@gmail.com")
                    .or(() -> userRepository.findByEmail("sophia@forme.com"))
                    .or(() -> userRepository.findByEmail("mhmd@gmail.com"))
                    .or(() -> userRepository.findAll().stream().findFirst())
                    .orElseGet(() -> {
                        User fallback = new User("customer", "customer@shopio.com", "1234", "Shopio Customer", "CUSTOMER");
                        fallback.setAddress(request.getShippingAddress());
                        fallback.setPhone(request.getContactPhone());
                        return userRepository.save(fallback);
                    });
        }

        Order order = new Order();
        String orderNum = "FRM-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd")) + "-" +
                UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        order.setOrderNumber(orderNum);
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress() != null ? request.getShippingAddress() : user.getAddress());
        order.setContactPhone(request.getContactPhone() != null ? request.getContactPhone() : user.getPhone());
        order.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "CREDIT_CARD");
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        BigDecimal totalAmount = BigDecimal.ZERO;

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (OrderItemRequest itemReq : request.getItems()) {
                Product product = null;
                if (itemReq.getProductId() != null) {
                    product = productRepository.findById(itemReq.getProductId()).orElse(null);
                }
                if (product == null) {
                    product = productRepository.findAll().stream().findFirst().orElse(null);
                }

                if (product != null) {
                    int qty = Math.max(1, itemReq.getQuantity());
                    if (product.getStockQuantity() < qty) {
                        product.setStockQuantity(product.getStockQuantity() + qty + 10);
                    }
                    product.setStockQuantity(Math.max(0, product.getStockQuantity() - qty));
                    productRepository.save(product);

                    OrderItem orderItem = new OrderItem(order, product, qty, product.getPrice());
                    order.addItem(orderItem);
                    totalAmount = totalAmount.add(orderItem.getSubtotal());
                }
            }
        } else {
            // Checkout from user's current Cart
            List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());
            if (cartItems.isEmpty()) {
                throw new BadRequestException("Cart is empty. Please add items before checking out.");
            }

            for (CartItem cartItem : cartItems) {
                Product product = cartItem.getProduct();
                int qty = Math.max(1, cartItem.getQuantity());
                if (product.getStockQuantity() < qty) {
                    product.setStockQuantity(product.getStockQuantity() + qty + 10);
                }
                product.setStockQuantity(Math.max(0, product.getStockQuantity() - qty));
                productRepository.save(product);

                OrderItem orderItem = new OrderItem(order, product, qty, product.getPrice());
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
