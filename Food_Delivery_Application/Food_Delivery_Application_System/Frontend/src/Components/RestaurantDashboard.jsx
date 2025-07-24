import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getRestaurantIdFromToken from "../Utils/getRestaurantIdFromToken";
import { FaStore, FaClipboardList, FaDollarSign, FaUtensils, FaChartLine, FaRegBell } from "react-icons/fa";

const DashboardCard = ({ icon: Icon, label, value, bgClasses }) => (
    <div className="flex items-center bg-white/10 rounded-xl shadow-lg p-4 backdrop-blur-md border border-white/20">
        <div className={`text-2xl p-4 rounded-full mr-4 ${bgClasses}`}>
            <Icon className="text-white" />
        </div>
        <div>
            <p className="text-gray-100 text-sm">{label}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const RestaurantDashboard = () => {
    const navigate = useNavigate();
    const [ownerName, setOwnerName] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) return navigate('/login');
            const restaurantId = getRestaurantIdFromToken(token);
            if (!restaurantId) return navigate('/login');
            try {
                const res = await axios.get(`http://localhost:8080/Restaurant/${restaurantId}`);
                setOwnerName(res.data.name);
                setRestaurantName(res.data.restaurantName);
            } catch (error) {
                console.error('Failed to fetch:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurantData();
    }, [navigate]);

    if (loading) {
        return <div className="min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] p-4 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <FaStore className="text-4xl text-white/70" />
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wider">{restaurantName || 'My Restaurant'}</h1>
                        <p className="text-white/80">Welcome back, {ownerName || 'Owner'}</p>
                    </div>
                </div>
                <button className="relative">
                    <FaRegBell className="text-2xl text-white/80" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
            {/* Stats Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard icon={FaClipboardList} label="Today's Orders" value="36" bgClasses="bg-gradient-to-r from-indigo-600 to-indigo-400" />
                <DashboardCard icon={FaDollarSign} label="Today's Revenue" value="₹2,750" bgClasses="bg-gradient-to-r from-purple-400 to-pink-300" />
                <DashboardCard icon={FaUtensils} label="Active Dishes" value="48" bgClasses="bg-gradient-to-r from-blue-400 to-indigo-400" />
                <DashboardCard icon={FaChartLine} label="Monthly Growth" value="14%" bgClasses="bg-gradient-to-r from-green-400 to-blue-400" />
            </div>
            {/* Content */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="col-span-2 bg-white/10 rounded-2xl shadow-lg p-6 border border-white/20 backdrop-blur-md">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
                    <table className="w-full text-left text-white text-sm">
                        <thead>
                            <tr>
                                <th className="pb-2">Order #</th>
                                <th className="pb-2">Customer</th>
                                <th className="pb-2">Items</th>
                                <th className="pb-2">Total</th>
                                <th className="pb-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-white/20">
                                <td className="py-2">#2039</td>
                                <td>Vikram S.</td>
                                <td>3</td>
                                <td>₹450</td>
                                <td><span className="text-green-300">Delivered</span></td>
                            </tr>
                            <tr className="border-t border-white/20">
                                <td className="py-2">#2040</td>
                                <td>Divya P.</td>
                                <td>1</td>
                                <td>₹150</td>
                                <td><span className="text-yellow-300">Preparing</span></td>
                            </tr>
                            <tr className="border-t border-white/20">
                                <td className="py-2">#2041</td>
                                <td>Amit K.</td>
                                <td>2</td>
                                <td>₹360</td>
                                <td><span className="text-blue-300">On the way</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Quick Actions */}
                <div className="bg-white/10 rounded-2xl shadow-lg p-6 border border-white/20 backdrop-blur-md flex flex-col">
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                    <button
                        className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-white font-bold shadow hover:opacity-90 transition"
                        onClick={() => navigate('/add-food')}
                    >
                        Add Food Items
                    </button>
                    <button className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-bold shadow hover:opacity-90 transition">
                        View Menu
                    </button>
                    <button className="py-2 rounded-lg bg-gradient-to-r from-[#a366d9] to-[#f9a8d4] text-white font-bold shadow hover:opacity-90 transition">
                        Order Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
