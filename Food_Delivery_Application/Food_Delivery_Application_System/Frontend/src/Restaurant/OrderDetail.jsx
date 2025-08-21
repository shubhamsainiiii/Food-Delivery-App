import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import RestaurantSidebar from "./RestaurantSidebar";

const OrderDetail = () => {
    const { invoiceId } = useParams();
    console.log("invoiceIddddddddddd", invoiceId)
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/Order/getorderbyinvoice/${invoiceId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );
                console.log("ressssssssssss", res)
                setOrder(res.data);
            } catch (error) {
                console.error("Error fetching order detail:", error);
            }
        };

        fetchOrder();
    }, [invoiceId]);

    if (!order) {
        return <div className="p-6">Loading...</div>;
    }

    const { invoice, items } = order;
    console.log("ordesssssssssssss", order)

    const { user, address, createdAt } = invoice;
    console.log("invoiceeeeeeeeeeeeee", invoice)

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            {/* Sidebar fixed */}
            <div className="fixed bg-white shadow-md top-0 left-0 h-full">
                <RestaurantSidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 ml-64 p-8 ">
                <h1 className="text-2xl font-bold mb-6">Order Details</h1>

                {/* Order Info & User */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Order #{invoiceId}</h2>
                        <p className="text-sm text-gray-500">
                            {new Date(createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <img
                            src={user?.image || "/default-avatar.jpg"}
                            alt={user?.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-500">
                                <a
                                    href={`tel:${user?.phone}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {user?.phone}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 border-b pb-4 mb-4">
                    <FaMapMarkerAlt className="text-orange-500 mt-1" />
                    <div>
                        <p className="font-semibold">
                            {address?.landmark}, {address?.street}, {address?.city}
                        </p>
                        <p className="font-semibold">
                            {address?.state}, {address?.zip}
                        </p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-3">Order Menu</h2>
                    <div className="divide-y">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center py-3"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item?.images?.[0]?.imageUrl || "/no-image.jpg"}
                                        alt={item?.foodName}
                                        className="w-14 h-14 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium">{item?.foodName}</p>
                                        <p className="text-sm text-gray-500">
                                            x{item?.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-orange-500">
                                    +₹{item?.price * item?.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t pt-3 font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">₹{items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</span>
                </div>



                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                        Reject Order
                    </button>
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        Accept Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;