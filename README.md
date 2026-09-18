# FORME — Luxury Sculptural Handbags E-Commerce System
### Enterprise Application Development (EAD-2 Coursework)

A complete, modern e-commerce web application inspired by high-end sculptural fashion design (**"FORME"**), featuring a standalone **Spring Boot 3** REST API backend with an embedded **H2 Database**, **OpenAPI 3 / Swagger UI** documentation, comprehensive **JUnit 5 / Mockito** tests, and a responsive **React** frontend.

---

## 🏛️ System Architecture

```
React Frontend (Vite + Tailwind CSS)
        │
        │ HTTP / JSON REST Calls
        ▼
Spring Boot REST Controllers (OpenAPI / Swagger UI)
        │
        ▼
Service Layer (Business Logic & Validation)
        │
        ▼
Repository Layer (Spring Data JPA / Hibernate)
        │
        ▼
H2 Database (Persistent File-based: ./data/formedb)
```

---

## 📁 Project Structure

Strictly separated into standalone backend and frontend projects:

```
KAHNDSE EAD-2 CW/
├── backend/                                   # Standalone Spring Boot Maven Project (IntelliJ Ready)
│   ├── pom.xml                                # Maven Dependencies (Spring Boot 3.2.3, H2, Springdoc OpenAPI)
│   ├── mvnw & mvnw.cmd                        # Maven Wrapper scripts
│   ├── .mvn/wrapper/                          # Maven Wrapper properties & JAR
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/forme/ecommerce/
│   │   │   │   ├── config/                    # OpenAPI 3 & WebMvc CORS configuration
│   │   │   │   ├── controller/                # REST Controllers (Auth, Product, Category, Cart, Order, Favorite, Review)
│   │   │   │   ├── data/                      # DataLoader (seeds FORME bag editions & test accounts)
│   │   │   │   ├── dto/                       # Request/Response DTOs with Bean Validation
│   │   │   │   ├── exception/                 # GlobalExceptionHandler & custom exception classes
│   │   │   │   ├── model/                     # JPA Entities (User, Category, Product, Order, OrderItem, CartItem, Favorite, Review)
│   │   │   │   ├── repository/                # Spring Data JPA Repositories
│   │   │   │   ├── service/                   # Transactional Service layer
│   │   │   │   └── FormeEcommerceApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties     # H2 file persistence, H2 Console, OpenAPI configs
│   │   └── test/
│   │       ├── java/com/forme/ecommerce/      # Automated tests (User Auth, Product CRUD, Order creation/retrieval)
│   │       └── resources/
│   │           └── application-test.properties# Isolated H2 in-memory test database configuration
│   ├── postman/
│   │   └── FORME_Ecommerce_API.postman_collection.json # Complete Postman test collection
│   └── README.md
│
└── frontend/                                  # Standalone React Project
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── api/client.js                      # Axios REST client communicating with Spring Boot backend
        ├── components/                        # Header, Hero, FilterTabs, ProductSection, StorySection, Modals
        ├── context/                           # AuthContext, CartContext, WishlistContext
        └── App.jsx
```

---

## 💻 Running the Backend in IntelliJ IDEA

> [!IMPORTANT]
> **Zero MySQL Required!** The backend uses embedded H2 database persistence.

1. Launch **IntelliJ IDEA**.
2. Click **File → Open...** and select the `backend` folder:
   ```
   c:\Users\moham\Downloads\KAHNDSE EAD-2 CW\backend
   ```
3. IntelliJ will automatically detect the Maven project (`pom.xml`) and sync all dependencies.
4. Locate the main class:
   `src/main/java/com/forme/ecommerce/FormeEcommerceApplication.java`
5. Click the green **Run (▶)** icon beside `main()`.
6. The backend will boot up at `http://localhost:8080`.

---

## 🎨 Running the React Frontend

1. Open a terminal in the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser at:
   **[http://localhost:5173](http://localhost:5173)**

---

## 🌐 Quick Reference URLs

| Component | URL | Description |
| :--- | :--- | :--- |
| **React Storefront** | [http://localhost:5173](http://localhost:5173) | Luxury FORME Bag Store UI |
| **Swagger UI** | [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) | Interactive API documentation |
| **OpenAPI 3 JSON** | [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs) | OpenAPI specification |
| **H2 Web Console** | [http://localhost:8080/h2-console](http://localhost:8080/h2-console) | Database administration tool |

### H2 Console Credentials:
- **JDBC URL**: `jdbc:h2:file:./data/formedb`
- **Driver Class**: `org.h2.Driver`
- **User Name**: `sa`
- **Password**: *(leave empty)*

---

## 🧪 Automated Testing

Automated integration tests run against an isolated in-memory H2 database:
```powershell
cd backend
.\mvnw.cmd test
```

### Verified Test Cases:
1. **User Registration & Validation**: Successful account creation and rejection of duplicate emails/usernames.
2. **User Login**: Credential authentication and invalid password handling.
3. **Product CRUD**:
   - `POST /api/products` (Create new bag)
   - `GET /api/products/{id}` (Retrieve by ID)
   - `PUT /api/products/{id}` (Update price, stock, and attributes)
   - `DELETE /api/products/{id}` (Remove product and verify deletion)
4. **Order Lifecycle**: Placement of customer orders with automatic inventory stock deduction and order retrieval.

---

## 👤 Demo Accounts

- **Admin Account**: `admin` / `admin123` (Full catalog management CRUD privileges)
- **Customer Account**: `sophia` / `customer123` (Shopping bag, wishlist, and review privileges)
