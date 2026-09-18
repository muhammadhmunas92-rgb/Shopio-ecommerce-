package com.forme.ecommerce;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forme.ecommerce.dto.LoginRequest;
import com.forme.ecommerce.dto.RegisterRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Should successfully register a new customer")
    void testUserRegistration() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "marcus_test",
                "marcus.test@example.com",
                "securepass123",
                "Marcus Aurelius"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.user.username").value("marcus_test"))
                .andExpect(jsonPath("$.user.email").value("marcus.test@example.com"))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    @DisplayName("Should reject registration with duplicate email/username")
    void testDuplicateRegistration() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "duplicate_user",
                "duplicate@example.com",
                "password123",
                "Duplicate User"
        );

        // First registration
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        // Duplicate attempt
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should successfully login an existing user")
    void testUserLogin() throws Exception {
        // Register user first
        RegisterRequest reg = new RegisterRequest(
                "login_user",
                "login.user@example.com",
                "validPassword123",
                "Login Test User"
        );
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reg)))
                .andExpect(status().isCreated());

        // Attempt login
        LoginRequest login = new LoginRequest("login_user", "validPassword123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.username").value("login_user"));
    }

    @Test
    @DisplayName("Should reject login with invalid password")
    void testInvalidPasswordLogin() throws Exception {
        LoginRequest login = new LoginRequest("admin", "wrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isBadRequest());
    }
}
