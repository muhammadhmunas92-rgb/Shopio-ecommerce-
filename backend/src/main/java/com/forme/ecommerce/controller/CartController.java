package com.forme.ecommerce.controller;

import com.forme.ecommerce.dto.*;
import com.forme.ecommerce.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Shopping Cart", description = "Endpoints for managing user shopping cart items and subtotals")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @Operation(summary = "Get user shopping cart", description = "Retrieves current cart items, total quantity, and calculated price for a user.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart retrieved successfully",
                    content = @Content(schema = @Schema(implementation = CartResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            @Parameter(description = "ID of user whose cart to retrieve", required = true) @RequestParam Long userId) {
        CartResponse cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success("Cart retrieved successfully", cart));
    }

    @Operation(summary = "Add item to shopping cart", description = "Adds a product to the user's cart or increments quantity if already present.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Item added to cart",
                    content = @Content(schema = @Schema(implementation = CartResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Out of stock or invalid quantity")
    })
    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(@Valid @RequestBody AddToCartRequest request) {
        CartResponse cart = cartService.addToCart(request);
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
    }

    @Operation(summary = "Update cart item quantity", description = "Modifies the quantity of an item in the user's cart.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart item updated",
                    content = @Content(schema = @Schema(implementation = CartResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Cart item not found")
    })
    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @Parameter(description = "Cart item ID", required = true) @PathVariable Long itemId,
            @Parameter(description = "User ID", required = true) @RequestParam Long userId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        CartResponse cart = cartService.updateCartItemQuantity(userId, itemId, request);
        return ResponseEntity.ok(ApiResponse.success("Cart item updated", cart));
    }

    @Operation(summary = "Remove item from cart", description = "Deletes a specific line item from the user's cart.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Item removed",
                    content = @Content(schema = @Schema(implementation = CartResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Cart item not found")
    })
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeCartItem(
            @Parameter(description = "Cart item ID", required = true) @PathVariable Long itemId,
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        CartResponse cart = cartService.removeCartItem(userId, itemId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
    }

    @Operation(summary = "Clear shopping cart", description = "Empties all items from the user's cart.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart cleared")
    })
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully", null));
    }
}
