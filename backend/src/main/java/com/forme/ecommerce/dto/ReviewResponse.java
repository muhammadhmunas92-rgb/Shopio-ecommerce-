package com.forme.ecommerce.dto;

import com.forme.ecommerce.model.Review;
import java.time.LocalDateTime;

public class ReviewResponse {

    private Long id;
    private Long userId;
    private String username;
    private String userFullName;
    private Long productId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewResponse() {}

    public ReviewResponse(Review review) {
        this.id = review.getId();
        if (review.getUser() != null) {
            this.userId = review.getUser().getId();
            this.username = review.getUser().getUsername();
            this.userFullName = review.getUser().getFullName();
        }
        if (review.getProduct() != null) {
            this.productId = review.getProduct().getId();
        }
        this.rating = review.getRating();
        this.comment = review.getComment();
        this.createdAt = review.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
