import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaStore,
    FaClipboardList,
    FaDollarSign,
    FaUtensils,
    FaChartLine,
    FaPlusCircle,
    FaListUl,
    FaFileAlt,
    FaEdit,
} from 'react-icons/fa';

const RestaurantSidebar = () => {
    const baseLinkClass =
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 font-medium';
    const activeLinkClass = 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg';

    return (
        <aside className="w-64 bg-[#201e29] min-h-screen p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white text-center tracking-widest mb-6">
                    Dashboard
                </h2>

                {/* Nav Items */}
                <nav className="flex flex-col gap-3">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
                        }
                        end
                    >
                        <FaStore /> Home
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
                        }
                    >
                        <FaClipboardList /> Orders
                    </NavLink>

                    <NavLink
                        to="/revenue"
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
                        }
                    >
                        <FaDollarSign /> Revenue
                    </NavLink>

                    <NavLink
                        to="/dishes"
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
                        }
                    >
                        <FaUtensils /> Dishes
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
                        }
                    >
                        <FaChartLine /> Reports
                    </NavLink>
                </nav>
            </div>

            {/* Quick Actions */}
            <div className="pt-8 border-t border-gray-700">
                <h3 className="text-gray-300 uppercase tracking-wider mb-3 font-semibold text-sm">
                    Quick Actions
                </h3>
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/add-food"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        <FaPlusCircle /> Add Food Items
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        <FaListUl /> View Menu
                    </NavLink>
                    <NavLink
                        to="/order-reports"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        <FaFileAlt /> Order Reports
                    </NavLink>
                    <NavLink
                        to="/update-restaurant"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-300 text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        <FaEdit /> Update Restaurant
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
};

export default RestaurantSidebar;
