package com.forme.ecommerce.controller;

import com.forme.ecommerce.dto.ApiResponse;
import com.forme.ecommerce.dto.CreateReviewRequest;
import com.forme.ecommerce.dto.ReviewResponse;
import com.forme.ecommerce.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Customer Reviews", description = "Endpoints for retrieving and posting product ratings and reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Operation(summary = "Get product reviews", description = "Retrieves all verified customer reviews for a specific bag product.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Reviews retrieved",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReviewResponse.class))))
    })
    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getProductReviews(
            @Parameter(description = "Product ID", required = true) @PathVariable Long productId) {
        List<ReviewResponse> reviews = reviewService.getReviewsForProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", reviews));
    }

    @Operation(summary = "Add a product review", description = "Submits a rating (1 to 5 stars) and review text for a product.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Review submitted",
                    content = @Content(schema = @Schema(implementation = ReviewResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error")
    })
    @PostMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(
            @Parameter(description = "Product ID", required = true) @PathVariable Long productId,
            @Valid @RequestBody CreateReviewRequest request) {
        ReviewResponse response = reviewService.addReview(productId, request);
        return new ResponseEntity<>(ApiResponse.success("Review submitted successfully", response), HttpStatus.CREATED);
    }
}
