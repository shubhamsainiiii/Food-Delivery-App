import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBox, FaChartLine, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const DeliveryBoySidebar = () => {
    const [deliveryBoy, setDeliveryBoy] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        // Fetch delivery boy profile info for sidebar
        const fetchDeliveryBoy = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/Delivery-Boy/getdeliveryboy`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDeliveryBoy(res.data.deliveryBoy);
            } catch (error) {
                console.log(error);
                setDeliveryBoy(null);
            }
        };
        fetchDeliveryBoy();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('deliveryBoyToken');
        navigate('/login');
    };

    const navLinks = [
        { path: '/delivery-boy/dashboard', label: 'Dashboard  ', icon: FaHome },
        { path: '/delivery-boy/update-profile', label: 'Update Profile', icon: FaUserCircle },
        { path: '/delivery-boy/orders', label: 'My Orders', icon: FaBox },
        { path: '/delivery-boy/performance', label: 'Performance', icon: FaChartLine },
    ];

    return (
        <aside className="w-64 h-screen fixed top-0 left-0 bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] shadow-md p-6 border-r border-gray-200 flex flex-col">

            {/* Profile Section */}
            <div className="text-center mb-10">
                <div className="relative w-28 h-28 mt-10 m-auto mb-5">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={deliveryBoy?.image || 'https://via.placeholder.com/150'}
                        alt="Delivery Boy Avatar"
                    />
                </div>
                <h2 className="font-bold text-lg text-gray-800">
                    {deliveryBoy?.name || 'Delivery Boy'}
                </h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-2 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-orange-100 text-orange-600 font-bold border-l-4 border-orange-500'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <link.icon className="mr-3" />
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 mb-10 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 cursor-pointer"
            >
                <FaSignOutAlt className="mr-3" /> Log Out
            </button>
        </aside>
    );
};

export default DeliveryBoySidebar;
