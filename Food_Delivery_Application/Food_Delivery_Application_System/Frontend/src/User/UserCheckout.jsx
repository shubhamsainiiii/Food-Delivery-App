import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

const UserCheckout = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const token = localStorage.getItem("userToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
        fetchCartItems();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/User/alladdress`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("resss", res)
            setAddresses(res.data.address);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            toast.error("Failed to load addresses");
        }
    };

    const fetchCartItems = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/Cart/getcart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("cart>>>>", res)

            const items = Array.isArray(res.data) ? res.data : [];
            setCartItems(items);
            console.log("items>>>>>", items)

            const total = items.reduce(
                (acc, item) => acc + item.foodItemId.price * item.quantity,
                0
            );
            console.log("total<<<<<<<<<<<<", total)
            setTotalAmount(total);
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error("Failed to load cart");
        }
    };

    const handleOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select an address");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    foodItemId: item.foodItemId._id,
                    quantity: item.quantity,
                    images: item.foodItemId.images || [],
                })),
                addressId: selectedAddressId,
                totalamount: totalAmount,
            };

            const res = await axios.post(`${BASE_URL}/Order/createorder`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(res.data.message || "Order placed successfully");
            setCartItems([])
            navigate("/user/orders");
        } catch (error) {
            console.error("Order failed:", error);
            toast.error("Failed to place order");
        }
    };

    return (
        <div className=" bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18 p-4">
            <div className="max-w-2xl mx-auto shadow-sm shadow-gray-400 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

                {/* Address Dropdown */}
                <label className="block mb-2 font-semibold text-gray-700">Select Address:</label>
                <select
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                    className="w-full border px-4 py-2 rounded mb-6"
                >
                    <option value="">-- Choose Address --</option>
                    {addresses.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                            {`${addr.landmark}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}`}
                        </option>
                    ))}
                </select>

                {/* Order Summary */}
                <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                {cartItems.map((item, i) => (
                    <div
                        key={i}
                        className="border-b py-4 flex items-center justify-between gap-4"
                    >
                        {/* Product Image */}
                        <img
                            src={item.foodItemId?.images?.[0]?.imageUrl || "/placeholder.jpg"}
                            alt={item.foodItemId?.foodName || "Food"}
                            className="w-16 h-16 object-cover rounded"
                        />

                        {/* Product Name and Quantity */}
                        <div className="flex-1">
                            <p className="font-semibold">
                                {item.foodItemId?.foodName || "Unnamed"}
                            </p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>

                        {/* Total Price */}
                        <div className="text-right font-medium">
                            ₹{item.foodItemId.price * item.quantity}
                        </div>
                    </div>
                ))}


                {/* Total */}
                <div className="flex justify-between mt-4 font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{totalAmount}</span>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={handleOrder}
                    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer transition-all duration-300"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default UserCheckout;
