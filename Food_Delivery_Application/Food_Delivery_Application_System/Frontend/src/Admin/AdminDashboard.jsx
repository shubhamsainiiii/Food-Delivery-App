import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    FaUser, FaCheckCircle, FaTimesCircle, FaClock,
    FaSearch, FaBell, FaBars
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import TotalRevenueChart from './TotalRevenueChart ';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const statusMap = {
    pending: { label: "Pending", color: "text-yellow-500", icon: <FaClock className="inline mb-1" /> },
    approved: { label: "Approved", color: "text-green-500", icon: <FaCheckCircle className="inline mb-1" /> },
    rejected: { label: "Rejected", color: "text-red-500", icon: <FaTimesCircle className="inline mb-1" /> },
};

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
        <div className="text-yellow-500 text-3xl">
            {icon}
        </div>
    </div>
);

const AdminDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('pending');
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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

    const handleStatusChange = async (restaurantId, newStatus) => {
        try {
            const res = await axios.patch(
                `http://localhost:8080/Admin/restaurantrequest/${restaurantId}/${newStatus}`
            );
            toast.success(res.data.message);
            fetchRestaurants();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    const filteredRestaurants = restaurants.filter(r => r.status === selectedStatus);
    const countByStatus = status => restaurants.filter(r => r.status === status).length;

    return (
        <div className="flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} />
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <FaBars className="text-xl cursor-pointer md:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)} />
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm w-full max-w-md">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="outline-none bg-transparent text-sm flex-1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaBell className="text-gray-600 text-xl" />
                        <img src="https://flagcdn.com/in.svg" alt="India" className="h-5" />
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard title="Daily Revenue" value="$9854.00" icon="💰" />
                    <StatCard title="Total Orders" value="152" icon="📦" />
                    <StatCard title="Avg Order Value" value="$120" icon="📈" />
                    <StatCard title="Daily Orders" value="52" icon="📊" />
                </div>

                {/* 📊 Chart Section */}

                <TotalRevenueChart />

                {/* Restaurant Requests Table */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {statusMap[selectedStatus].icon}
                        <span className={statusMap[selectedStatus].color + " ml-2"}>
                            {statusMap[selectedStatus].label} Restaurant Requests
                        </span>
                    </h2>
                    <div className="flex gap-4 mb-4">
                        {["pending", "approved", "rejected"].map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-1 rounded-full border text-sm cursor-pointer font-medium ${selectedStatus === status ? 'bg-yellow-100 text-yellow-700 border-yellow-400' : 'text-gray-600 border-gray-300'}`}
                            >
                                {statusMap[status].label} ({countByStatus(status)})
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRestaurants.map((r, index) => (
                                        <tr key={r._id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4 font-semibold">0{index + 1}</td>
                                            <td className="py-3 px-4">{r.restaurantName}</td>
                                            <td className="py-3 px-4">{r.name}</td>
                                            <td className="py-3 px-4">{r.email}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${r.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : r.status === 'approved'
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-red-100 text-red-600'
                                                        }`}
                                                >
                                                    {statusMap[r.status]?.label || r.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                {selectedStatus === 'pending' ? (
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;


