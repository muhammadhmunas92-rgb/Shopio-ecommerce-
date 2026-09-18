package com.forme.ecommerce.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CartResponse {

    private List<CartItemResponse> items = new ArrayList<>();
    private Integer totalItems = 0;
    private BigDecimal totalPrice = BigDecimal.ZERO;

    public CartResponse() {}

    public CartResponse(List<CartItemResponse> items) {
        this.items = items != null ? items : new ArrayList<>();
        this.totalItems = this.items.stream().mapToInt(CartItemResponse::getQuantity).sum();
        this.totalPrice = this.items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
