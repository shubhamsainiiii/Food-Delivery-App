import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:8080";

const UserOrderDetail = () => {
    const { invoiceId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const token = localStorage.getItem("userToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/Order/getorder/${invoiceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrderDetail(res.data);
        } catch (error) {
            console.error("Failed to fetch order detail", error);
            toast.error("Unable to load order detail");
        }
    };

    if (!orderDetail) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

    const { invoice, items } = orderDetail;

    return (
        <div className="bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] min-h-screen p-6 mt-18">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]  shadow-sm shadow-gray-400 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Order Detail</h2>

                {/* Invoice Info */}
                <div className="mb-6 border-b pb-4">
                    <p><strong>Invoice ID:</strong> {invoice._id}</p>
                    <p><strong>Status:</strong> <span className="capitalize text-yellow-600">{invoice.status}</span></p>
                    <p><strong>Total:</strong> ₹{invoice.total}</p>
                    <p><strong>Address:</strong> {`${invoice.addressId?.street}, ${invoice.addressId?.city}, ${invoice.addressId?.state} - ${invoice.addressId?.zip}`}</p>
                    <p><strong>Date:</strong> {moment(invoice.date).format("LLL")}</p>
                </div>

                <h3 className="text-xl font-semibold mb-2">Items</h3>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border p-4 rounded-lg bg-white shadow">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.images?.[0]?.imageUrl || "/placeholder.jpg"}
                                    alt={item.foodItemId?.foodName}
                                    className="w-16 h-16 object-cover rounded"
                                />

                                <div>
                                    <p className="font-semibold">{item.foodItemId?.foodName}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium capitalize text-yellow-700">
                                {item.status}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-6 bg-gray-300 hover:bg-gray-400 transition-all duration-300 cursor-pointer text-black px-4 py-2 rounded"
                    onClick={() => navigate(-1)}
                >
                    Back to History
                </button>
            </div>
        </div>
    );
};

export default UserOrderDetail;
