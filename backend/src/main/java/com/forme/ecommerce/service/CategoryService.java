package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.CategoryRequest;
import com.forme.ecommerce.dto.CategoryResponse;
import com.forme.ecommerce.exception.BadRequestException;
import com.forme.ecommerce.exception.ResourceNotFoundException;
import com.forme.ecommerce.model.Category;
import com.forme.ecommerce.repository.CategoryRepository;
import com.forme.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(cat -> {
            CategoryResponse response = new CategoryResponse(cat);
            long count = productRepository.findByCategory(cat).size();
            response.setProductCount(count);
            return response;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Category with slug '" + request.getSlug() + "' already exists.");
        }
        Category category = new Category(
                request.getName(),
                request.getSlug(),
                request.getDescription(),
                request.getImageUrl()
        );
        Category saved = categoryRepository.save(category);
        return new CategoryResponse(saved);
    }
}
