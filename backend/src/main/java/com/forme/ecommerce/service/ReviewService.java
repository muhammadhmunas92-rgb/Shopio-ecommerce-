package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.CreateReviewRequest;
import com.forme.ecommerce.dto.ReviewResponse;
import com.forme.ecommerce.model.Product;
import com.forme.ecommerce.model.Review;
import com.forme.ecommerce.model.User;
import com.forme.ecommerce.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final ProductService productService;

    public ReviewService(ReviewRepository reviewRepository,
                         UserService userService,
                         ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.productService = productService;
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(ReviewResponse::new)
                .collect(Collectors.toList());
    }

    public ReviewResponse addReview(Long productId, CreateReviewRequest request) {
        User user = userService.getUserById(request.getUserId());
        Product product = productService.getProductEntityById(productId);

        Review review = new Review(user, product, request.getRating(), request.getComment());
        Review saved = reviewRepository.save(review);
        return new ReviewResponse(saved);
    }
}
