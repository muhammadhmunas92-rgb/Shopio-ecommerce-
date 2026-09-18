package com.forme.ecommerce.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI formeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FORME Luxury Bags E-Commerce REST API")
                        .description("Comprehensive REST API documentation for the FORME E-Commerce Platform. " +
                                "Demonstrates clean RESTful resource endpoints, Spring Data JPA, and H2 database persistence for " +
                                "Users, Products, Categories, Orders, Cart, Favorites, and Customer Reviews.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("FORME Studio Engineering")
                                .email("contact@forme-studio.com")
                                .url("https://forme.luxury"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server")
                ));
    }
}
