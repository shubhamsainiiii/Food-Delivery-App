import React from "react";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ cartItems }) => {
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((acc, item) => {
        const price = item.foodItemId?.price || 0;
        return acc + price * item.quantity;
    }, 0);

    const handlePlaceOrder = () => {
        navigate("/user/checkout");
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart Summary</h3>

            <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                    const food = item.foodItemId;
                    const subtotal = (food?.price || 0) * item.quantity;

                    return (
                        <li key={item._id} className="flex justify-between py-2 text-gray-700 text-sm">
                            <span>{food?.foodName} × {item.quantity}</span>
                            <span>₹{subtotal}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="flex justify-between mt-4 font-semibold text-lg text-gray-800">
                <span>Total</span>
                <span>₹{totalAmount}</span>
            </div>

            <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition-all duration-300 cursor-pointer"
            >
                Procced to checkout
            </button>
        </div>
    );
};

export default CartTotal;
