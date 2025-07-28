import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link to="/" className="text-xl font-bold">ORDERIT</Link>

                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-orange-600">Home</Link>
                    <Link to="/shop" className="hover:text-orange-600">Shop</Link>
                    <Link to="/offers" className="hover:text-orange-600">Offers</Link>
                    <Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link>
                    <Link to="/pages" className="hover:text-orange-600">Pages</Link>
                    <Link to="/contact" className="hover:text-orange-600">Contact Us</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link to="/login" className="hidden md:block px-4 py-2 border rounded">Log In</Link>
                    <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded">Sign Up</Link>
                </div>
            </div>
        </header>
    );
}
