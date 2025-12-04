import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FaClipboardList,
    FaUtensils,
    FaPlusCircle,
    FaSignOutAlt,
    FaHome
} from 'react-icons/fa';

const RestaurantSidebar = () => {
    const navigate = useNavigate();
    const [owner, setOwner] = useState({ name: '', image: '', restaurantId: '' });

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const res = await axios.get('http://localhost:8080/User/getuser', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOwner({
                    name: res.data.user.name,
                    image: res.data.user.image || '',
                    restaurantId: res.data.user.restaurantId || ''   
                });
            } catch (error) {
                console.error('Failed to fetch owner data:', error);
            }
        };

        fetchOwnerData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken'); 
        navigate('/login');
    };

    const baseLinkClass =
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 font-medium';
    const activeLinkClass =
        'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg';

    const navItems = [
        { to: '/restaurant/dashboard', icon: <FaHome />, label: 'Dashboard' },
        { to: '/restaurant/orders', icon: <FaClipboardList />, label: 'Orders' },
        { to: '/restaurant/dishes', icon: <FaUtensils />, label: 'Dishes' },
        { to: '/add-food', icon: <FaPlusCircle />, label: 'Add Food Items' },
    ];

    return (
        <aside className="w-64 bg-[#201e29] h-screen fixed p-6 flex flex-col justify-between mt-8">
            <div className='mt-5'>
                {/* Owner Info */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={owner.image || '/default-profile.png'}
                        alt="Owner"
                        className="w-32 h-32 rounded-full object-cover mb-2 hover:scale-103 transition-all duration-300"
                    />
                    <h3 className="text-white font-semibold text-lg">{owner.name}</h3>
                </div>

                <nav className="flex flex-col gap-2 mb-6">
                    {navItems.map(({ to, icon, label }, idx) => (
                        <NavLink
                            key={idx}
                            to={to}
                            className={({ isActive }) =>
                                `${baseLinkClass} ${isActive
                                    ? activeLinkClass
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`
                            }
                        >
                            {icon} {label}
                        </NavLink>
                    ))}
                </nav>

                <div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-10 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow hover:opacity-90 transition-all duration-300 cursor-pointer"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default RestaurantSidebar;

