// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`bg-white border-r shadow-sm w-64 p-6 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="font-bold text-xl text-yellow-600 mb-6">🍽️ FoodStar</div>
            <nav className="flex flex-col gap-4 text-gray-600 text-sm">
                <a className="font-semibold text-yellow-600" href="#">Dashboard</a>
                <a href="#">Total Restaurant</a>
                <a href="#">Total Users</a>
                <a href="#">Total Delivery-Boys</a>
                <a href="#">Total Revenue</a>
                <a href="#">Wallet</a>
                <a href="#">Calendar</a>
                <a href="#">Settings</a>
            </nav>
        </aside>
    );
};

export default Sidebar;
