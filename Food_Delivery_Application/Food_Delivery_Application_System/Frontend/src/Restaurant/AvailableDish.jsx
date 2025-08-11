import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import RestaurantSidebar from "./RestaurantSidebar";

const AvailableDish = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (!user || user.role !== "restaurant") return;

        const fetchDishes = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await axios.get(
                    "http://localhost:8080/food-items/restaurant/foods",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDishes(res.data.foods || []);
            } catch {
                setError("Could not fetch dishes.");
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    const toggleAvailability = async (dishId, current) => {
        try {
            await axios.put(
                `http://localhost:8080/food-items/update/${dishId}`,
                { isAvailable: !current },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setDishes((prev) =>
                prev.map((dish) =>
                    dish._id === dishId ? { ...dish, isAvailable: !current } : dish
                )
            );
        } catch {
            alert("Update failed");
        }
    };

    if (!user || user.role !== "restaurant") return null;

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* ==== Sidebar ==== */}
            <div className="w-64 fixed top-0 left-0 h-screen border-r shadow-md bg-white z-10">
                <RestaurantSidebar />
            </div>

            {/* ==== Main Content ==== */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Manage Dish Availability
                    </h2>

                    {loading && (
                        <div className="text-center text-gray-500">Loading...</div>
                    )}
                    {error && <div className="text-center text-red-500">{error}</div>}
                    {!loading && dishes.length === 0 && (
                        <div className="text-center text-gray-500">No dishes found.</div>
                    )}

                    {/* Dish Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {!loading &&
                            dishes.map((dish) => (
                                <div
                                    key={dish._id}
                                    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex items-center justify-between"
                                >
                                    {/* LEFT: Image + Info */}
                                    <div className="flex items-center gap-4 w-3/4">
                                        <img
                                            src={
                                                dish.images && dish.images.length > 0
                                                    ? dish.images[0].imageUrl
                                                    : "https://via.placeholder.com/80"
                                            }
                                            alt={dish.foodName}
                                            className="w-20 h-20 rounded-lg object-cover "
                                        />

                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">
                                                {dish.foodName}
                                            </h4>
                                            <p className="text-sm mb-1">
                                                {dish.isAvailable ? (
                                                    <span className="text-green-600 flex items-center gap-1 font-medium">
                                                        <FiCheckCircle /> Available
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 flex items-center gap-1 font-medium">
                                                        <FiXCircle /> Unavailable
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-sm flex items-center text-gray-600 font-medium">
                                                <FaRupeeSign className="mr-1" />
                                                {dish.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT: Toggle switch */}
                                    <div className="flex items-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={dish.isAvailable}
                                                onChange={() =>
                                                    toggleAvailability(dish._id, dish.isAvailable)
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors 
                        peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                        after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                                        </label>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AvailableDish;
