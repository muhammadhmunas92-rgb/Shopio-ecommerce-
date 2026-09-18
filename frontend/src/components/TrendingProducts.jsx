import React, { useEffect, useState, useMemo } from 'react';
import { Heart, ShoppingBag, Star, Eye, Sparkles, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function TrendingProducts({ 
  products, 
  onSelectProduct, 
  selectedCategory: externalCategory,
  onSelectCategory,
  searchQuery = '',
  onClearSearch
}) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const [internalFilter, setInternalFilter] = useState('ALL');

  // Keep internal filter in sync whenever externalCategory changes
  useEffect(() => {
    if (externalCategory) {
      setInternalFilter(externalCategory);
    }
  }, [externalCategory]);

  const activeCategory = internalFilter;

  // Real-time multi-attribute fuzzy & partial letter search filter
  const displayList = useMemo(() => {
    let result = products;

    // 1. Filter by Search Query if present
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const model = (p.modelNumber || '').toLowerCase();
        const cat = (p.category?.name || p.categoryName || '').toLowerCase();
        const color = (p.color || '').toLowerCase();
        const badge = (p.badge || '').toLowerCase();

        if (
          name.includes(q) || 
          desc.includes(q) || 
          model.includes(q) || 
          cat.includes(q) || 
          color.includes(q) || 
          badge.includes(q)
        ) {
          return true;
        }

        // Multi-word support
        const words = q.split(/\s+/).filter(Boolean);
        if (words.length > 1) {
          const combined = `${name} ${desc} ${model} ${cat} ${color}`;
          return words.every(w => combined.includes(w));
        }

        return false;
      });
    }

    // 2. Filter by Active Category if not ALL
    if (activeCategory !== 'ALL') {
      const searchCat = activeCategory.toLowerCase();
      result = result.filter(p => {
        const catSlug = (p.category?.slug || p.categorySlug || '').toLowerCase();
        if (searchCat === 'fashion') {
          return catSlug === 'fashion' || catSlug === 'men' || catSlug === 'women';
        }
        return catSlug === searchCat || p.collectionTag?.toLowerCase() === searchCat;
      });
    }

    return result;
  }, [products, searchQuery, activeCategory]);

  const filterTabs = [
    { id: 'ALL', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion & Hoodies' },
    { id: 'shoes', label: 'Shoes & Sneakers' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'watches', label: 'Watches' },
    { id: 'bags', label: 'Bags' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const handleTabClick = (tabId) => {
    setInternalFilter(tabId);
    if (onSelectCategory) {
      onSelectCategory(tabId);
    }
  };

  return (
    <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-mt-20 font-sans">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              Full Marketplace Catalog
            </span>
            <span className="text-xs text-neutral-400">({displayList.length} items shown)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Trending Products &amp; Best Sellers
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Curated electronics, hoodies, footwear, ergonomic furniture, beauty essentials &amp; gear.
          </p>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {filterTabs.map((tab) => {
            const isTabActive = activeCategory.toLowerCase() === tab.id.toLowerCase();
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isTabActive
                    ? 'bg-neutral-900 text-white shadow-sm ring-2 ring-neutral-900 scale-105'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Search Notification Banner */}
      {searchQuery && searchQuery.trim() && (
        <div className="mb-6 p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-neutral-800">
            <Search size={15} className="text-amber-600 shrink-0" />
            <span>Search results for:</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-300 font-bold text-amber-900 font-mono">
              "{searchQuery}"
            </span>
            <span className="text-neutral-500 font-semibold">
              ({displayList.length} product{displayList.length === 1 ? '' : 's'} matching)
            </span>
          </div>

          <button
            type="button"
            onClick={onClearSearch}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 underline flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Clear search filter</span>
            <X size={13} />
          </button>
        </div>
      )}

      {/* No Results Fallback */}
      {displayList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <Search size={28} />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">
            No products found matching "{searchQuery}"
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            We couldn't find any products matching your search letters. Try searching with different keywords like <span className="font-semibold text-neutral-700">hoodie, shoes, sony, watch, chair, bottle</span>.
          </p>
          {onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Reset &amp; View All 28 Products
            </button>
          )}
        </div>
      ) : (
        /* Grid of Products */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((product) => {
            const isFav = isFavorite(product.id);
            const catName = product.category?.name || product.categoryName || 'Product';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between group relative"
              >
                {/* Badge & Wishlist Button */}
                <div className="flex justify-between items-center z-10">
                  {product.badge ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                      product.badge.includes('-')
                        ? 'bg-rose-100 text-rose-700'
                        : product.badge === 'NEW'
                        ? 'bg-emerald-100 text-emerald-800'
                        : product.badge === 'BESTSELLER'
                        ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {product.badge}
                    </span>
                  ) : <div />}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    className={`p-1.5 rounded-full transition cursor-pointer ${
                      isFav
                        ? 'text-rose-600 bg-rose-50'
                        : 'text-neutral-400 hover:text-rose-600 hover:bg-neutral-50'
                    }`}
                    title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Product Image Box with Quick View & Add on hover */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="my-3 relative cursor-pointer overflow-hidden rounded-xl bg-[#F6F4F0] p-4 flex items-center justify-center min-h-[170px] sm:min-h-[200px]"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-[160px] sm:h-[190px] object-contain group-hover:scale-105 transition duration-500 drop-shadow-sm"
                  />

                  {/* Overlay Action Buttons */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 rounded-full bg-white text-neutral-800 shadow-md hover:bg-neutral-900 hover:text-white transition cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product.id, 1, product);
                      }}
                      className="p-2.5 rounded-full bg-amber-500 text-neutral-900 shadow-md hover:bg-amber-600 hover:text-white transition cursor-pointer"
                      title="Quick Add to Cart"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                    {catName}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-600 cursor-pointer transition"
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 text-[11px] text-neutral-500">
                    <div className="flex text-amber-400">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="font-semibold text-neutral-800">{product.averageRating || 4.9}</span>
                    <span>({product.reviewCount || 25})</span>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="pt-2 flex justify-between items-center">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-sm sm:text-base font-extrabold text-neutral-900">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.badge?.includes('-') && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${(Number(product.price) * 1.25).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => addItem(product.id, 1, product)}
                      className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 transition active:scale-95 cursor-pointer"
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag size={15} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
