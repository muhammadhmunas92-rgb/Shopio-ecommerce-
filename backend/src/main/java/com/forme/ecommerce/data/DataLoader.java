package com.forme.ecommerce.data;

import com.forme.ecommerce.model.*;
import com.forme.ecommerce.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public DataLoader(UserRepository userRepository,
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository,
                      ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedCategories();
        seedProducts();
    }

    private void seedUsers() {
        // Primary requested admin: mhmd@gmail.com with password 1234
        try {
            if (userRepository.findByEmail("mhmd@gmail.com").isEmpty() && userRepository.findByUsername("mhmd").isEmpty()) {
                User mhmdAdmin = new User(
                        "mhmd",
                        "mhmd@gmail.com",
                        "1234",
                        "Mohamed (Admin)",
                        "ADMIN"
                );
                mhmdAdmin.setPhone("+1 555-0100");
                mhmdAdmin.setAddress("Shopio Global HQ, Executive Suite 1");
                userRepository.save(mhmdAdmin);
            }
        } catch (Exception e) {
            // Already seeded or exists
        }

        try {
            if (userRepository.findByEmail("admin@shopio.com").isEmpty() && userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User(
                        "admin",
                        "admin@shopio.com",
                        "admin123",
                        "Shopio Store Admin",
                        "ADMIN"
                );
                admin.setPhone("+1 555-0199");
                admin.setAddress("742 Evergreen Blvd, Suite 10, NY");
                userRepository.save(admin);
            }
        } catch (Exception e) {
            // Already seeded or exists
        }

        try {
            if (userRepository.findByEmail("sophia@gmail.com").isEmpty() 
                    && userRepository.findByEmail("sophia@shopio.com").isEmpty() 
                    && userRepository.findByUsername("sophia").isEmpty()) {
                User customer = new User(
                        "sophia",
                        "sophia@gmail.com",
                        "customer123",
                        "Sophia Vance",
                        "CUSTOMER"
                );
                customer.setPhone("+1 555-0142");
                customer.setAddress("124 Mercer Street, Soho, New York, NY 10012");
                userRepository.save(customer);
            }
        } catch (Exception e) {
            // Already seeded or exists
        }
    }

    private void seedCategories() {
        createCategoryIfMissing("Electronics", "electronics", "Premium noise-cancelling audio, smart wearables, monitors and home tech.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80");
        createCategoryIfMissing("Furniture", "furniture", "Contemporary lounge seating, solid oak tables, and modern living essentials.", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80");
        createCategoryIfMissing("Fashion", "fashion", "Contemporary streetwear, heavyweight hoodies, and tailored outerwear.", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80");
        createCategoryIfMissing("Shoes", "shoes", "Minimalist sneakers, athletic running shoes, and handcrafted boots.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80");
        createCategoryIfMissing("Fitness", "fitness", "Vacuum insulated bottles, eco yoga mats, and athletic duffel bags.", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80");
        createCategoryIfMissing("Beauty", "beauty", "Botanical facial oils, vitamin C glow serums, and skin mists.", "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80");
        createCategoryIfMissing("Watches", "watches", "Precision chronographs and minimalist timeless timepieces.", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80");
        createCategoryIfMissing("Bags", "bags", "Structured handbags, totes, backpacks, and functional crossbodies.", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80");
        createCategoryIfMissing("Accessories", "accessories", "Designer sunglasses, daily carry companions, and lifestyle gear.", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80");
    }

    private void createCategoryIfMissing(String name, String slug, String description, String imageUrl) {
        if (categoryRepository.findBySlug(slug).isEmpty()) {
            Category cat = new Category(name, slug, description, imageUrl);
            categoryRepository.save(cat);
        }
    }

    private void seedProducts() {
        if (productRepository.count() >= 20) {
            return; // already seeded
        }

        Category electronics = categoryRepository.findBySlug("electronics").orElse(null);
        Category furniture = categoryRepository.findBySlug("furniture").orElse(null);
        Category fashion = categoryRepository.findBySlug("fashion").orElse(null);
        Category shoes = categoryRepository.findBySlug("shoes").orElse(null);
        Category fitness = categoryRepository.findBySlug("fitness").orElse(null);
        Category beauty = categoryRepository.findBySlug("beauty").orElse(null);
        Category watches = categoryRepository.findBySlug("watches").orElse(null);
        Category bags = categoryRepository.findBySlug("bags").orElse(null);
        Category accessories = categoryRepository.findBySlug("accessories").orElse(null);

        User sophia = userRepository.findByUsername("sophia").orElse(null);

        saveProductIfMissing("Sony WH-1000XM5 Wireless Noise-Canceling Headphones", "EL-SONY-01",
                "Industry-leading active noise cancellation with two processors and 8 microphones. Hi-Res audio with 30-hour battery life.",
                new BigDecimal("349.99"), 25, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                "Midnight Silver", "BESTSELLER", "TRENDING", true, electronics);

        saveProductIfMissing("Smart Watch Series 9 Ultra OLED", "EL-SMW-09",
                "Always-On 2000-nit Retina OLED display, advanced ECG sensors, dual-frequency precision GPS, and water resistance to 50m.",
                new BigDecimal("199.99"), 35, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
                "Space Gray", "-15%", "TRENDING", true, electronics);

        saveProductIfMissing("Aura Pro Wireless ANC Studio Headphones", "EL-HDP-07",
                "Spatial audio with dynamic head tracking, 40mm custom high-fidelity drivers, memory foam ear cups, and multi-device pairing.",
                new BigDecimal("99.99"), 40, "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
                "Matte Black", "HOT", "TRENDING", true, electronics);

        saveProductIfMissing("Harman Kardon Onyx Wireless Bluetooth Speaker", "EL-SPK-03",
                "Superior stereo acoustic performance with signature circular design, premium aluminum handle, and 8 hours playtime.",
                new BigDecimal("149.00"), 20, "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
                "Obsidian Black", "POPULAR", "TRENDING", true, electronics);

        saveProductIfMissing("Mechanical RGB Backlit Gaming Keyboard", "EL-KBD-05",
                "Hot-swappable linear mechanical switches, aircraft-grade brushed aluminum frame, and customizable RGB illumination.",
                new BigDecimal("119.00"), 30, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
                "Matte Slate", "NEW", "TRENDING", true, electronics);

        saveProductIfMissing("Nike Air Max 270 React Edition", "SH-AMX-27",
                "Iconic comfort meets modern lifestyle aesthetic. Large volume 270 Max Air heel unit with breathable mesh upper.",
                new BigDecimal("129.99"), 50, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
                "Pure White / Infrared", "-20%", "TRENDING", true, shoes);

        saveProductIfMissing("Minimalist Low-Top Leather Sneakers", "SH-MIN-02",
                "Handcrafted Italian nappa leather sneakers with vulcanized rubber soles and padded ergonomic insoles for all-day comfort.",
                new BigDecimal("128.00"), 40, "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
                "Chalk White", "-15%", "TRENDING", true, shoes);

        saveProductIfMissing("Runner Elite Cloud Foam Athletic Shoes", "SH-RUN-08",
                "Engineered seamless knit upper with ultra-responsive dual-density foam midsoles for supreme street and athletic performance.",
                new BigDecimal("119.00"), 45, "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
                "Triple White", "NEW", "TRENDING", true, shoes);

        saveProductIfMissing("Artisan Suede Chelsea Boots", "SH-BOT-09",
                "Handcrafted water-resistant calfskin suede with flexible elastic side gussets and stacked leather crepe outsoles.",
                new BigDecimal("185.00"), 25, "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
                "Sand Taupe", "PREMIUM", "LATEST_DROPS", true, shoes);

        saveProductIfMissing("Essential Streetwear Oversized Hoodie", "FS-HOD-01",
                "480 GSM ultra-heavyweight brushed French terry cotton with relaxed dropped shoulders and double-layered hood.",
                new BigDecimal("59.99"), 60, "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
                "Bone Cream", "BESTSELLER", "TRENDING", true, fashion);

        saveProductIfMissing("Classic Warm Fleece Pullover Hoodie", "FS-HOD-02",
                "Plush organic cotton fleece with kangaroo front pouch pocket, reinforced stitching, and timeless streetwear fit.",
                new BigDecimal("59.99"), 55, "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
                "Heather Gray", "POPULAR", "TRENDING", true, fashion);

        saveProductIfMissing("Safari Linen Utility Overshirt", "MN-LIN-05",
                "Breathable organic linen-cotton blend overshirt with horn buttons and utility chest pockets. Tailored casual silhouette.",
                new BigDecimal("95.00"), 45, "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop&q=80",
                "Sand Dune", "NEW", "LATEST_DROPS", true, fashion);

        saveProductIfMissing("Merino Wool Ribbed Knit Sweater", "WM-KNT-06",
                "Ultra-soft 100% pure merino wool crewneck sweater with ribbed cuffs and relaxed dropped shoulders.",
                new BigDecimal("115.00"), 40, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
                "Oatmeal Cream", "NEW", "LATEST_DROPS", true, fashion);

        saveProductIfMissing("Minimalist Graphic Studio Tee", "FS-TEE-07",
                "240 GSM pre-shrunk combed organic cotton jersey with subtle typographic chest print and relaxed boxy cut.",
                new BigDecimal("34.00"), 70, "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
                "Off-White", "HOT", "TRENDING", true, fashion);

        saveProductIfMissing("Nordic Bouclé Curved Lounge Armchair", "FN-CHR-09",
                "Sculptural curved silhouette upholstered in plush tactile bouclé fabric with solid matte black steel legs.",
                new BigDecimal("289.00"), 15, "https://images.unsplash.com/photo-1580481077195-c9c4c7847c25?w=800&auto=format&fit=crop&q=80",
                "Warm Ivory", "NEW", "TRENDING", true, furniture);

        saveProductIfMissing("Minimalist Solid White Oak Coffee Table", "FN-TBL-10",
                "Organic rounded rectangular coffee table crafted from sustainably sourced solid European white oak with matte natural lacquer.",
                new BigDecimal("195.00"), 18, "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&auto=format&fit=crop&q=80",
                "Natural Oak", "-15%", "TRENDING", true, furniture);

        saveProductIfMissing("Ergonomic High-Back Breathable Mesh Chair", "FN-OFC-11",
                "Engineered dynamic lumbar support, 4D adjustable armrests, synchronized tilt recline, and reinforced mesh.",
                new BigDecimal("239.00"), 22, "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80",
                "Graphite Black", "HOT", "TRENDING", true, furniture);

        saveProductIfMissing("Sculptural Matte Ceramic Table Lamp", "FN-LMP-04",
                "Artisanal hand-thrown stoneware ceramic lamp base with textured linen drum shade and warm dimmable LED ambiance.",
                new BigDecimal("68.00"), 30, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
                "Terracotta Clay", "-10%", "TRENDING", true, furniture);

        saveProductIfMissing("Insulated Stainless Steel Sports Bottle", "FT-BTL-01",
                "Double-walled vacuum insulated 18/8 food-grade stainless steel bottle. Keeps drinks icy cold for 24 hours.",
                new BigDecimal("24.99"), 80, "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
                "Matte Onyx", "BESTSELLER", "TRENDING", true, fitness);

        saveProductIfMissing("Pro Grip Non-Slip Eco Yoga Mat with Strap", "FT-YGA-02",
                "6mm thick natural tree rubber and biodegradable polyurethane top layer with laser-etched alignment system.",
                new BigDecimal("38.00"), 40, "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80",
                "Sage Forest", "HOT", "TRENDING", true, fitness);

        saveProductIfMissing("Waterproof Athletic Duffel Gym Bag", "FT-BAG-03",
                "Weather-resistant 900D ballistic nylon with dedicated ventilated shoe compartment and waterproof toiletry zip pocket.",
                new BigDecimal("49.99"), 35, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
                "Stealth Black", "-20%", "TRENDING", true, fitness);

        saveProductIfMissing("Organic Vitamin C Botanical Glow Serum", "BT-SRM-01",
                "Concentrated 15% pure L-ascorbic acid formulated with hyaluronic acid and ferulic acid to brighten and firm skin.",
                new BigDecimal("38.00"), 65, "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
                "Amber Glass", "TOP RATED", "TRENDING", true, beauty);

        saveProductIfMissing("Hydrating Botanical Rose Facial Mist", "BT-MST-02",
                "Distilled Damascus rose petal water infused with soothing aloe vera and witch hazel to instantly tone and refresh skin.",
                new BigDecimal("32.00"), 50, "https://images.unsplash.com/photo-1608248597359-0026a71d7943?w=800&auto=format&fit=crop&q=80",
                "Rose Mist", "NEW", "TRENDING", true, beauty);

        saveProductIfMissing("Heritage Chronograph Classic Watch", "WT-HER-03",
                "Precision Japanese quartz chronograph movement encased in 40mm stainless steel with sapphire crystal and leather strap.",
                new BigDecimal("210.00"), 20, "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
                "Saddle Brown", "NEW", "TRENDING", true, watches);

        saveProductIfMissing("Minimalist Rose Gold Mesh Watch", "WT-MSH-05",
                "Ultra-slim 7mm profile with sunray silver dial, rose gold ion-plated stainless steel mesh band, and magnetic clasp.",
                new BigDecimal("165.00"), 28, "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
                "Rose Gold", "TRENDING", "TRENDING", true, watches);

        saveProductIfMissing("Structured Caramel Studio Tote", "BG-STR-04",
                "Sculptural dual-handled handbag tailored from grained calfskin with gold hardware and interior laptop sleeve.",
                new BigDecimal("175.00"), 28, "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
                "Caramel Tan", "HOT", "TRENDING", true, bags);

        saveProductIfMissing("Crossbody Pebble Leather Saddle Bag", "BG-SDL-06",
                "Hand-finished full-grain pebbled leather with antique brass hardware and magnetic snap flap closure.",
                new BigDecimal("145.00"), 32, "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
                "Cognac Brown", "POPULAR", "TRENDING", true, bags);

        Product sunglasses = saveProductIfMissing("Aviator Polarized Metal Sunglasses", "ACC-AVI-01",
                "Classic wireframe aviator sunglasses with polarized UV400 gradient lenses and silicone nose pads for glare reduction.",
                new BigDecimal("89.99"), 40, "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
                "Gold / Deep Green", "-10%", "TRENDING", true, accessories);

        if (sophia != null && sunglasses != null && reviewRepository.count() == 0) {
            reviewRepository.save(new Review(sophia, sunglasses, 5, "These sunglasses look and feel premium! The polarization is crystal clear."));
        }
    }

    private Product saveProductIfMissing(String name, String modelNumber, String description, BigDecimal price,
                                         int stockQuantity, String imageUrl, String color, String badge,
                                         String collectionTag, boolean isFeatured, Category category) {
        if (productRepository.findByModelNumber(modelNumber).isEmpty()) {
            Product p = new Product(name, modelNumber, description, price, stockQuantity, imageUrl, imageUrl,
                    color, badge, collectionTag, isFeatured, category);
            return productRepository.save(p);
        }
        return null;
    }
}
