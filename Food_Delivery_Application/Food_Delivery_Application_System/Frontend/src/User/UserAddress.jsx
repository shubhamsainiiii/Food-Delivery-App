import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8080";

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("userToken");

    const navigate = useNavigate();

    // Fetch addresses from backend
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

    // Delete a specific address
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
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header with Add Address Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Your Addresses</h1>
                <button
                    onClick={handleAddAddress}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 transition"
                >
                    + Add Address
                </button>
            </div>

            {/* Loading and No addresses */}
            {loading ? (
                <p className="text-gray-600">Loading addresses...</p>
            ) : addresses.length === 0 ? (
                <p className="text-gray-500">No addresses found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(addr => (
                        <div key={addr._id} className="bg-white border rounded-md shadow p-5 relative">
                            <h3 className="text-lg font-semibold text-gray-800">{addr.name}</h3>
                            <p className="text-sm text-gray-600">{addr.phone}</p>
                            <p className="mt-1 text-gray-700">
                                {addr.street}, {addr.landmark && `${addr.landmark}, `}
                                {addr.city}, {addr.state} - {addr.zip}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Type: {addr.addressType}</p>
                            {addr.isDefault && (
                                <span className="inline-block mt-3 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                    Default
                                </span>
                            )}

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(addr._id)}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-semibold text-sm"
                                title="Delete Address"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserAddress;
