import React, { useEffect, useState } from 'react';
import { getCartItems, updateCartItem, removeCartItem, clearCart } from '../Apis/CartApi';
import CartItem from '../Components/CartItem';

const Cartpage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        try {
            const { data } = await getCartItems();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            alert('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleUpdate = async (foodItemId, quantity) => {
        try {
            await updateCartItem(foodItemId, quantity);
            fetchCartItems();
        } catch {
            alert('Failed to update item');
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            fetchCartItems();
        } catch {
            alert('Failed to remove item');
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCartItems([]);
        } catch {
            alert('Failed to clear cart');
        }
    };

    if (loading) return <p>Loading your cart...</p>;

    if (cartItems.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <CartItem key={item._id} item={item} onUpdate={handleUpdate} onRemove={handleRemove} />
            ))}
            <button onClick={handleClearCart} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
                Clear Cart
            </button>
        </div>
    );
};

export default Cartpage;
