package com.forme.ecommerce.service;

import com.forme.ecommerce.dto.AuthResponse;
import com.forme.ecommerce.dto.LoginRequest;
import com.forme.ecommerce.dto.RegisterRequest;
import com.forme.ecommerce.dto.UserDTO;
import com.forme.ecommerce.exception.BadRequestException;
import com.forme.ecommerce.exception.ResourceNotFoundException;
import com.forme.ecommerce.model.User;
import com.forme.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username '" + request.getUsername() + "' is already taken.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email '" + request.getEmail() + "' is already registered.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Storing for simple academic/demo EAD scope
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole("CUSTOMER");

        User savedUser = userRepository.save(user);

        // Generate demo session token
        String token = "forme-jwt-" + UUID.randomUUID();
        return new AuthResponse(true, "User registered successfully", token, new UserDTO(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new BadRequestException("Invalid username/email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("Invalid username/email or password");
        }

        String token = "forme-jwt-" + UUID.randomUUID();
        return new AuthResponse(true, "Login successful", token, new UserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO getUserProfile(Long userId) {
        User user = getUserById(userId);
        return new UserDTO(user);
    }

    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }
}
