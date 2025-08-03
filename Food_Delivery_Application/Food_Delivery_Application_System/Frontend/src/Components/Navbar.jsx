import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("user")));
    const token = localStorage.getItem("userToken");

    const handleCartClick = () => {
        if (!token) {
            navigate("/login");
        } else {
            navigate("/user/orders");
        }
    };

    const fetchCartCount = async () => {
        try {
            if (token) {
                const res = await axios.get("http://localhost:8080/Cart/getcart", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const totalItems = res.data.reduce((acc, item) => acc + (item.quantity || 1), 0);
                setCartCount(totalItems);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();

        const handleCartUpdated = () => {
            fetchCartCount(); // refresh cart count
        };

        const handleProfileUpdated = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUserData(updatedUser);
        };

        // Listen to custom cartUpdated event
        window.addEventListener("cartUpdated", handleCartUpdated);
        window.addEventListener("profileUpdated", handleProfileUpdated);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
            window.removeEventListener("profileUpdated", handleProfileUpdated);
        };
    }, [token]);


    return (
        <header className="bg-white shadow fixed top-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link to="/" className="text-xl font-bold">DishKart</Link>

                <nav className="hidden md:flex space-x-6">
                    <Link to="/home" className="hover:text-orange-600 transition-all duration-300">Home</Link>
                    <Link to="/about" className="hover:text-orange-600 transition-all duration-300">About</Link>
                    <Link to="/menu" className="hover:text-orange-600 transition-all duration-300">Menu</Link>
                    <Link to="/offers" className="hover:text-orange-600 transition-all duration-300">Category</Link>
                    <Link to="/restaurants" className="hover:text-orange-600 transition-all duration-300">Restaurants</Link>
                    <Link to="/contact" className="hover:text-orange-600 transition-all duration-300">Contact Us</Link>
                    <Link to="/faq" className="hover:text-orange-600 transition-all duration-300">FAQs</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <div className="relative cursor-pointer" onClick={handleCartClick}>
                        <FaShoppingCart className="text-xl text-black" />
                        {token && cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* User Auth */}
                    {token ? (
                        <>
                            <img
                                src={userData?.image || "https://via.placeholder.com/40"}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
                                onClick={() => navigate(`/${userData?.role}/dashboard`)}
                            />

                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 border rounded">
                                Log In
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
