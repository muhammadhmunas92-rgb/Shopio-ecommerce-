package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.AddToCartRequest;
import com.forme.ecommerce.dto.CartItemResponse;
import com.forme.ecommerce.dto.CartResponse;
import com.forme.ecommerce.dto.UpdateCartItemRequest;
import com.forme.ecommerce.exception.BadRequestException;
import com.forme.ecommerce.exception.ResourceNotFoundException;
import com.forme.ecommerce.model.CartItem;
import com.forme.ecommerce.model.Product;
import com.forme.ecommerce.model.User;
import com.forme.ecommerce.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final ProductService productService;

    public CartService(CartItemRepository cartItemRepository, 
                       UserService userService, 
                       ProductService productService) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.productService = productService;
    }

    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        List<CartItemResponse> responses = items.stream()
                .map(CartItemResponse::new)
                .collect(Collectors.toList());
        return new CartResponse(responses);
    }

    public CartResponse addToCart(AddToCartRequest request) {
        User user = userService.getUserById(request.getUserId());
        Product product = productService.getProductEntityById(request.getProductId());

        if (product.getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock (" + product.getStockQuantity() + ")");
        }

        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProduct(user, product);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQty = item.getQuantity() + request.getQuantity();
            if (product.getStockQuantity() < newQty) {
                throw new BadRequestException("Requested quantity exceeds available stock (" + product.getStockQuantity() + ")");
            }
            item.setQuantity(newQty);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem(user, product, request.getQuantity());
            cartItemRepository.save(newItem);
        }

        return getCart(request.getUserId());
    }

    public CartResponse updateCartItemQuantity(Long userId, Long cartItemId, UpdateCartItemRequest request) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!item.getUser().getId().equals(userId)) {
            throw new BadRequestException("Cart item does not belong to the user");
        }

        if (item.getProduct().getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock (" + item.getProduct().getStockQuantity() + ")");
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return getCart(userId);
    }

    public CartResponse removeCartItem(Long userId, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!item.getUser().getId().equals(userId)) {
            throw new BadRequestException("Cart item does not belong to the user");
        }

        cartItemRepository.delete(item);
        return getCart(userId);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
