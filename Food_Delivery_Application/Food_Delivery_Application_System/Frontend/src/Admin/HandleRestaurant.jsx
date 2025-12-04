import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaClock, FaCheckCircle, FaTimesCircle, FaUtensils } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const statusMap = {
    all: { label: "All", color: "text-blue-500", icon: <></> },
    pending: { label: "Pending", color: "text-yellow-500", icon: <FaClock className="inline mb-1" /> },
    approved: { label: "Approved", color: "text-green-500", icon: <FaCheckCircle className="inline mb-1" /> },
    rejected: { label: "Rejected", color: "text-red-500", icon: <FaTimesCircle className="inline mb-1" /> },
};

const HandleRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);


    const fetchRestaurants = async () => {
        setLoading(true);
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("Unauthorized! Please login again.");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.get("http://localhost:8080/Admin/getallrestaurant", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRestaurants(res.data.data || []);
        } catch (error) {
            console.log("error", error);
            toast.error(error?.response?.data?.message || 'Could not load restaurant requests');
        } finally {
            setLoading(false);
        }
    };

   
    const handleStatusChange = async (restaurantId, newStatus) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("Unauthorized! Please login again.");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.patch(
                `http://localhost:8080/Admin/restaurantrequest/${restaurantId}/${newStatus}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(res.data.message);
            fetchRestaurants();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    const filteredRestaurants =
        selectedStatus === "all"
            ? restaurants
            : restaurants.filter(r => r.status === selectedStatus);

    const countByStatus = status =>
        restaurants.filter(r => r.status === status).length;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            <div className="w-64 ">
                <Sidebar />
            </div>

            <div className="flex-1 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <FaUtensils className="text-gray-800 text-2xl" />
                    <span>Restaurant Requests</span>
                </h2>

                <div className="flex gap-4 mb-4 flex-wrap">
                    {Object.keys(statusMap).map(status => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-1 rounded-full border text-sm font-medium cursor-pointer ${selectedStatus === status
                                ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                                : 'text-gray-600 border-gray-300'
                                }`}
                        >
                            {statusMap[status].label} {status !== "all" ? `(${countByStatus(status)})` : ""}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-gray-500 text-center py-6">Loading...</p>
                ) : (
                    <div className="overflow-auto">
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                                <tr>
                                    <th className="py-3 px-4">#</th>
                                    <th className="py-3 px-4">Restaurant</th>
                                    <th className="py-3 px-4">Owner</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Actions</th>
                                    <th className="py-3 px-4">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRestaurants.map((r, index) => (
                                    <tr key={r._id} className="border-b hover:bg-gray-50 transition-all duration-300">
                                        <td className="py-3 px-4 font-semibold">{index + 1}</td>
                                        <td className="py-3 px-4">{r.restaurantName}</td>
                                        <td className="py-3 px-4">{r.name}</td>
                                        <td className="py-3 px-4">{r.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : r.status === 'approved'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {statusMap[r.status]?.label || r.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {r.status === 'pending' ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusChange(r._id, "approved")}
                                                        className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(r._id, "rejected")}
                                                        className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${r.status === 'approved'
                                                        ? 'bg-green-100'
                                                        : r.status === 'rejected'
                                                            ? 'bg-red-100'
                                                            : 'bg-yellow-100'
                                                        }`}
                                                >
                                                    <span
                                                        className={`text-xl ${r.status === 'approved'
                                                            ? 'text-green-500'
                                                            : r.status === 'rejected'
                                                                ? 'text-red-500'
                                                                : 'text-yellow-500'
                                                            }`}
                                                    >
                                                        ...
                                                    </span>
                                                </div>
                                            )}
                                        </td>

                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => navigate(`/admin/restaurantdetail/${r._id}`)}
                                                className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold cursor-pointer"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandleRestaurant;
