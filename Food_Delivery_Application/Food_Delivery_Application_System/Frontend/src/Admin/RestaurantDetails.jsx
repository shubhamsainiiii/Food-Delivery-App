import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

// Filled icons from different sets
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdRestaurantMenu, MdWarning } from "react-icons/md";
import { RiFileListFill } from "react-icons/ri";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/Admin/restaurant/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = { ...res.data.restaurantData };
                delete data.password;
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, [id, token]);

    if (loading) {
        return <div className="p-5 text-center text-lg font-semibold">Loading...</div>;
    }

    if (!restaurant) {
        return <div className="p-5 text-center text-lg text-red-500">Restaurant not found.</div>;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 border-b pb-4 mb-6">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <MdRestaurantMenu className="text-4xl text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{restaurant.restaurantName}</h1>
                            <p className="text-gray-500">Owned by {restaurant.name}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-800 text-lg" />
                            <strong>Email:</strong> {restaurant.email}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaPhoneAlt className="text-gray-800 text-lg" />
                            <strong>Phone:</strong> {restaurant.phone}
                        </p>
                        <p className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-gray-800 text-lg mt-1" />
                            <strong className="whitespace-nowrap">Address:</strong>
                            <span className="flex flex-col">
                                {typeof restaurant.address === "object" ? (
                                    <>
                                        {restaurant.address.street && <span>{restaurant.address.street}</span>}
                                        {restaurant.address.city && restaurant.address.state && (
                                            <span>{restaurant.address.city}, {restaurant.address.state}</span>
                                        )}
                                        {restaurant.address.zip && <span>{restaurant.address.zip}</span>}
                                    </>
                                ) : (
                                    restaurant.address
                                )}
                            </span>
                        </p>

                        <p className="flex items-center gap-3">
                            <RiFileListFill className="text-gray-800 text-lg" />
                            <strong>GST Number:</strong> {restaurant.gstnumber || "N/A"}
                        </p>
                        <p className="flex items-center gap-3">
                            <MdRestaurantMenu className="text-gray-800 text-lg" />
                            <strong>Cuisine:</strong> {restaurant.cuisineType || "N/A"}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaClock className="text-gray-800 text-lg" />
                            <strong>Hours:</strong> {restaurant.openingHours?.open || "N/A"} - {restaurant.openingHours?.close || "N/A"}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaStar className="text-gray-800 text-lg" />
                            <strong>Rating:</strong> {restaurant.rating || 0} <FaStar className="text-yellow-400 text-lg" />
                        </p>
                        <p className="flex items-center gap-3">
                            {restaurant.status === "approved" ? (
                                <FaCheckCircle className="text-gray-800 text-lg" />
                            ) : restaurant.status === "pending" ? (
                                <MdWarning className="text-gray-800 text-lg" />
                            ) : (
                                <FaTimesCircle className="text-gray-800 text-lg" />
                            )}
                            <strong>Status:</strong>
                            <span
                                className={`ml-2 px-3 py-1 rounded-full text-sm ${restaurant.status === "approved"
                                    ? "bg-green-100 text-green-600"
                                    : restaurant.status === "pending"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {restaurant.status}
                            </span>
                        </p>
                    </div>

                    {/* Gallery */}
                    {Array.isArray(restaurant.image) && restaurant.image.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {restaurant.image.map((img, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
                                    >
                                        <img
                                            src={img}
                                            alt={`${restaurant.restaurantName} - ${index + 1}`}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
