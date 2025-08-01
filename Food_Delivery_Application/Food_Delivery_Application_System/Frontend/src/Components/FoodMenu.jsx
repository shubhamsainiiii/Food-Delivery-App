// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FoodMenu = () => {
//     const [food, setFood] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [err, setErr] = useState("");

//     // Fetch food items on component mount
//     useEffect(() => {
//         const fetchFood = async () => {
//             setLoading(true);
//             setErr("");
//             try {
//                 // Adjust API endpoint as per your backend (use /food-items/ if aggregation is in that route)
//                 const res = await axios.get("http://localhost:8080/food-items/");
//                 // If your API returns { foodItem: [...] }:
//                 const result = res.data.foodItem || [];
//                 setFood(result);
//             } catch (error) {
//                 setErr("Could not fetch menu. Please try again.");
//             }
//             setLoading(false);
//         };
//         fetchFood();
//     }, []);

//     return (
//         <div className="min-h-screen py-12 bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
//             <div className="max-w-6xl mx-auto px-4">
//                 <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
//                     Menu
//                 </h1>
//                 {err && (
//                     <div className="text-center mb-6 text-red-500 font-semibold">
//                         {err}
//                     </div>
//                 )}
//                 {loading ? (
//                     <div className="text-center text-xl py-10">Loading menu...</div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
//                         {food.length ? (
//                             food.map((dish) => (
//                                 <div
//                                     key={dish._id}
//                                     className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
//                                 >
//                                     <img
//                                         src={
//                                             dish.images?.[0]?.imageUrl ||
//                                             // Also handle if images is array of string URLs
//                                             (Array.isArray(dish.images) && typeof dish.images[0] === "string"
//                                                 ? dish.images[0]
//                                                 : null) ||
//                                             "https://via.placeholder.com/250?text=No+Image"
//                                         }
//                                         alt={dish.foodName || "Food"}
//                                         className="w-full h-48 object-cover rounded mb-4"
//                                     />
//                                     <div className="flex-1 flex flex-col">
//                                         <h3 className="text-xl font-bold mb-1 text-[#2a2a2a]">{dish.foodName}</h3>
//                                         <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 font-medium">
//                                             {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.type}</span>}
//                                             {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.category}</span>}
//                                         </div>
//                                         <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
//                                         <div className="flex items-center justify-between mt-auto">
//                                             <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
//                                             {/* Add To Cart button can be added here */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="col-span-full text-center text-gray-500 text-lg">
//                                 No food available.
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FoodMenu;



import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodMenu = () => {
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [cartLoading, setCartLoading] = useState(""); // id of food being added
    const [quantities, setQuantities] = useState({}); // {foodId: qty}
    const [cartSuccess, setCartSuccess] = useState(""); // id of recently added item

    // Fetch food items
    useEffect(() => {
        const fetchFood = async () => {
            setLoading(true);
            setErr("");
            try {
                const res = await axios.get("http://localhost:8080/food-items/");
                const result = res.data.foodItem || [];
                setFood(result);
            } catch (e) {
                setErr("Could not fetch menu. Please try again.");
            }
            setLoading(false);
        };
        fetchFood();
    }, []);

    // Set initial quantity to 1 for all items
    useEffect(() => {
        if (food.length) {
            const q = {};
            for (let item of food) {
                q[item._id] = 1;
            }
            setQuantities(q);
        }
    }, [food]);

    // Quantity change handlers
    const handleQuantityChange = (id, val) =>
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Number(val))
        }));

    const increaseQty = id =>
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + 1)
        }));

    const decreaseQty = id =>
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) - 1)
        }));

    // Add to cart handler
    const handleAddToCart = async (foodId) => {
        setCartLoading(foodId);
        setCartSuccess(""); // reset success
        try {
            await axios.post(
                "http://localhost:8080/Cart/createcart",
                { foodItemId: foodId, quantity: quantities[foodId] || 1 },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
                    },
                }
            );
            setCartSuccess(foodId);
            setTimeout(() => setCartSuccess(""), 1200);
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to add to cart. Please login or try again."
            );
        }
        setCartLoading("");
    };

    return (
        <div className="min-h-screen py-12 bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
                    Menu
                </h1>
                {err && (
                    <div className="text-center mb-6 text-red-500 font-semibold">
                        {err}
                    </div>
                )}
                {loading ? (
                    <div className="text-center text-xl py-10">Loading menu...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                        {food.length ? (
                            food.map((dish) => (
                                <div
                                    key={dish._id}
                                    className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
                                >
                                    <img
                                        src={
                                            dish.images?.[0]?.imageUrl ||
                                            (Array.isArray(dish.images) && typeof dish.images[0] === "string"
                                                ? dish.images[0]
                                                : null) ||
                                            "https://via.placeholder.com/250?text=No+Image"
                                        }
                                        alt={dish.foodName || "Food"}
                                        className="w-full h-48 object-cover rounded mb-4"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold mb-1 text-[#2a2a2a]">{dish.foodName}</h3>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 font-medium">
                                            {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.type}</span>}
                                            {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.category}</span>}
                                        </div>
                                        <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
                                        <div className="flex items-center justify-between mt-auto gap-2">
                                            <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="px-2 rounded bg-gray-200 text-gray-700"
                                                    onClick={() => decreaseQty(dish._id)}
                                                    aria-label="Decrease"
                                                >-</button>
                                                <input
                                                    type="number"
                                                    className="w-12 text-center border rounded"
                                                    min={1}
                                                    value={quantities[dish._id] || 1}
                                                    onChange={e => handleQuantityChange(dish._id, e.target.value)}
                                                />
                                                <button
                                                    className="px-2 rounded bg-gray-200 text-gray-700"
                                                    onClick={() => increaseQty(dish._id)}
                                                    aria-label="Increase"
                                                >+</button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(dish._id)}
                                            disabled={cartLoading === dish._id}
                                            className={`mt-4 w-full py-2 rounded-lg font-semibold
                        ${cartLoading === dish._id
                                                    ? "bg-gray-400 cursor-wait"
                                                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90"
                                                }
                        text-white shadow transition`}
                                        >
                                            {cartLoading === dish._id
                                                ? "Adding..."
                                                : cartSuccess === dish._id
                                                    ? "✓ Added!"
                                                    : "Add To Cart"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                No food available.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodMenu;
