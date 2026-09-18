package com.forme.ecommerce.repository;

import com.forme.ecommerce.model.Category;
import com.forme.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByModelNumber(String modelNumber);

    Optional<Product> findByName(String name);

    List<Product> findByCategory(Category category);

    List<Product> findByCategorySlug(String slug);

    List<Product> findByCollectionTagIgnoreCase(String collectionTag);

    List<Product> findByIsFeaturedTrue();

    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.modelNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.color) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);
}
