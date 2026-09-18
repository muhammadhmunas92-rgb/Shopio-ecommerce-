package com.forme.ecommerce.dto;

import com.forme.ecommerce.model.CartItem;
import java.math.BigDecimal;

public class CartItemResponse {

    private Long id;
    private Long productId;
    private String productName;
    private String productModelNumber;
    private String productImageUrl;
    private String productColor;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;

    public CartItemResponse() {}

    public CartItemResponse(CartItem item) {
        this.id = item.getId();
        if (item.getProduct() != null) {
            this.productId = item.getProduct().getId();
            this.productName = item.getProduct().getName();
            this.productModelNumber = item.getProduct().getModelNumber();
            this.productImageUrl = item.getProduct().getImageUrl();
            this.productColor = item.getProduct().getColor();
            this.unitPrice = item.getProduct().getPrice();
            this.quantity = item.getQuantity();
            this.subtotal = item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductModelNumber() {
        return productModelNumber;
    }

    public void setProductModelNumber(String productModelNumber) {
        this.productModelNumber = productModelNumber;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public String getProductColor() {
        return productColor;
    }

    public void setProductColor(String productColor) {
        this.productColor = productColor;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
