package com.forme.ecommerce.repository;

import com.forme.ecommerce.model.Order;
import com.forme.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findAllByOrderByOrderDateDesc();
}
