import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantSidebar from "./RestaurantSidebar"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        <div className="flex min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] text-white">
            <RestaurantSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-3xl font-bold mb-6">All Dishes</h1>
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
                            <p className="text-sm text-white/70">{dish.description}</p>
                            <p className="text-white mt-1">₹{dish.price}</p>
                            <p className="text-xs mt-1">
                                {dish.isAvailable ? (
                                    <span className="text-green-400">Available</span>
                                ) : (
                                    <span className="text-red-400">Not Available</span>
                                )}
                            </p>
                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    className="text-yellow-400 hover:text-yellow-300"
                                    onClick={() => navigate(`/restaurant/editdish/${dish._id}`)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-400 hover:text-red-300"
                                    onClick={() => handleDelete(dish._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AllDishes;
