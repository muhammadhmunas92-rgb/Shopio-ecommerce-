import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistModal({ onSelectProduct }) {
  const { favorites, isWishlistOpen, setIsWishlistOpen, toggleFavorite } = useWishlist();
  const { addItem } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-forme-cream rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/40 p-6 sm:p-8 relative flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={() => setIsWishlistOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-200/70 text-neutral-500 hover:text-neutral-900 transition"
        >
          <X size={20} />
        </button>

        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Heart size={22} className="text-forme-terracotta fill-forme-terracotta" />
            <h2 className="font-serif text-2xl text-neutral-900 font-medium">Saved Wishlist</h2>
            <span className="text-xs text-neutral-500 font-mono">({favorites.length})</span>
          </div>

          {favorites.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-3">
              <Heart size={44} className="stroke-[1] mx-auto text-neutral-300" />
              <p className="font-serif text-lg text-neutral-700">Your wishlist is empty</p>
              <p className="text-xs max-w-xs mx-auto text-neutral-400">
                Click the heart on any edition to save it to your personal curation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((fav) => {
                const prod = fav.product;
                if (!prod) return null;
                return (
                  <div 
                    key={fav.id || prod.id}
                    className="bg-white rounded-2xl p-4 border border-forme-border/60 shadow-xs flex flex-col justify-between group"
                  >
                    <div 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectProduct(prod);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="bg-forme-card rounded-xl p-3 flex items-center justify-center mb-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="h-28 object-contain drop-shadow"
                        />
                      </div>
                      <h4 className="font-serif text-sm font-medium text-neutral-900 line-clamp-1">
                        {prod.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-neutral-500">{prod.modelNumber}</span>
                        <span className="font-serif text-sm font-semibold text-neutral-900">
                          ${Number(prod.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          addItem(prod.id, 1, prod);
                          toggleFavorite(prod);
                        }}
                        className="flex-1 py-2 px-3 rounded-full bg-forme-navy hover:bg-forme-navy-dark text-white text-[11px] uppercase tracking-wider font-medium transition flex items-center justify-center space-x-1.5"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleFavorite(prod)}
                        className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-forme-border/60 text-right">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 font-medium"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
