/* eslint-disable no-unused-vars */
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
    <div className="flex items-center bg-white/10 rounded-xl shadow-sm shadow-gray-400 p-4 backdrop-blur-md border border-white/20">
        <div className={`text-2xl p-4 rounded-full mr-4 ${bgClasses}`}>
            <Icon className="text-gray-700" />
        </div>
        <div>
            <p className="text-gray-700 text-sm">{label}</p>
            <p className="text-gray-700 text-2xl font-bold">{value}</p>
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
                const res = await axios.get(
                    `http://localhost:8080/Restaurant/restaurantdetails/${user?.restaurantId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOwnerName(res.data.restaurant.name);
                setRestaurantName(res.data.restaurant.restaurantName);

                const foodRes = await axios.get(
                    "http://localhost:8080/food-items/restaurant/foods",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const allItems = foodRes.data.foods || [];
                const availableItems = allItems.filter((item) => item.isAvailable === true);
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
            <div className="min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] p-4 text-gray-800 flex items-center justify-center">
                <span className="text-xl">Loading...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] flex mt-15">
            <div className="w-64 fixed top-0 left-0 h-screen border-r z-10">
                <RestaurantSidebar />
            </div>

            <main className="flex-1 ml-64 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <FaStore className="text-4xl text-gray-700" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 tracking-wider">
                                {restaurantName || "My Restaurant"}
                            </h1>
                            <p className="text-gray-500">
                                Welcome back, {ownerName || "Owner"}
                            </p>
                        </div>
                    </div>
                    <button className="relative">
                        <FaRegBell className="text-2xl text-gray-500" />
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
                    <div className="col-span-2 bg-white rounded-2xl shadow-sm shadow-gray-400 p-6 border border-gray-200 overflow-auto max-h-[600px]">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Recent Orders
                        </h2>
                        <div className="text-gray-500">No orders available.</div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm shadow-gray-400 p-6 border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Quick Actions
                        </h2>
                        <button
                            className="py-2 mb-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold shadow hover:opacity-90 transition-all duration-300 cursor-pointer"
                            onClick={() => navigate("/restaurant/availabledish")}
                        >
                            Available Dishes
                        </button>
                        <button
                            className="py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-300 text-white font-bold shadow hover:opacity-90 transition-all duration-300 cursor-pointer"
                            onClick={() => navigate(`/update-restaurant/${user?.restaurantId}`)}
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
