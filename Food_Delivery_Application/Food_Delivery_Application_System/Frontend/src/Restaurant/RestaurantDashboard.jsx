
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestaurantSidebar from "../Restaurant/RestaurantSidebar";

import {
    FaStore,
    FaClipboardList,
    FaDollarSign,
    FaUtensils,
    FaChartLine,
    FaRegBell,
} from "react-icons/fa";

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
    const [ownerName, setOwnerName] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeDishCount, setActiveDishCount] = useState(0);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                // Fetch Restaurant Info
                const res = await axios.get(
                    `http://localhost:8080/Restaurant/${user?.restaurantId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOwnerName(res.data.name);
                setRestaurantName(res.data.restaurantName);

                // Fetch Food Items
                const foodRes = await axios.get("http://localhost:8080/food-items/restaurant/foods", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allItems = foodRes.data.foods || [];
                const availableItems = allItems.filter(item => item.isAvailable === true);
                setActiveDishCount(availableItems.length);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate, user?.restaurantId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] p-4 text-white flex items-center justify-center">
                <span className="text-xl">Loading...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] mt-18">
            <RestaurantSidebar />

            <main className="flex-1 p-6 overflow-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <FaStore className="text-4xl text-white/70" />
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-wider">
                                {restaurantName || "My Restaurant"}
                            </h1>
                            <p className="text-white/80">Welcome back, {ownerName || "Owner"}</p>
                        </div>
                    </div>
                    <button className="relative">
                        <FaRegBell className="text-2xl text-white/80" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard
                        icon={FaClipboardList}
                        label="Today's Orders"
                        value="--"
                        bgClasses="bg-gradient-to-r from-indigo-600 to-indigo-400"
                    />
                    <DashboardCard
                        icon={FaDollarSign}
                        label="Today's Revenue"
                        value="--"
                        bgClasses="bg-gradient-to-r from-purple-400 to-pink-300"
                    />
                    <DashboardCard
                        icon={FaUtensils}
                        label="Active Dishes"
                        value={activeDishCount}
                        bgClasses="bg-gradient-to-r from-blue-400 to-indigo-400"
                    />
                    <DashboardCard
                        icon={FaChartLine}
                        label="Monthly Growth"
                        value="--"
                        bgClasses="bg-gradient-to-r from-green-400 to-blue-400"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white/10 rounded-2xl shadow-lg p-6 border border-white/20 backdrop-blur-md overflow-auto max-h-[600px]">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
                        <div className="text-gray-300">No orders available.</div>
                    </div>

                    <div className="bg-white/10 rounded-2xl shadow-lg p-6 border border-white/20 backdrop-blur-md flex flex-col">
                        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                        <button
                            className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-white font-bold shadow hover:opacity-90 transition"
                            onClick={() => navigate("/add-food")}
                        >
                            Add Food Items
                        </button>
                        <button
                            className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold shadow hover:opacity-90 transition"
                            onClick={() => navigate("/restaurant/availabledish")}
                        >
                            Available Dishes
                        </button>
                        <button className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-bold shadow hover:opacity-90 transition">
                            View Menu
                        </button>
                        <button className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#a366d9] to-[#f9a8d4] text-white font-bold shadow hover:opacity-90 transition">
                            Order Reports
                        </button>
                        <button
                            className="py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-300 text-white font-bold shadow hover:opacity-90 transition"
                            onClick={() => navigate("/rdup")}
                        >
                            Update Restaurant
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RestaurantDashboard;
