import React from "react";
import { FaWallet, FaShoppingCart, FaClock } from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import DeliveryBoySidebar from "./DeliveryBoySidebar";

const data = [
    { day: "Mon", performance: 400 },
    { day: "Tue", performance: 300 },
    { day: "Wed", performance: 500 },
    { day: "Thu", performance: 200 },
    { day: "Fri", performance: 400 },
    { day: "Sat", performance: 350 },
    { day: "Sun", performance: 450 },
];

const DeliveryBoyDashboard = () => {
    const todaysEarning = 1250; // Replace with dynamic data if any
    const todaysOrders = 15;
    const recentOrders = [
        { id: "001", customer: "Aman", status: "Delivered" },
        { id: "002", customer: "Neha", status: "In Transit" },
        { id: "003", customer: "Ravi", status: "Pending" },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <DeliveryBoySidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-8 mt-18 ml-64">
                {/* Summary cards */}
                <div className="flex gap-6">
                    <div className="flex items-center space-x-3 bg-white p-4 rounded shadow w-1/3">
                        <FaWallet className="text-green-500 text-3xl" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Today's Earnings</h3>
                            <p className="text-xl font-semibold">₹{todaysEarning}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-4 rounded shadow w-1/3">
                        <FaShoppingCart className="text-blue-500 text-3xl" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Today's Orders</h3>
                            <p className="text-xl font-semibold">{todaysOrders}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                        <FaClock />
                        <span>Recent Orders</span>
                    </h2>
                    <ul>
                        {recentOrders.map((order) => (
                            <li
                                key={order.id}
                                className="flex justify-between border-b border-gray-200 py-2"
                            >
                                <span>
                                    Order #{order.id} - {order.customer}
                                </span>
                                <span className="font-medium">{order.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Performance Chart */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Performance This Week</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="performance"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DeliveryBoyDashboard;
