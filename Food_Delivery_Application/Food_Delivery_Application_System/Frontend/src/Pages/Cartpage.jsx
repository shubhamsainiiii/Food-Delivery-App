import React, { useEffect, useState } from 'react';
import {
    getCartItems,
    updateCartItem,
    removeCartItem,
    clearCart
} from '../Apis/CartApi';
import CartItem from '../Components/CartItem';
import { Link } from 'react-router-dom';
import emptycart from '../assets/emptycart.svg';
import CartTotal from '../User/CartTotal'

const Cartpage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        try {
            const { data } = await getCartItems();
            setCartItems(data);
            console.log("data", data)
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
            window.dispatchEvent(new Event("cartUpdated"));
        } catch {
            alert('Failed to update item');
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            fetchCartItems();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch {
            alert('Failed to remove item');
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCartItems([]);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch {
            alert('Failed to clear cart');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] text-gray-500 mt-18">
                Loading your cart...
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] m-auto">
                <img
                    src={emptycart}
                    alt="Empty cart"
                    className="w-80 h-auto mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">It’s empty in your cart</h2>
                <p className="text-gray-500 mb-6">To browse more restaurants, visit the main page.</p>
                <Link
                    to="/menu"
                    className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all"
                >
                    See Restaurant Near You
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] px-4 py-10 mt-17">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

                {/* Cart Content: Left Items + Right Summary */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Cart Items */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>

                    {/* Right: Cart Summary */}
                    <div className="w-full lg:w-[350px]">
                        <CartTotal cartItems={cartItems} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 text-center space-x-4">
                    <button
                        onClick={handleClearCart}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all duration-300 cursor-pointer"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cartpage;
