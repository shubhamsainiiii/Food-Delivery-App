import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import RestaurantSidebar from './RestaurantSidebar';

const RecentOrders = () => {
    const [groupedOrders, setGroupedOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const res = await axios.get(
                    'http://localhost:8080/Order/restaurantorders',
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const orders = res.data.orders || [];

                // Group orders by invoiceId
                const grouped = orders.reduce((acc, order) => {
                    const invoiceId = order.invoiceId?._id;
                    if (!acc[invoiceId]) {
                        acc[invoiceId] = {
                            invoiceId: invoiceId,
                            user: order.userId,
                            address: order.invoiceId?.addressId,
                            status: order.status
                        };
                    }
                    return acc;
                }, {});

                setGroupedOrders(Object.values(grouped));
            } catch (err) {
                console.error('Error fetching orders', err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] flex mt-18">
            {/* ==== Fixed Sidebar ==== */}
            <div className="w-64 fixed top-0 left-0 h-screen z-10">
                <RestaurantSidebar />
            </div>

            {/* ==== Main Content ==== */}
            <main className="flex-1 ml-64 p-6 overflow-x-auto">
                <h2 className="text-xl font-bold flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-orange-500" /> Recent Orders
                </h2>

                {groupedOrders.length === 0 ? (
                    <p>No recent orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-gray-600">
                            <thead>
                                <tr className="bg-gray-100 text-gray-900 border-b border-gray-600">
                                    <th className="px-6 py-3 text-sm font-semibold">#</th>
                                    <th className="px-6 py-3 text-sm font-semibold">NAME</th>
                                    <th className="px-6 py-3 text-sm font-semibold">PHONE</th>
                                    <th className="px-6 py-3 text-sm font-semibold">ADDRESS</th>
                                    <th className="px-6 py-3 text-sm font-semibold">STATUS</th>
                                    <th className="px-6 py-3 text-sm font-semibold">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {groupedOrders.map((group, idx) => (
                                    <tr key={idx} className="border-b border-gray-500 hover:bg-gray-50 transition-all duration-300">
                                        <td className="px-6 py-3 font-bold">
                                            {String(idx + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-3">{group.user?.name}</td>
                                        <td className="px-6 py-3">{group.user?.phone}</td>
                                        <td className="px-6 py-3">
                                            {group.address
                                                ? `${group.address.landmark || ''}, ${group.address.street || ''}, ${group.address.city || ''}, ${group.address.state || ''} - ${group.address.zip || ''}`
                                                : 'No address'}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-600">{group.status}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => navigate(`/restaurant/orderdetail/${group.invoiceId}`)}
                                                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all duration-300 cursor-pointer"
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
            </main>
        </div>
    );
};

export default RecentOrders;
