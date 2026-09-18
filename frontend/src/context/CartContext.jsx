import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeCartItem as apiRemoveCartItem, clearCart as apiClearCart } from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadCart = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await fetchCart(user.id);
      setCart(data);
    } catch (err) {
      console.warn('Backend cart fetch failed, using local/cached state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadCart();
    } else {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
    }
  }, [user?.id]);

  const addItem = async (productId, quantity = 1, productDetails = null) => {
    if (user?.id) {
      try {
        const updated = await apiAddToCart(user.id, productId, quantity);
        setCart(updated);
        setIsCartOpen(true);
        return true;
      } catch (err) {
        console.error('Add to cart failed:', err);
        // Fallback local update if backend offline during dev
        if (productDetails) {
          setCart(prev => {
            const existing = prev.items.find(i => i.productId === productId);
            let updatedItems;
            if (existing) {
              updatedItems = prev.items.map(i => i.productId === productId ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * i.unitPrice } : i);
            } else {
              updatedItems = [...prev.items, {
                id: Date.now(),
                productId: productDetails.id,
                productName: productDetails.name,
                productModelNumber: productDetails.modelNumber,
                productImageUrl: productDetails.imageUrl,
                productColor: productDetails.color,
                unitPrice: productDetails.price,
                quantity: quantity,
                subtotal: productDetails.price * quantity
              }];
            }
            const totalItems = updatedItems.reduce((acc, i) => acc + i.quantity, 0);
            const totalPrice = updatedItems.reduce((acc, i) => acc + i.subtotal, 0);
            return { items: updatedItems, totalItems, totalPrice };
          });
          setIsCartOpen(true);
          return true;
        }
        return false;
      }
    }
    return false;
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (!user?.id) return;
    try {
      const updated = await apiUpdateCartItem(user.id, cartItemId, quantity);
      setCart(updated);
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  };

  const removeItem = async (cartItemId) => {
    if (!user?.id) return;
    try {
      const updated = await apiRemoveCartItem(user.id, cartItemId);
      setCart(updated);
    } catch (err) {
      console.error('Remove item failed:', err);
    }
  };

  const clear = async () => {
    if (!user?.id) return;
    try {
      await apiClearCart(user.id);
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      isCartOpen,
      setIsCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: clear,
      refreshCart: loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
