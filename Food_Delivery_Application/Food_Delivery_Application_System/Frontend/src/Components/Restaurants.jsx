import React, { useEffect, useState } from "react";
import axios from "axios";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            setErr("");
            try {
                const res = await axios.get("http://localhost:8080/Restaurant/");
                setRestaurants(res.data.data || []);
            } catch (error) {
                console.log("error", error)
                setErr("Could not load restaurants. Please try again.");
            }
            setLoading(false);
        };
        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen py-12 bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
                    Restaurants
                </h1>
                {err && (
                    <div className="text-center mb-6 text-red-500 font-semibold">{err}</div>
                )}
                {loading ? (
                    <div className="text-center text-xl py-10">Loading restaurants...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                        {restaurants.length ? (
                            restaurants.map((restaurant) => (
                                <div
                                    key={restaurant._id}
                                    className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
                                >
                                    <img
                                        src={
                                            restaurant.image?.[0] ||
                                            "https://via.placeholder.com/250?text=No+Image"
                                        }
                                        alt={restaurant.restaurantName || "Restaurant"}
                                        className="w-full h-48 object-cover rounded mb-4"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold mb-1 text-[#2a2a2a]">
                                            {restaurant.restaurantName}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 font-medium">
                                            {restaurant.cuisineType && (
                                                <span className="px-2 py-0.5 bg-gray-100 rounded">
                                                    {restaurant.cuisineType}
                                                </span>
                                            )}
                                            {restaurant.address?.city && (
                                                <span className="px-2 py-0.5 bg-gray-100 rounded">
                                                    {restaurant.address.city}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-2 flex-1">
                                            {restaurant.address?.street
                                                ? `${restaurant.address.street}, `
                                                : ""}
                                            {restaurant.address?.city || ""}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                No restaurants found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Restaurants;
