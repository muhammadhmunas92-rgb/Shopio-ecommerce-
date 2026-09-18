package com.forme.ecommerce.dto;

import com.forme.ecommerce.model.Favorite;
import java.time.LocalDateTime;

public class FavoriteResponse {

    private Long id;
    private Long userId;
    private ProductResponse product;
    private LocalDateTime createdAt;

    public FavoriteResponse() {}

    public FavoriteResponse(Favorite favorite) {
        this.id = favorite.getId();
        if (favorite.getUser() != null) {
            this.userId = favorite.getUser().getId();
        }
        if (favorite.getProduct() != null) {
            this.product = new ProductResponse(favorite.getProduct());
        }
        this.createdAt = favorite.getCreatedAt();
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

    public ProductResponse getProduct() {
        return product;
    }

    public void setProduct(ProductResponse product) {
        this.product = product;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
