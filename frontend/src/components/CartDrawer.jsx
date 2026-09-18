import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-forme-cream shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-forme-border/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-forme-navy" />
              <h2 className="font-serif text-xl text-neutral-900 font-medium">Shopping Bag</h2>
              <span className="text-xs text-neutral-500 font-mono">({cart.totalItems})</span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-3">
                <ShoppingBag size={48} className="stroke-[1] text-neutral-400" />
                <p className="font-serif text-lg text-neutral-700">Your bag is empty</p>
                <p className="text-xs max-w-xs text-neutral-400">
                  Explore our sculptural editions and discover your next iconic silhouette.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs uppercase tracking-widest text-forme-terracotta hover:underline font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl p-4 flex gap-4 border border-forme-border/50 shadow-xs"
                >
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-20 h-20 object-contain rounded-xl bg-forme-card p-1 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm font-medium text-neutral-900 line-clamp-1">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-neutral-500">{item.productModelNumber}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-rose-600 transition"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-neutral-200 rounded-full px-2 py-0.5 text-xs bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-1.5 text-neutral-600 hover:text-neutral-900 font-bold"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-1.5 text-neutral-600 hover:text-neutral-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-neutral-900">
                        ${Number(item.subtotal).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.items.length > 0 && (
            <div className="p-6 bg-white border-t border-forme-border/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">${Number(cart.totalPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Studio Shipping</span>
                  <span className="text-emerald-700 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Handcrafted Dustbag</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
                <div className="pt-2 flex justify-between text-base font-serif text-neutral-900 font-bold border-t border-neutral-100">
                  <span>Total</span>
                  <span>${Number(cart.totalPrice).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-full bg-forme-navy hover:bg-forme-navy-dark text-white text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center space-x-2 shadow-md active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex justify-between text-[11px] text-neutral-400">
                <button 
                  onClick={clearCart}
                  className="hover:text-rose-600 transition"
                >
                  Clear all items
                </button>
                <span>Taxes calculated at billing</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
