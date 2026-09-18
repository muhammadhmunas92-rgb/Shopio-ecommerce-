package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.FavoriteResponse;
import com.forme.ecommerce.exception.BadRequestException;
import com.forme.ecommerce.model.Favorite;
import com.forme.ecommerce.model.Product;
import com.forme.ecommerce.model.User;
import com.forme.ecommerce.repository.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final ProductService productService;

    public FavoriteService(FavoriteRepository favoriteRepository, 
                           UserService userService, 
                           ProductService productService) {
        this.favoriteRepository = favoriteRepository;
        this.userService = userService;
        this.productService = productService;
    }

    @Transactional(readOnly = true)
    public List<FavoriteResponse> getFavorites(Long userId) {
        return favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(FavoriteResponse::new)
                .collect(Collectors.toList());
    }

    public FavoriteResponse addFavorite(Long userId, Long productId) {
        if (favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new BadRequestException("Product is already in favorites.");
        }

        User user = userService.getUserById(userId);
        Product product = productService.getProductEntityById(productId);

        Favorite favorite = new Favorite(user, product);
        Favorite saved = favoriteRepository.save(favorite);
        return new FavoriteResponse(saved);
    }

    public void removeFavorite(Long userId, Long productId) {
        if (!favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new BadRequestException("Product is not in favorites.");
        }
        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long productId) {
        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }
}
