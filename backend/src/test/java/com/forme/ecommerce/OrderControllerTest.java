package com.forme.ecommerce;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forme.ecommerce.dto.CreateOrderRequest;
import com.forme.ecommerce.dto.OrderItemRequest;
import com.forme.ecommerce.model.Product;
import com.forme.ecommerce.model.User;
import com.forme.ecommerce.repository.ProductRepository;
import com.forme.ecommerce.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    @DisplayName("Should successfully create and retrieve an order")
    void testOrderCreationAndRetrieval() throws Exception {
        User user = userRepository.findAll().stream().findFirst().orElseThrow();
        Product product = productRepository.findAll().stream().findFirst().orElseThrow();

        CreateOrderRequest orderRequest = new CreateOrderRequest();
        orderRequest.setUserId(user.getId());
        orderRequest.setShippingAddress("123 Fifth Avenue, Suite 400, New York, NY 10001");
        orderRequest.setContactPhone("+1 212-555-0182");
        orderRequest.setPaymentMethod("CREDIT_CARD");
        orderRequest.setItems(List.of(new OrderItemRequest(product.getId(), 2)));

        // Create Order
        MvcResult result = mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.orderNumber").isNotEmpty())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andExpect(jsonPath("$.data.items").isArray())
                .andReturn();

        String responseJson = result.getResponse().getContentAsString();
        Integer orderIdInt = com.jayway.jsonpath.JsonPath.read(responseJson, "$.data.id");
        Long orderId = orderIdInt.longValue();

        // Retrieve Order by ID
        mockMvc.perform(get("/api/orders/" + orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(orderId))
                .andExpect(jsonPath("$.data.shippingAddress").value("123 Fifth Avenue, Suite 400, New York, NY 10001"));

        // Retrieve Orders by User ID
        mockMvc.perform(get("/api/orders/user/" + user.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }
}
