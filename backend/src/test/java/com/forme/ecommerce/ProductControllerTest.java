package com.forme.ecommerce;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forme.ecommerce.dto.ProductRequest;
import com.forme.ecommerce.model.Category;
import com.forme.ecommerce.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    private Long testCategoryId;

    @BeforeEach
    void setUp() {
        Category category = categoryRepository.findAll().stream().findFirst().orElseGet(() -> {
            Category newCat = new Category("Bespoke Leather", "bespoke-leather", "Exclusive limited editions", null);
            return categoryRepository.save(newCat);
        });
        testCategoryId = category.getId();
    }

    @Test
    @DisplayName("Should retrieve all products")
    void testGetAllProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("Should create, retrieve, update, and delete a product (Full CRUD)")
    void testProductCRUDLifecycle() throws Exception {
        // 1. CREATE
        ProductRequest createReq = new ProductRequest();
        createReq.setName("Atelier 500 Prototype Bag");
        createReq.setModelNumber("Atelier 500");
        createReq.setDescription("Experimental curved silhouette in brushed slate leather.");
        createReq.setPrice(new BigDecimal("620.00"));
        createReq.setStockQuantity(8);
        createReq.setColor("Slate Grey");
        createReq.setBadge("LIMITED");
        createReq.setCollectionTag("EDITORS_PICKS");
        createReq.setIsFeatured(true);
        createReq.setCategoryId(testCategoryId);

        MvcResult createResult = mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Atelier 500 Prototype Bag"))
                .andExpect(jsonPath("$.data.modelNumber").value("Atelier 500"))
                .andExpect(jsonPath("$.data.price").value(620.00))
                .andReturn();

        String responseJson = createResult.getResponse().getContentAsString();
        Integer productIdInt = com.jayway.jsonpath.JsonPath.read(responseJson, "$.data.id");
        Long createdId = productIdInt.longValue();

        // 2. RETRIEVE BY ID
        mockMvc.perform(get("/api/products/" + createdId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(createdId))
                .andExpect(jsonPath("$.data.modelNumber").value("Atelier 500"));

        // 3. UPDATE
        createReq.setName("Atelier 500 Refined Edition");
        createReq.setPrice(new BigDecimal("680.00"));
        createReq.setStockQuantity(12);

        mockMvc.perform(put("/api/products/" + createdId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Atelier 500 Refined Edition"))
                .andExpect(jsonPath("$.data.price").value(680.00))
                .andExpect(jsonPath("$.data.stockQuantity").value(12));

        // 4. DELETE
        mockMvc.perform(delete("/api/products/" + createdId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // Verify Deletion
        mockMvc.perform(get("/api/products/" + createdId))
                .andExpect(status().isNotFound());
    }
}
