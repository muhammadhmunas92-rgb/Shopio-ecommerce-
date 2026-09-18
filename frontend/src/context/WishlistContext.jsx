import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFavorites, addFavorite, removeFavorite } from '../api/client';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const loadFavorites = async () => {
    if (!user?.id) return;
    try {
      const data = await fetchFavorites(user.id);
      setFavorites(data);
    } catch (err) {
      console.warn('Backend favorites fetch failed:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user?.id]);

  const toggleFavorite = async (product) => {
    if (!user?.id) return;
    const isFav = favorites.some(f => f.product?.id === product.id);

    try {
      if (isFav) {
        await removeFavorite(user.id, product.id);
        setFavorites(prev => prev.filter(f => f.product?.id !== product.id));
      } else {
        const added = await addFavorite(user.id, product.id);
        setFavorites(prev => [added, ...prev]);
      }
    } catch (err) {
      // Optimistic toggle fallback
      if (isFav) {
        setFavorites(prev => prev.filter(f => f.product?.id !== product.id));
      } else {
        setFavorites(prev => [{ id: Date.now(), product }, ...prev]);
      }
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(f => f.product?.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      favorites,
      isWishlistOpen,
      setIsWishlistOpen,
      toggleFavorite,
      isFavorite,
      refreshFavorites: loadFavorites
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
