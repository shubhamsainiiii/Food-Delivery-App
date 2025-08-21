import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import UserSidebar from "./UserSidebar";

const BASE_URL = "http://localhost:8080";

const UserOrderDetails = () => {
    const { id } = useParams(); // invoiceId from URL
    console.log("idddd", id)
    const [orderDetails, setOrderDetails] = useState(null);
    const token = localStorage.getItem("userToken");
    console.log("tokennnnnn", token)

    useEffect(() => {
        fetchOrderDetails();
        // eslint-disable-next-line
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/Order/getorderbyinvoice/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("resssssss", res)
            setOrderDetails(res.data);
        } catch (error) {
            console.error("Failed to fetch order details", error);
            toast.error("Unable to load order details");
        }
    };

    if (!orderDetails) return <p className="text-center mt-6">Loading...</p>;

    const { invoice, items } = orderDetails;
    console.log("orderDetailsssssssss", orderDetails)

    return (
        <div className="grid grid-cols-[16rem_1fr] min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <div className="h-full border-r shadow-md">
                <UserSidebar />
            </div>

            {/* Main Content */}
            <div className="p-6 mt-15">
                <h2 className="text-3xl font-bold mb-4">Order Details</h2>

                {/* Invoice & Status Info */}
                <div className="bg-white shadow p-4 rounded mb-6">
                    <p><strong>Invoice ID :</strong> {invoice.invoiceId}</p>
                    <p><strong>Date :</strong> {moment(invoice.createdAt).format("LLLL")}</p>
                    <p><strong>Status :</strong> <span className="capitalize text-yellow-700">{invoice.status || "Pending"}</span></p>
                    <p><strong>Total :</strong> ₹{invoice.total}</p>
                    <p><strong>Address  : </strong>
                        {`${invoice.address?.landmark}, ${invoice.address?.street}, ${invoice.address?.city}, ${invoice.address?.state} - ${invoice.address?.zip}`}
                    </p>
                </div>

                {/* Order Items */}
                <h3 className="text-xl font-semibold mb-3">Items</h3>
                <div className="bg-white shadow p-4 rounded">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 border-b pb-4 mb-4">
                            {/* Food Image */}
                            {item.images.length > 0 ? (
                                <img
                                    src={item.images[0].imageUrl || item.images[0]} // Adjust based on backend image field
                                    alt={item.foodName}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}

                            {/* Food Info */}
                            <div className="flex flex-col justify-between">
                                <p className="font-semibold">{item.foodName}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetails;
