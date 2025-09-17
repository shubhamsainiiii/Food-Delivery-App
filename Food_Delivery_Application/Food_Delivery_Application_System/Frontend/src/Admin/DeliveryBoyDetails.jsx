/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaMotorcycle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

const DeliveryBoyDetails = () => {
    const { id } = useParams();
    const [deliveryBoy, setDeliveryBoy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchDeliveryBoy = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/Admin/deliveryboy/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setDeliveryBoy(res.data.deliverybotData);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch delivery boy details");
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveryBoy();
    }, [id, token]);

    if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!deliveryBoy) return <p className="text-center mt-10">No delivery boy found</p>;

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex justify-center items-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8"
                >
                    {/* Left - Image */}
                    <div className="flex justify-center items-center md:w-1/3">
                        {deliveryBoy.profileImage && (
                            <LazyLoadImage
                                src={deliveryBoy.profileImage}
                                alt="Profile"
                                effect="blur"
                                wrapperProps={{
                                    style: { transitionDelay: "1s" },
                                }}
                                className="rounded-2xl shadow-sm shadow-gray-400 object-cover max-h-68 max-w-full"
                            />
                        )}
                    </div>

                    {/* Right - Details */}
                    <div className="flex-1 space-y-4 text-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
                            Delivery Boy Details
                        </h2>
                        <p className="flex items-center gap-3">
                            <FaUser className="text-gray-700" />
                            <strong>Name :</strong> {deliveryBoy.name}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-700" />
                            <strong>Email :</strong> {deliveryBoy.email}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaPhone className="text-gray-700" />
                            <strong>Phone :</strong> {deliveryBoy.phone}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-gray-700" />
                            <strong>Address :</strong> {deliveryBoy.address}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaMotorcycle className="text-gray-700" />
                            <strong>Vehicle Number :</strong> {deliveryBoy.vehicleNumber}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaIdCard className="text-gray-700" />
                            <strong>Aadhar Number :</strong> {deliveryBoy.aadharNumber}
                        </p>
                        <p className="flex items-center gap-3">
                            <FaIdCard className="text-gray-700" />
                            <strong>Status :</strong>{deliveryBoy.status}
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default DeliveryBoyDetails;
