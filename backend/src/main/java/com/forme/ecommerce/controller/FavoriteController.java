package com.forme.ecommerce.controller;

import com.forme.ecommerce.dto.ApiResponse;
import com.forme.ecommerce.dto.FavoriteResponse;
import com.forme.ecommerce.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@Tag(name = "Favorites / Wishlist", description = "Endpoints for managing customer bag wishlists and saved items")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @Operation(summary = "Get user favorites", description = "Retrieves all saved wishlist items for a user.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Favorites retrieved",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = FavoriteResponse.class))))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<FavoriteResponse>>> getFavorites(
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        List<FavoriteResponse> favorites = favoriteService.getFavorites(userId);
        return ResponseEntity.ok(ApiResponse.success("Favorites retrieved", favorites));
    }

    @Operation(summary = "Add product to favorites", description = "Saves a product to user's favorites wishlist.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Added to favorites",
                    content = @Content(schema = @Schema(implementation = FavoriteResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Already in favorites")
    })
    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<FavoriteResponse>> addFavorite(
            @Parameter(description = "Product ID", required = true) @PathVariable Long productId,
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        FavoriteResponse response = favoriteService.addFavorite(userId, productId);
        return new ResponseEntity<>(ApiResponse.success("Added to favorites", response), HttpStatus.CREATED);
    }

    @Operation(summary = "Remove product from favorites", description = "Removes a product from user's wishlist.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Removed from favorites"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Not in favorites")
    })
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeFavorite(
            @Parameter(description = "Product ID", required = true) @PathVariable Long productId,
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.ok(ApiResponse.success("Removed from favorites", null));
    }

    @Operation(summary = "Check favorite status", description = "Checks whether a product is currently saved by user.")
    @GetMapping("/check/{productId}")
    public ResponseEntity<ApiResponse<Boolean>> isFavorite(
            @Parameter(description = "Product ID", required = true) @PathVariable Long productId,
            @Parameter(description = "User ID", required = true) @RequestParam Long userId) {
        boolean isFav = favoriteService.isFavorite(userId, productId);
        return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFav));
    }
}
