import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ShopioHero from './components/ShopioHero';
import CategoryCircles from './components/CategoryCircles';
import PromoCards from './components/PromoCards';
import TrendingProducts from './components/TrendingProducts';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';
import AuthModal from './components/AuthModal';
import AdminModal from './components/AdminModal';
import LoginGate from './components/LoginGate';
import OrderTrackingModal from './components/OrderTrackingModal';

import { fetchProducts, fetchUserOrders } from './api/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Comprehensive 28-Product Catalog spanning Electronics, Fashion, Shoes, Furniture, Fitness, Beauty, Bags, Watches & Accessories
const INITIAL_DEMO_PRODUCTS = [
  // --- ELECTRONICS & TECH ---
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    modelNumber: "EL-SONY-01",
    description: "Industry-leading active noise cancellation with two processors and 8 microphones. Exceptional Hi-Res audio quality and 30-hour battery life with ultra-lightweight comfortable fit.",
    price: 349.99,
    stockQuantity: 25,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    color: "Midnight Silver",
    badge: "BESTSELLER",
    collectionTag: "TRENDING",
    averageRating: 5.0,
    reviewCount: 324,
    category: { slug: "electronics", name: "Electronics" }
  },
  {
    id: 2,
    name: "Smart Watch Series 9 Ultra OLED",
    modelNumber: "EL-SMW-09",
    description: "Always-On 2000-nit Retina OLED display, advanced ECG & temperature sensors, dual-frequency precision GPS, and water resistance to 50 meters.",
    price: 199.99,
    stockQuantity: 35,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    color: "Space Gray",
    badge: "-15%",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 103,
    category: { slug: "electronics", name: "Electronics" }
  },
  {
    id: 3,
    name: "Aura Pro Wireless ANC Studio Headphones",
    modelNumber: "EL-HDP-07",
    description: "Spatial audio with dynamic head tracking, 40mm custom high-fidelity drivers, memory foam ear cups, and seamless multi-device Bluetooth 5.3 pairing.",
    price: 99.99,
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    color: "Matte Black",
    badge: "HOT",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 156,
    category: { slug: "electronics", name: "Electronics" }
  },
  {
    id: 4,
    name: "Harman Kardon Onyx Wireless Bluetooth Speaker",
    modelNumber: "EL-SPK-03",
    description: "Superior stereo acoustic performance with signature circular design, premium aluminum handle, and 8 hours of playtime on a single charge.",
    price: 149.00,
    stockQuantity: 20,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    color: "Obsidian Black",
    badge: "POPULAR",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 64,
    category: { slug: "electronics", name: "Electronics" }
  },
  {
    id: 5,
    name: "Mechanical RGB Backlit Gaming Keyboard",
    modelNumber: "EL-KBD-05",
    description: "Hot-swappable linear mechanical switches, aircraft-grade brushed aluminum frame, customizable per-key RGB illumination, and detachable USB-C cable.",
    price: 119.00,
    stockQuantity: 30,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    color: "Matte Slate",
    badge: "NEW",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 47,
    category: { slug: "electronics", name: "Electronics" }
  },

  // --- SHOES & SNEAKERS ---
  {
    id: 6,
    name: "Nike Air Max 270 React Edition",
    modelNumber: "SH-AMX-27",
    description: "Iconic comfort meets modern lifestyle aesthetic. Large volume 270 Max Air heel unit provides responsive lightweight cushioning with sleek breathable mesh upper.",
    price: 129.99,
    stockQuantity: 50,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    color: "Pure White / Infrared",
    badge: "-20%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 189,
    category: { slug: "shoes", name: "Shoes" }
  },
  {
    id: 7,
    name: "Minimalist Low-Top Leather Sneakers",
    modelNumber: "SH-MIN-02",
    description: "Handcrafted Italian nappa leather sneakers with vulcanized rubber soles, tonal waxed laces, and padded ergonomic insoles for all-day comfort.",
    price: 128.00,
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    color: "Chalk White",
    badge: "-15%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 92,
    category: { slug: "shoes", name: "Shoes" }
  },
  {
    id: 8,
    name: "Runner Elite Cloud Foam Athletic Shoes",
    modelNumber: "SH-RUN-08",
    description: "Engineered seamless knit upper with ultra-responsive dual-density foam midsoles. Exceptional energy return for running and casual street style.",
    price: 119.00,
    stockQuantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    color: "Triple White",
    badge: "NEW",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 54,
    category: { slug: "shoes", name: "Shoes" }
  },
  {
    id: 9,
    name: "Artisan Suede Chelsea Boots",
    modelNumber: "SH-BOT-09",
    description: "Handcrafted water-resistant calfskin suede with flexible elastic side gussets, pull tabs, and durable stacked leather crepe outsoles.",
    price: 185.00,
    stockQuantity: 25,
    imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
    color: "Sand Taupe",
    badge: "PREMIUM",
    collectionTag: "LATEST_DROPS",
    averageRating: 5.0,
    reviewCount: 38,
    category: { slug: "shoes", name: "Shoes" }
  },

  // --- FASHION & APPAREL ---
  {
    id: 10,
    name: "Essential Streetwear Oversized Hoodie",
    modelNumber: "FS-HOD-01",
    description: "480 GSM ultra-heavyweight brushed French terry cotton with relaxed dropped shoulders, double-layered hood, and ribbed cuffs. Premium everyday wardrobe essential.",
    price: 59.99,
    stockQuantity: 60,
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    color: "Bone Cream",
    badge: "BESTSELLER",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 256,
    category: { slug: "fashion", name: "Fashion" }
  },
  {
    id: 11,
    name: "Classic Warm Fleece Pullover Hoodie",
    modelNumber: "FS-HOD-02",
    description: "Plush organic cotton fleece with kangaroo front pouch pocket, reinforced stitching, and timeless unisex streetwear fit.",
    price: 59.99,
    stockQuantity: 55,
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    color: "Heather Gray",
    badge: "POPULAR",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 142,
    category: { slug: "fashion", name: "Fashion" }
  },
  {
    id: 12,
    name: "Safari Linen Utility Overshirt",
    modelNumber: "MN-LIN-05",
    description: "Breathable pure organic linen-cotton blend overshirt with horn buttons and utility flap chest pockets. Tailored modern casual silhouette.",
    price: 95.00,
    stockQuantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop&q=80",
    color: "Sand Dune",
    badge: "NEW",
    collectionTag: "LATEST_DROPS",
    averageRating: 4.9,
    reviewCount: 48,
    category: { slug: "fashion", name: "Fashion" }
  },
  {
    id: 13,
    name: "Merino Wool Ribbed Knit Sweater",
    modelNumber: "WM-KNT-06",
    description: "Ultra-soft 100% pure merino wool crewneck sweater with ribbed cuffs and relaxed dropped shoulders. Effortless seasonal staple.",
    price: 115.00,
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    color: "Oatmeal Cream",
    badge: "NEW",
    collectionTag: "LATEST_DROPS",
    averageRating: 5.0,
    reviewCount: 36,
    category: { slug: "fashion", name: "Fashion" }
  },
  {
    id: 14,
    name: "Minimalist Graphic Studio Tee",
    modelNumber: "FS-TEE-07",
    description: "240 GSM pre-shrunk combed organic cotton jersey with subtle typographic chest print and relaxed boxy cut.",
    price: 34.00,
    stockQuantity: 70,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    color: "Off-White",
    badge: "HOT",
    collectionTag: "TRENDING",
    averageRating: 4.7,
    reviewCount: 65,
    category: { slug: "fashion", name: "Fashion" }
  },

  // --- FURNITURE & HOME DECOR ---
  {
    id: 15,
    name: "Nordic Bouclé Curved Lounge Armchair",
    modelNumber: "FN-CHR-09",
    description: "Sculptural curved silhouette upholstered in plush tactile bouclé fabric with solid matte black steel legs. Modern statement chair.",
    price: 289.00,
    stockQuantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1580481077195-c9c4c7847c25?w=800&auto=format&fit=crop&q=80",
    color: "Warm Ivory",
    badge: "NEW",
    collectionTag: "TRENDING",
    averageRating: 5.0,
    reviewCount: 29,
    category: { slug: "furniture", name: "Furniture" }
  },
  {
    id: 16,
    name: "Minimalist Solid White Oak Coffee Table",
    modelNumber: "FN-TBL-10",
    description: "Organic rounded rectangular coffee table crafted from sustainably sourced solid European white oak with matte natural lacquer.",
    price: 195.00,
    stockQuantity: 18,
    imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&auto=format&fit=crop&q=80",
    color: "Natural Oak",
    badge: "-15%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 34,
    category: { slug: "furniture", name: "Furniture" }
  },
  {
    id: 17,
    name: "Ergonomic High-Back Breathable Mesh Chair",
    modelNumber: "FN-OFC-11",
    description: "Engineered lumbar dynamic support, 4D adjustable armrests, synchronized tilt recline, and breathable reinforced mesh for executive workstations.",
    price: 239.00,
    stockQuantity: 22,
    imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80",
    color: "Graphite Black",
    badge: "HOT",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 42,
    category: { slug: "furniture", name: "Furniture" }
  },
  {
    id: 18,
    name: "Sculptural Matte Ceramic Table Lamp",
    modelNumber: "FN-LMP-04",
    description: "Artisanal hand-thrown stoneware ceramic lamp base with textured linen drum shade and warm dimmable LED ambiance.",
    price: 68.00,
    stockQuantity: 30,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    color: "Terracotta Clay",
    badge: "-10%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 23,
    category: { slug: "furniture", name: "Furniture" }
  },

  // --- FITNESS & ACTIVE LIFE ---
  {
    id: 19,
    name: "Insulated Stainless Steel Sports Bottle",
    modelNumber: "FT-BTL-01",
    description: "Double-walled vacuum insulated 18/8 food-grade stainless steel bottle. Keeps cold drinks chilled for 24 hours or piping hot for 12 hours. Leak-proof sports cap.",
    price: 24.99,
    stockQuantity: 80,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    color: "Matte Onyx",
    badge: "BESTSELLER",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 76,
    category: { slug: "fitness", name: "Fitness" }
  },
  {
    id: 20,
    name: "Pro Grip Non-Slip Eco Yoga Mat with Strap",
    modelNumber: "FT-YGA-02",
    description: "6mm thick natural tree rubber and biodegradable polyurethane top layer. Laser-etched alignment system with non-slip grip under heavy sweat.",
    price: 38.00,
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80",
    color: "Sage Forest",
    badge: "HOT",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 45,
    category: { slug: "fitness", name: "Fitness" }
  },
  {
    id: 21,
    name: "Waterproof Athletic Duffel Gym Bag",
    modelNumber: "FT-BAG-03",
    description: "Weather-resistant 900D ballistic nylon with dedicated ventilated shoe compartment, padded shoulder strap, and waterproof toiletry zip pocket.",
    price: 49.99,
    stockQuantity: 35,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    color: "Stealth Black",
    badge: "-20%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 52,
    category: { slug: "fitness", name: "Fitness" }
  },

  // --- BEAUTY & SKINCARE ---
  {
    id: 22,
    name: "Organic Vitamin C Botanical Glow Serum",
    modelNumber: "BT-SRM-01",
    description: "Concentrated 15% pure L-ascorbic acid formulated with hyaluronic acid and ferulic acid. Brightens skin tone, firms texture, and protects against pollutants.",
    price: 38.00,
    stockQuantity: 65,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    color: "Amber Glass",
    badge: "TOP RATED",
    collectionTag: "TRENDING",
    averageRating: 5.0,
    reviewCount: 114,
    category: { slug: "beauty", name: "Beauty" }
  },
  {
    id: 23,
    name: "Hydrating Botanical Rose Facial Mist",
    modelNumber: "BT-MST-02",
    description: "Distilled Damascus rose petal water infused with soothing aloe vera and witch hazel to instantly refresh, tone, and rehydrate thirsty skin throughout the day.",
    price: 32.00,
    stockQuantity: 50,
    imageUrl: "https://images.unsplash.com/photo-1608248597359-0026a71d7943?w=800&auto=format&fit=crop&q=80",
    color: "Rose Mist",
    badge: "NEW",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 39,
    category: { slug: "beauty", name: "Beauty" }
  },

  // --- WATCHES & TIMEPIECES ---
  {
    id: 24,
    name: "Heritage Chronograph Classic Watch",
    modelNumber: "WT-HER-03",
    description: "Precision Japanese quartz chronograph movement encased in 40mm surgical-grade stainless steel with sapphire crystal and supple genuine leather strap.",
    price: 210.00,
    stockQuantity: 20,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    color: "Saddle Brown",
    badge: "NEW",
    collectionTag: "TRENDING",
    averageRating: 5.0,
    reviewCount: 61,
    category: { slug: "watches", name: "Watches" }
  },
  {
    id: 25,
    name: "Minimalist Rose Gold Mesh Watch",
    modelNumber: "WT-MSH-05",
    description: "Ultra-slim 7mm profile with sunray silver dial, rose gold ion-plated stainless steel mesh band, and quick-release magnetic clasp.",
    price: 165.00,
    stockQuantity: 28,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    color: "Rose Gold",
    badge: "TRENDING",
    averageRating: 4.9,
    reviewCount: 44,
    category: { slug: "watches", name: "Watches" }
  },

  // --- BAGS & LEATHER ACCESSORIES ---
  {
    id: 26,
    name: "Structured Caramel Studio Tote",
    modelNumber: "BG-STR-04",
    description: "Sculptural dual-handled handbag tailored from grained calfskin with gold hardware, interior protective laptop sleeve, and spacious dual compartments.",
    price: 175.00,
    stockQuantity: 28,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    color: "Caramel Tan",
    badge: "HOT",
    collectionTag: "TRENDING",
    averageRating: 4.8,
    reviewCount: 39,
    category: { slug: "bags", name: "Bags" }
  },
  {
    id: 27,
    name: "Crossbody Pebble Leather Saddle Bag",
    modelNumber: "BG-SDL-06",
    description: "Hand-finished full-grain pebbled leather with antique brass hardware, magnetic snap flap closure, and adjustable shoulder strap.",
    price: 145.00,
    stockQuantity: 32,
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    color: "Cognac Brown",
    badge: "POPULAR",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 48,
    category: { slug: "bags", name: "Bags" }
  },

  // --- EYEWEAR & ACCESSORIES ---
  {
    id: 28,
    name: "Aviator Polarized Metal Sunglasses",
    modelNumber: "ACC-AVI-01",
    description: "Classic wireframe aviator sunglasses with polarized UV400 gradient lenses and comfortable silicone nose pads for pristine glare reduction.",
    price: 89.99,
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    color: "Gold / Deep Green",
    badge: "-10%",
    collectionTag: "TRENDING",
    averageRating: 4.9,
    reviewCount: 87,
    category: { slug: "accessories", name: "Accessories" }
  }
];

function ShopioStore() {
  const { user, logout } = useAuth();

  const [products, setProducts] = useState(INITIAL_DEMO_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modals & Drawers
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shopio_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveOrder = (newOrd) => {
    if (!newOrd) return;
    setUserOrders(prev => {
      const updated = [newOrd, ...prev.filter(o => o.orderNumber !== newOrd.orderNumber)];
      try {
        localStorage.setItem('shopio_orders', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const loadUserOrders = async () => {
    if (user?.id) {
      try {
        const orders = await fetchUserOrders(user.id);
        if (orders && orders.length > 0) {
          setUserOrders(prev => {
            const combined = [...orders, ...prev];
            const seen = new Set();
            const unique = combined.filter(o => {
              if (!o.orderNumber || seen.has(o.orderNumber)) return false;
              seen.add(o.orderNumber);
              return true;
            });
            try {
              localStorage.setItem('shopio_orders', JSON.stringify(unique));
            } catch (e) {}
            return unique;
          });
        }
      } catch (err) {
        console.warn('Could not fetch user orders:', err);
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadUserOrders();
    }
  }, [user?.id]);

  const handleOpenTracking = (ord) => {
    if (ord) {
      setTrackingOrder(ord);
    } else if (userOrders.length > 0) {
      setTrackingOrder(userOrders[0]);
    }
    setIsTrackingOpen(true);
  };

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      if (data && data.length > 0) {
        // If backend has products, combine or prioritize backend while retaining full variety
        if (data.length >= INITIAL_DEMO_PRODUCTS.length) {
          setProducts(data);
        } else {
          // Merge so that user always sees the complete full catalog of 28+ products
          const existingIds = new Set(data.map(d => (d.name || '').toLowerCase().trim()));
          const extra = INITIAL_DEMO_PRODUCTS.filter(p => !existingIds.has((p.name || '').toLowerCase().trim()));
          setProducts([...data, ...extra]);
        }
      } else {
        setProducts(INITIAL_DEMO_PRODUCTS);
      }
    } catch (err) {
      console.warn('Backend unavailable, using rich pre-seeded catalog:', err);
      setProducts(INITIAL_DEMO_PRODUCTS);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // If user is not authenticated, strictly show the Login Gate first
  if (!user) {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans selection:bg-amber-400 selection:text-neutral-900">
      
      {/* Top Main Navigation Bar */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        onOpenTracking={() => handleOpenTracking()}
        products={products}
        onSelectProduct={setSelectedProduct}
      />

      {/* Main Storefront Flow */}
      <main className="space-y-4">
        
        {/* 1. Shopio Lifestyle Hero with Trust Badges */}
        <ShopioHero
          onShopNowClick={() => {
            const el = document.getElementById('trending-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewCollectionClick={() => {
            const el = document.getElementById('categories-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Circular Categories (Electronics, Fashion, Shoes, Furniture, Fitness, Beauty, Watches, Bags, Accessories) */}
        <CategoryCircles
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Dual Promotional Split Banners (Summer Sale & New Arrivals) */}
        <PromoCards
          onSelectPromoCategory={(catSlug) => {
            setSelectedCategory(catSlug);
            const el = document.getElementById('trending-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Multi-Category Trending Products Grid (Electronics, Sneakers, Hoodies, Furniture, Beauty, Fitness) */}
        <TrendingProducts
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={setSelectedProduct}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={(newOrd) => {
          loadProducts();
          loadUserOrders();
          if (newOrd) {
            saveOrder(newOrd);
          }
        }}
        onOpenTracking={(newOrd) => handleOpenTracking(newOrd)}
      />

      <WishlistModal
        onSelectProduct={setSelectedProduct}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={(ord) => handleOpenTracking(ord)}
        onLogout={() => {
          logout();
          setIsAuthOpen(false);
        }}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onCatalogUpdated={loadProducts}
        onOpenTracking={(ord) => handleOpenTracking(ord)}
        catalogProducts={products}
        initialOrders={userOrders}
      />

      {/* Dedicated Real-Time Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        order={trackingOrder}
        userOrders={userOrders}
        onSelectOrder={(ord) => setTrackingOrder(ord)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ShopioStore />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
