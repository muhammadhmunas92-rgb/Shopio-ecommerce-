import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, ShieldCheck, X, ChevronDown, Truck, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ 
  onOpenAuth, 
  onOpenAdmin, 
  onSearchChange, 
  searchQuery, 
  onSelectCategory, 
  onOpenTracking,
  products = [],
  onSelectProduct
}) {
  const { user, isAdmin } = useAuth();
  const { cart, setIsCartOpen } = useCart();
  const { favorites, setIsWishlistOpen } = useWishlist();
  
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  // Filter live dropdown preview results
  const liveResults = React.useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    
    return products.filter(p => {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const model = (p.modelNumber || '').toLowerCase();
      const cat = (p.category?.name || p.categoryName || '').toLowerCase();
      const color = (p.color || '').toLowerCase();
      const badge = (p.badge || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || model.includes(q) || cat.includes(q) || color.includes(q) || badge.includes(q);
    }).slice(0, 6);
  }, [products, searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (searchQuery.trim()) {
      setShowSearchDropdown(true);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onSearchChange(val);
    setShowSearchDropdown(val.trim().length > 0);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setShowSearchDropdown(false);
    const el = document.getElementById('trending-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleItemClick = (product) => {
    setShowSearchDropdown(false);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 shadow-xs font-sans">
      
      {/* 1. Top Utility Strip */}
      <div className="bg-[#FAF8F5] border-b border-neutral-100 text-[11px] text-neutral-500 py-1.5 px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Free shipping on all orders over $50</span>
            <span className="text-neutral-300">|</span>
            <span>Easy returns</span>
          </div>

          <div className="flex items-center space-x-5">
            <button className="hover:text-neutral-900 transition cursor-pointer">Help &amp; Support</button>
            <span className="text-neutral-300">|</span>
            <button 
              onClick={onOpenTracking}
              className="hover:text-amber-600 font-medium transition cursor-pointer flex items-center space-x-1 text-neutral-700"
              title="Track your shipment in real-time"
            >
              <Truck size={12} className="text-amber-600" />
              <span>Track Order</span>
            </button>
            <span className="text-neutral-300">|</span>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-neutral-900">
              <span>USD</span>
              <ChevronDown size={12} />
            </div>
            <span className="text-neutral-300">|</span>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-neutral-900">
              <Globe size={11} />
              <span>EN</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* Logo: Shopio. */}
        <div className="flex items-center space-x-6 sm:space-x-8 shrink-0">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('ALL');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 flex items-baseline cursor-pointer"
          >
            Shopio<span className="text-amber-500 text-3xl font-black">.</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-neutral-700">
            <button 
              onClick={() => {
                onSelectCategory('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-bold cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => {
                onSelectCategory('ALL');
                const el = document.getElementById('trending-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-amber-600 transition cursor-pointer"
            >
              Shop
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-amber-600 transition cursor-pointer"
            >
              Categories
            </button>
            <button 
              onClick={() => {
                onSelectCategory('TRENDING');
                const el = document.getElementById('trending-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-amber-600 transition cursor-pointer"
            >
              Deals
            </button>
            <button 
              onClick={() => {
                onSelectCategory('LATEST_DROPS');
                const el = document.getElementById('trending-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-amber-600 transition cursor-pointer"
            >
              New Arrivals
            </button>
          </nav>
        </div>

        {/* 3. Real-Time Search Bar with Dropdown Preview */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center bg-neutral-100 hover:bg-neutral-100/80 focus-within:bg-white border border-neutral-200 focus-within:border-neutral-900 rounded-full px-3.5 py-2 transition shadow-inner">
              <Search size={16} className="text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search headphones, shoes, hoodies, chair..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="bg-transparent text-xs outline-none w-full placeholder-neutral-400 text-neutral-900 font-medium"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => { onSearchChange(''); setShowSearchDropdown(false); }}
                  className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full hover:bg-neutral-200/50 transition cursor-pointer"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Floating Search Autocomplete Dropdown */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-fadeIn">
              
              <div className="p-3 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-neutral-700">
                  {liveResults.length > 0 
                    ? `Found ${liveResults.length} matching item${liveResults.length > 1 ? 's' : ''}` 
                    : 'No direct product matches'}
                </span>
                <span className="text-[10px] text-neutral-400">Live search</span>
              </div>

              {liveResults.length > 0 ? (
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                  {liveResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleItemClick(product)}
                      className="p-3 flex items-center space-x-3 hover:bg-amber-50/50 transition cursor-pointer group"
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-11 h-11 object-contain rounded-lg bg-[#F6F4F0] p-1 shrink-0 group-hover:scale-105 transition"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-600 transition truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-[10px] uppercase font-bold text-neutral-400">
                            {product.category?.name || product.categoryName || 'Product'}
                          </span>
                          <span className="text-[10px] text-neutral-300">•</span>
                          <span className="text-xs font-extrabold text-neutral-900">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-neutral-300 group-hover:text-neutral-800 transition shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-neutral-500 space-y-1">
                  <p className="text-xs font-semibold text-neutral-700">No products matching "{searchQuery}"</p>
                  <p className="text-[11px] text-neutral-400">
                    Try typing: <span className="font-mono text-neutral-600">nike, hoodie, sony, watch, coffee, chair</span>
                  </p>
                </div>
              )}

              {/* View all button in dropdown */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider text-center transition block cursor-pointer"
              >
                View all results in store
              </button>
            </div>
          )}
        </div>

        {/* 4. Right Action Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          
          {/* User Account / Profile */}
          <button 
            onClick={onOpenAuth}
            className="flex items-center space-x-1.5 p-2 text-neutral-700 hover:text-neutral-900 transition cursor-pointer"
            title={user ? `Signed in as ${user.fullName}` : 'Sign In'}
          >
            <User size={20} />
            {user && (
              <span className="hidden md:inline text-xs font-semibold max-w-[90px] truncate text-neutral-800">
                {user.fullName || user.username}
              </span>
            )}
          </button>

          {/* Wishlist Icon */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-neutral-900 transition cursor-pointer"
            title="Wishlist"
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-neutral-900 transition cursor-pointer"
            title="Shopping Bag"
          >
            <ShoppingBag size={20} />
            {cart.totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </button>

          {/* Admin Mode Badge - Strictly visible only if logged in as Admin */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center space-x-1.5 text-xs px-3.5 py-1.5 rounded-full border border-amber-400 bg-amber-50 hover:bg-amber-100 font-bold text-amber-900 shadow-xs transition cursor-pointer"
              title="Admin CRUD Management"
            >
              <ShieldCheck size={14} className="text-amber-600" />
              <span>Admin</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
