import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import UserSidebar from './UserSidebar';

const BASE_URL = "http://localhost:8080";

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("userToken");
    const navigate = useNavigate();

    const fetchAddresses = async () => {
        if (!token) {
            toast.error("User token not found.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/User/alladdress`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(Array.isArray(res.data) ? res.data : res.data.address || []);
        } catch (err) {
            toast.error("Failed to load addresses.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [token]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this address?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BASE_URL}/User/deleteaddress/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Address deleted successfully.");
            fetchAddresses();
        } catch (err) {
            toast.error("Failed to delete address.");
            console.error(err);
        }
    };

    const handleAddAddress = () => {
        navigate('/user/createaddress');
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            <UserSidebar />

            <main className="flex-1 px-4 py-8 ml-64">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Addresses</h1>
                    <button
                        onClick={handleAddAddress}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 transition"
                    >
                        + Add Address
                    </button>
                </div>

                {/* Address List */}
                {loading ? (
                    <p className="text-gray-600">Loading addresses...</p>
                ) : addresses.length === 0 ? (
                    <p className="text-gray-500">No addresses found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map(addr => (
                            <div key={addr._id} className="relative bg-white border rounded-xl shadow-md hover:shadow-lg p-6 transition">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaUser className="text-gray-500" />
                                    <h3 className="text-lg font-semibold text-gray-800">{addr.name}</h3>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
                                    <FaPhone className="text-gray-500" />
                                    <span>{addr.phone}</span>
                                </div>

                                <div className="flex items-start gap-3 text-sm text-gray-700 mb-1">
                                    <FaMapMarkerAlt className="text-gray-500 mt-1" />
                                    <p>
                                        {addr.landmark}, {addr.street},
                                        {addr.city}, {addr.state} - {addr.zip}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 mt-1">Type: {addr.addressType}</p>

                                {addr.isDefault && (
                                    <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                        Default Address
                                    </span>
                                )}

                                <button
                                    onClick={() => handleDelete(addr._id)}
                                    className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition"
                                    title="Delete Address"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserAddress;
