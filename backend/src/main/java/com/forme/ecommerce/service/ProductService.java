package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.ProductRequest;
import com.forme.ecommerce.dto.ProductResponse;
import com.forme.ecommerce.exception.ResourceNotFoundException;
import com.forme.ecommerce.model.Category;
import com.forme.ecommerce.model.Product;
import com.forme.ecommerce.repository.CategoryRepository;
import com.forme.ecommerce.repository.ProductRepository;
import com.forme.ecommerce.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    public ProductService(ProductRepository productRepository, 
                          CategoryRepository categoryRepository,
                          ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.reviewRepository = reviewRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts(String categorySlug, String collectionTag, Boolean featured, String search) {
        List<Product> products;

        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.searchProducts(search.trim());
        } else if (categorySlug != null && !categorySlug.trim().isEmpty()) {
            products = productRepository.findByCategorySlug(categorySlug.trim());
        } else if (collectionTag != null && !collectionTag.trim().isEmpty()) {
            products = productRepository.findByCollectionTagIgnoreCase(collectionTag.trim());
        } else if (Boolean.TRUE.equals(featured)) {
            products = productRepository.findByIsFeaturedTrue();
        } else {
            products = productRepository.findAll();
        }

        return products.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = getProductEntityById(id);
        return mapToResponse(product);
    }

    @Transactional(readOnly = true)
    public Product getProductEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        mapRequestToEntity(request, product);
        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = getProductEntityById(id);
        mapRequestToEntity(request, product);
        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    private void mapRequestToEntity(ProductRequest request, Product product) {
        product.setName(request.getName());
        product.setModelNumber(request.getModelNumber());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setSecondaryImageUrl(request.getSecondaryImageUrl());
        product.setColor(request.getColor());
        product.setBadge(request.getBadge() != null ? request.getBadge() : "NEW");
        product.setCollectionTag(request.getCollectionTag() != null ? request.getCollectionTag() : "LATEST_DROPS");
        product.setIsFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false);

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }
    }

    public ProductResponse mapToResponse(Product product) {
        ProductResponse response = new ProductResponse(product);
        Double avg = reviewRepository.getAverageRatingForProduct(product.getId());
        Integer count = reviewRepository.getReviewCountForProduct(product.getId());
        response.setAverageRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 5.0);
        response.setReviewCount(count != null ? count : 0);
        return response;
    }
}
