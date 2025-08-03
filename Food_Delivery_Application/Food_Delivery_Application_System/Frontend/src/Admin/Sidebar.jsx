import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`bg-white border-r shadow-sm w-64 p-6 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="font-bold text-xl text-yellow-600 mb-6">🍽️ FoodStar</div>
            <nav className="flex flex-col gap-4 text-gray-600 text-sm">
                <Link className="font-semibold text-yellow-600" to="#">Dashboard</Link>
                <Link to="/admin/restaurants">Total Restaurant</Link>
                <Link to="#">Total Users</Link>
                <Link to="/admin/deliveryboy">Total Delivery-Boys</Link>
                <Link to="#">Total Revenue</Link>
                <Link to="#">Wallet</Link>
                <Link to="#">Calendar</Link>
                <Link to="#">Settings</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;

