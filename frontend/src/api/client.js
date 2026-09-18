import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const fetchProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data?.data || [];
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data?.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data?.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data?.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Categories
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data?.data || [];
};

// Auth
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const fetchUserProfile = async (userId) => {
  const response = await api.get(`/auth/profile/${userId}`);
  return response.data?.data;
};

// Cart
export const fetchCart = async (userId) => {
  const response = await api.get('/cart', { params: { userId } });
  return response.data?.data || { items: [], totalItems: 0, totalPrice: 0 };
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const response = await api.post('/cart/items', { userId, productId, quantity });
  return response.data?.data;
};

export const updateCartItem = async (userId, cartItemId, quantity) => {
  const response = await api.put(`/cart/items/${cartItemId}?userId=${userId}`, { quantity });
  return response.data?.data;
};

export const removeCartItem = async (userId, cartItemId) => {
  const response = await api.delete(`/cart/items/${cartItemId}?userId=${userId}`);
  return response.data?.data;
};

export const clearCart = async (userId) => {
  const response = await api.delete(`/cart?userId=${userId}`);
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data?.data;
};

export const fetchUserOrders = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data?.data || [];
};

export const fetchAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data?.data || [];
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data?.data;
};

// Favorites
export const fetchFavorites = async (userId) => {
  const response = await api.get('/favorites', { params: { userId } });
  return response.data?.data || [];
};

export const addFavorite = async (userId, productId) => {
  const response = await api.post(`/favorites/${productId}?userId=${userId}`);
  return response.data?.data;
};

export const removeFavorite = async (userId, productId) => {
  const response = await api.delete(`/favorites/${productId}?userId=${userId}`);
  return response.data;
};

// Reviews
export const fetchReviews = async (productId) => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data?.data || [];
};

export const submitReview = async (productId, reviewData) => {
  const response = await api.post(`/reviews/product/${productId}`, reviewData);
  return response.data?.data;
};

export default api;
