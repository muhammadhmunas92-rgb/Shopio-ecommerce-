package com.forme.ecommerce.dto;

import com.forme.ecommerce.model.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {

    private Long id;
    private String name;
    private String modelNumber;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
    private String secondaryImageUrl;
    private String color;
    private String badge;
    private String collectionTag;
    private Boolean isFeatured;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
    private Double averageRating = 0.0;
    private Integer reviewCount = 0;
    private LocalDateTime createdAt;

    public ProductResponse() {}

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.modelNumber = product.getModelNumber();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        this.imageUrl = product.getImageUrl();
        this.secondaryImageUrl = product.getSecondaryImageUrl();
        this.color = product.getColor();
        this.badge = product.getBadge();
        this.collectionTag = product.getCollectionTag();
        this.isFeatured = product.getIsFeatured();
        if (product.getCategory() != null) {
            this.categoryId = product.getCategory().getId();
            this.categoryName = product.getCategory().getName();
            this.categorySlug = product.getCategory().getSlug();
        }
        this.createdAt = product.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModelNumber() {
        return modelNumber;
    }

    public void setModelNumber(String modelNumber) {
        this.modelNumber = modelNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSecondaryImageUrl() {
        return secondaryImageUrl;
    }

    public void setSecondaryImageUrl(String secondaryImageUrl) {
        this.secondaryImageUrl = secondaryImageUrl;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getCollectionTag() {
        return collectionTag;
    }

    public void setCollectionTag(String collectionTag) {
        this.collectionTag = collectionTag;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean featured) {
        isFeatured = featured;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

    public void setCategorySlug(String categorySlug) {
        this.categorySlug = categorySlug;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
