import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantSidebar from "./RestaurantSidebar";
import { useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaTrashAlt,
    FaRupeeSign,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

const AllDishes = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchDishes = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const res = await axios.get(
                "http://localhost:8080/food-items/restaurant/foods",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setDishes(res.data.foods);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("userToken");
        if (!window.confirm("Are you sure you want to delete this dish?")) return;

        try {
            await axios.delete(`http://localhost:8080/food-items/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDishes((prev) => prev.filter((dish) => dish._id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    if (loading) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] flex">
            {/* ==== FIXED SIDEBAR ==== */}
            <div className="w-64 fixed top-0 left-0 h-screen border-r shadow-md bg-[#201e29] z-10">
                <RestaurantSidebar />
            </div>

            {/* ==== MAIN CONTENT ==== */}
            <main className="flex-1 ml-64 p-6 overflow-auto text-white mt-18">
                <h1 className="text-3xl font-bold mb-6">All Dishes</h1>

                {dishes.length === 0 ? (
                    <p>No dishes found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dishes.map((dish) => (
                            <div
                                key={dish._id}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow"
                            >
                                {dish.images?.length > 0 && (
                                    <img
                                        src={dish.images[0].imageUrl}
                                        alt={dish.foodName}
                                        className="w-full h-40 object-cover rounded mb-3"
                                    />
                                )}
                                <h2 className="text-xl font-semibold">{dish.foodName}</h2>
                                <p className="text-sm text-white/70 mb-1">{dish.description}</p>

                                {/* Price with icon */}
                                <p className="flex items-center text-white font-medium">
                                    <FaRupeeSign className="mr-1 text-green-300" />
                                    {dish.price}
                                </p>

                                {/* Availability with icon */}
                                <p className="text-xs mt-1 flex items-center gap-1">
                                    {dish.isAvailable ? (
                                        <>
                                            <FaCheckCircle className="text-green-400" />{" "}
                                            <span className="text-green-400">Available</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaTimesCircle className="text-red-400" />{" "}
                                            <span className="text-red-400">Not Available</span>
                                        </>
                                    )}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 mt-3">
                                    <button
                                        className="text-yellow-400 hover:text-yellow-300"
                                        title="Edit Dish"
                                        onClick={() =>
                                            navigate(`/restaurant/editdish/${dish._id}`)
                                        }
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-300"
                                        title="Delete Dish"
                                        onClick={() => handleDelete(dish._id)}
                                    >
                                        <FaTrashAlt size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllDishes;
