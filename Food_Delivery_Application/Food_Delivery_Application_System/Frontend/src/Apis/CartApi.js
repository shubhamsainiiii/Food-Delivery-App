import axios from 'axios';

const API_URL = 'http://localhost:8080/Cart';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
});

export const addToCart = (foodItemId, quantity) =>
    axios.post(`${API_URL}/createcart`, { foodItemId, quantity }, getAuthHeaders());

export const getCartItems = () =>
    axios.get(`${API_URL}/getcart`, getAuthHeaders());

export const updateCartItem = (foodItemId, quantity) =>
    axios.put(`${API_URL}/updatecart`, { foodItemId, quantity }, getAuthHeaders());

export const removeCartItem = (id) =>
    axios.delete(`${API_URL}/removecart/${id}`, getAuthHeaders());

export const clearCart = () =>
    axios.delete(`${API_URL}/`, getAuthHeaders());
