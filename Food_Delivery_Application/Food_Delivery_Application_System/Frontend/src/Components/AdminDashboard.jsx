import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const statusMap = {
    pending: { label: "Pending", color: "text-yellow-300", icon: <FaClock className="inline mb-1" /> },
    approved: { label: "Approved", color: "text-green-400", icon: <FaCheckCircle className="inline mb-1" /> },
    rejected: { label: "Rejected", color: "text-red-400", icon: <FaTimesCircle className="inline mb-1" /> },
};

const StatButton = ({ label, count, icon, active, onClick, colorClass }) => (
    <button
        className={`flex-1 flex flex-col items-center justify-center gap-1 p-4 rounded-xl cursor-pointer transition ${active
            ? `bg-white/20 border-2 border-white/40 scale-105 shadow`
            : `bg-white/10 border border-white/20 hover:bg-white/20`
            }`}
        onClick={onClick}
        type="button"
    >
        <div className={`text-2xl ${colorClass}`}>{icon}</div>
        <span className="font-semibold text-white/90 text-[18px]">{count}</span>
        <span className="text-white/70 text-xs tracking-wider">{label}</span>
    </button>
);

const AdminDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('pending');
    const [loading, setLoading] = useState(false);

    // Fetch restaurants from backend on mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/Admin/getallrestaurant");
            setRestaurants(res.data.data || []);
        } catch (error) {
            toast.error('Could not load restaurant requests');
        } finally {
            setLoading(false);
        }
    };

    const countByStatus = status =>
        restaurants.filter(r => r.status === status).length;

    // Approve or reject via API
    const handleStatusChange = async (restaurantId, newStatus) => {
        try {
            const res = await axios.patch(
                `http://localhost:8080/Admin/restaurantrequest/${restaurantId}/${newStatus}`
            );
            toast.success(res.data.message);
            fetchRestaurants();
        } catch (error) {
            toast.error(
                (error.response && error.response.data && error.response.data.message) ||
                "Failed to update status"
            );
        }
    };

    // Table Rows for current tab
    const filteredRestaurants = restaurants.filter(
        r => r.status === selectedStatus
    );

    const totalUsers = 1200; // replace with real count if needed

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] p-6">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/20">
                    <div className="text-3xl p-4 rounded-full bg-white/20"><FaUser className="text-[#60a5fa]" /></div>
                    <div>
                        <div className="text-white/70 text-sm">Total Users</div>
                        <div className="text-2xl font-bold text-white">{totalUsers}</div>
                    </div>
                </div>
                <StatButton
                    label="Pending"
                    count={countByStatus("pending")}
                    icon={<FaClock />}
                    active={selectedStatus === "pending"}
                    colorClass="text-yellow-300"
                    onClick={() => setSelectedStatus("pending")}
                />
                <StatButton
                    label="Approved"
                    count={countByStatus("approved")}
                    icon={<FaCheckCircle />}
                    active={selectedStatus === "approved"}
                    colorClass="text-green-400"
                    onClick={() => setSelectedStatus("approved")}
                />
                <StatButton
                    label="Rejected"
                    count={countByStatus("rejected")}
                    icon={<FaTimesCircle />}
                    active={selectedStatus === "rejected"}
                    colorClass="text-red-400"
                    onClick={() => setSelectedStatus("rejected")}
                />
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 p-6">
                <h2 className="text-xl text-white font-semibold mb-4">
                    {statusMap[selectedStatus].icon}
                    <span className={statusMap[selectedStatus].color + " ml-1"}>
                        {statusMap[selectedStatus].label} Restaurant Requests
                    </span>
                </h2>
                {loading ? (
                    <div className="text-white text-lg py-6 text-center opacity-70">
                        Loading...
                    </div>
                ) : filteredRestaurants.length === 0 ? (
                    <div className="text-white text-lg py-6 text-center opacity-70">
                        No {statusMap[selectedStatus].label.toLowerCase()} restaurants found.
                    </div>
                ) : (
                    <table className="min-w-full text-white">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">Name</th>
                                <th className="py-2 text-left">Owner</th>
                                <th className="py-2 text-left">Email</th>
                                <th className="py-2 text-left">Status</th>
                                {selectedStatus === 'pending' && (
                                    <th className="py-2 text-left">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRestaurants.map((r) => (
                                <tr key={r._id || r.email} className="border-t border-white/20">
                                    <td className="py-2">{r.restaurantName}</td>
                                    <td className="py-2">{r.name}</td>
                                    <td className="py-2">{r.email}</td>
                                    <td className="py-2 font-semibold">
                                        <span className={statusMap[r.status].color}>
                                            {statusMap[r.status].icon} {statusMap[r.status].label}
                                        </span>
                                    </td>
                                    {selectedStatus === 'pending' && (
                                        <td className="py-2 flex gap-2">
                                            <button
                                                className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-bold transition"
                                                onClick={() => handleStatusChange(r._id, "approved")}
                                            >Approve</button>
                                            <button
                                                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-bold transition"
                                                onClick={() => handleStatusChange(r._id, "rejected")}
                                            >Reject</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
