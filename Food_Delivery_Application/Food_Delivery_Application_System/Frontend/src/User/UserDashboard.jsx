import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserSidebar from '../User/UserSidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBoxOpen, FaMapMarkedAlt, FaCalendarCheck } from 'react-icons/fa';

// const baseUrl = "";

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
        <div className={`mr-4 text-3xl ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("userToken");
    console.log("token : ", token)

    const navigate = useNavigate();
    // const token = localStorage.getItem("token");

    useEffect(() => {
        const checkUserAddress = async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/address", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const hasAddress = response.data?.address?.length > 0;

                if (!hasAddress) {
                    // Redirect if no address found
                    // navigate("/user/address");
                }

            } catch (error) {
                console.error("Error checking user address:", error);
                // If unauthorized or error, redirect to address anyway
                // navigate("/user/address");
            }
        };

        checkUserAddress();
    }, [navigate, token]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) {
                toast.error("Authentication token not found.");
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8080/User/getuser`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDashboardData(res.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                toast.error(err.response?.data?.msg || "Could not load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <UserSidebar />
                <div className="flex-1 p-8 text-center">Loading dashboard...</div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <UserSidebar />
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-red-500">Error</h1>
                    <p className="text-gray-600 mt-2">Failed to load dashboard. Please try logging in again.</p>
                </div>
            </div>
        );
    }

    const { user, stats, recentOrders } = dashboardData;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <UserSidebar user={user} />
            <main className="flex-1 p-4 sm:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</h1>
                    <p className="text-gray-600 mt-1">Here's a quick overview of your account.</p>
                </div>

                {/* --- Quick Stats --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<FaBoxOpen />} label="Total Orders" value={stats?.orders} color="text-orange-500" />
                    <StatCard icon={<FaMapMarkedAlt />} label="Saved Addresses" value={stats?.addresses} color="text-green-500" />
                    <StatCard icon={<FaCalendarCheck />} label="Member Since" value={new Date(user?.memberSince).toLocaleDateString()} color="text-blue-500" />
                </div>

                {/* --- Recent Orders --- */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Orders</h2>
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                        {recentOrders?.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {recentOrders.map(order => (
                                    <li key={order._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-semibold text-gray-800">Order #{order.orderId || order._id.slice(-6)}</p>
                                            <p className="text-sm text-gray-500">
                                                Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">${order.totalAmount.toFixed(2)}</p>
                                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="p-4 text-center text-gray-500">You haven't placed any orders yet.</p>
                        )}
                        {stats?.orders > 0 && (
                            <div className="p-4 text-center border-t border-gray-200">
                                <Link to="/user/orders" className="font-semibold text-orange-600 hover:text-orange-700">
                                    View All Orders &rarr;
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
