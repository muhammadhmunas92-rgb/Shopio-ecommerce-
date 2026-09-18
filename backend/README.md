# FORME E-Commerce Platform — Spring Boot Backend

A standalone, production-grade Spring Boot 3 RESTful API persistence backend built with **Spring Data JPA**, **H2 Database (Persistent File-based)**, and documented with **OpenAPI 3 / Swagger UI**.

---

## 🚀 Running Directly in IntelliJ IDEA (No MySQL Required!)

This backend is designed specifically to run seamlessly in **IntelliJ IDEA** with zero external database installation.

### Step 1: Open Project in IntelliJ IDEA
1. Launch **IntelliJ IDEA**.
2. Click **File → Open...** (or click **Open** on the Welcome screen).
3. Navigate to and select the `backend` directory:
   ```
   c:\Users\moham\Downloads\KAHNDSE EAD-2 CW\backend
   ```
   *(Alternatively, select the `backend/pom.xml` file and click "Open as Project").*
4. Trust the project if prompted by IntelliJ.

### Step 2: Allow Maven Dependencies to Sync
- IntelliJ will automatically detect the Maven configuration in `pom.xml` and download all required dependencies.
- You can also view the Maven tool window on the right sidebar and click the **Reload All Maven Projects** icon if needed.

### Step 3: Run the Spring Boot Application
1. Navigate to:
   `src/main/java/com/forme/ecommerce/FormeEcommerceApplication.java`
2. Right-click anywhere in the file or click the green **Play (▶)** icon next to `public static void main(String[] args)`.
3. Select **Run 'FormeEcommerceApplication'**.
4. The console will display the Spring Boot banner and confirm:
   `Tomcat started on port 8080 (http) with context path ''`

---

## 🗄️ H2 Database & H2 Console

The application utilizes an embedded, file-based H2 database located at `./data/formedb`. Data persists across restarts.

### Accessing H2 Web Console:
1. Open your browser and navigate to:
   **[http://localhost:8080/h2-console](http://localhost:8080/h2-console)**
2. In the login screen, enter the following parameters:
   - **Driver Class**: `org.h2.Driver`
   - **JDBC URL**: `jdbc:h2:file:./data/formedb`
   - **User Name**: `sa`
   - **Password**: *(leave blank)*
3. Click **Connect**.
4. You can now inspect all database tables (`USERS`, `PRODUCTS`, `CATEGORIES`, `ORDERS`, `ORDER_ITEMS`, `CART_ITEMS`, `FAVORITES`, `REVIEWS`).

---

## 📖 OpenAPI 3 & Swagger UI Documentation

Complete interactive documentation generated via `springdoc-openapi`.

- **Swagger UI Interactive Interface**:
  👉 **[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)**
  *(Alternative short URL: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html))*

- **Raw OpenAPI 3 JSON Specification**:
  👉 **[http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)**

All endpoints feature detailed request bodies, schemas, parameters, response models, and status codes.

---

## 🧪 Automated Testing (JUnit 5 + Mockito)

Unit and integration tests are located in `src/test/java/com/forme/ecommerce/` and use an isolated in-memory H2 database (`jdbc:h2:mem:testdb`).

### Running Tests in IntelliJ IDEA:
1. In IntelliJ Project tool window, right-click on `src/test/java`
2. Select **Run 'All Tests'**
3. Verify that all 7 tests pass:
   - `AuthControllerTest`: User registration, validation, duplicate prevention, and user login.
   - `ProductControllerTest`: Full CRUD lifecycle (Product creation, retrieval by ID, update, deletion).
   - `OrderControllerTest`: Order placement, stock deduction, and order retrieval.

### Running Tests via Command Line:
```powershell
cd backend
.\mvnw.cmd test
```

---

## 📮 Postman Collection

A pre-configured Postman collection is ready to import:
- **Location**: `backend/postman/FORME_Ecommerce_API.postman_collection.json`
- **How to use**:
  1. Open Postman.
  2. Click **Import** → Drag & drop `FORME_Ecommerce_API.postman_collection.json`.
  3. All requests (Auth, Products, Categories, Cart, Orders, Favorites, Reviews) are pre-populated with variables and JSON payloads.

---

## 🔑 Pre-Seeded Demonstration Accounts

| Role | Username | Email | Password |
| :--- | :--- | :--- | :--- |
| **Studio Admin** | `admin` | `admin@forme.com` | `admin123` |
| **Customer** | `sophia` | `sophia@forme.com` | `customer123` |
| **Customer** | `elena` | `elena@forme.com` | `customer123` |
