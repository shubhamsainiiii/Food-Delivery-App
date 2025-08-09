import React, { useState } from 'react';
import {
    FaUser, FaCheckCircle, FaTimesCircle, FaClock,
    FaSearch, FaBell, FaBars
} from 'react-icons/fa';
import Sidebar from './Sidebar';
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
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3 w-full max-w-md">
                        <FaBars
                            className="text-xl cursor-pointer md:hidden"
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                        />
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm w-full">
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

                {/* Revenue Chart */}
                <TotalRevenueChart />
            </main>
        </div>
    );
};

export default AdminDashboard;
