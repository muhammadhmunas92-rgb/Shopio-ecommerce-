import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductSection({ products, onSelectProduct, activeTab }) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const [scrollIndex, setScrollIndex] = useState(0);

  // Filter products according to activeTab
  const filteredProducts = products.filter(p => {
    if (activeTab === 'ALL') return true;
    return p.collectionTag === activeTab || p.badge === 'NEW';
  });

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  const handlePrev = () => {
    setScrollIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, displayList.length - 3)));
  };

  const handleNext = () => {
    setScrollIndex(prev => (prev < displayList.length - 3 ? prev + 1 : 0));
  };

  return (
    <section id="new-editions" className="bg-forme-green py-14 px-6 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with horizontal separator lines and condensed typography matching screenshot */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex-1 h-[1px] bg-white/25 hidden sm:block"></div>
          <h2 className="font-condensed font-bold text-3xl sm:text-5xl text-[#F2EFE9] tracking-[0.15em] uppercase px-6 text-center select-none">
            NEW EDITIONS
          </h2>
          <div className="flex-1 h-[1px] bg-white/25 hidden sm:block"></div>
        </div>

        {/* Carousel / Grid Container with Navigation Arrows */}
        <div className="relative">
          
          {/* Left Arrow Button matching reference circular outline */}
          <button 
            onClick={handlePrev}
            aria-label="Previous edition"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/60 text-white flex items-center justify-center bg-forme-green/60 backdrop-blur hover:bg-white hover:text-forme-green transition shadow-md active:scale-90"
          >
            <ArrowLeft size={16} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
            {displayList.slice(scrollIndex, scrollIndex + 3).map((product) => {
              const isFav = isFavorite(product.id);
              return (
                <div 
                  key={product.id}
                  className="bg-forme-card rounded-[2.2rem] p-5 sm:p-6 shadow-xl border border-white/30 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 group relative"
                >
                  {/* Top Bar: Badge & Wishlist */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#C2674B] text-white shadow-sm">
                      {product.badge || 'NEW'}
                    </span>

                    <button 
                      onClick={() => toggleFavorite(product)}
                      className={`p-2 rounded-full transition ${
                        isFav 
                          ? 'text-forme-terracotta bg-forme-terracotta/10' 
                          : 'text-neutral-400 hover:text-forme-terracotta hover:bg-neutral-100'
                      }`}
                      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Product Image Stage */}
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="relative cursor-pointer my-4 sm:my-6 overflow-hidden rounded-2xl flex items-center justify-center min-h-[260px] sm:min-h-[300px]"
                  >
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-[260px] sm:h-[300px] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                    />

                    {/* Quick Add overlay button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product.id, 1, product);
                      }}
                      className="absolute bottom-2 right-2 p-3 bg-white/90 backdrop-blur rounded-full text-neutral-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-forme-navy hover:text-white"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>

                  {/* Card Bottom Row: Model Name, Price, and VIEW button */}
                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-neutral-900 tracking-tight">
                        {product.modelNumber || product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-sans mt-0.5">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-4 py-1.5 rounded-full border border-neutral-800/80 text-[11px] uppercase tracking-wider font-medium text-neutral-800 hover:bg-neutral-800 hover:text-white transition active:scale-95"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Arrow Button matching reference circular outline */}
          <button 
            onClick={handleNext}
            aria-label="Next edition"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/60 text-white flex items-center justify-center bg-forme-green/60 backdrop-blur hover:bg-white hover:text-forme-green transition shadow-md active:scale-90"
          >
            <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </section>
  );
}
