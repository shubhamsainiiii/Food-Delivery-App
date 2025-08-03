// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FoodMenu = () => {
//     const [food, setFood] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [err, setErr] = useState("");
//     const [quantities, setQuantities] = useState({});
//     const [cartItems, setCartItems] = useState({});

//     useEffect(() => {
//         const fetchFood = async () => {
//             setLoading(true);
//             setErr("");
//             try {
//                 const res = await axios.get("http://localhost:8080/food-items/");
//                 const result = res.data.foodItem || [];
//                 setFood(result);
//             } catch (error) {
//                 console.log("error", error);
//                 setErr("Could not fetch menu. Please try again.");
//             }
//             setLoading(false);
//         };

//         const fetchCart = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8080/Cart/getcart", {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
//                     },
//                 });
//                 const cartMap = {};
//                 res.data.forEach(item => {
//                     cartMap[item.foodItemId._id] = item.quantity;
//                 });
//                 setCartItems(cartMap);
//                 setQuantities(cartMap);
//             } catch (err) {
//                 console.error("Cart fetch error", err);
//             }
//         };

//         fetchFood();
//         fetchCart();
//     }, []);

//     const increaseQty = async (id) => {
//         const newQty = (quantities[id] || 1) + 1;
//         await updateCart(id, newQty);
//     };

//     const decreaseQty = async (id) => {
//         const newQty = (quantities[id] || 0) - 1;
//         if (newQty <= 0) {
//             await removeFromCart(id);
//         } else {
//             await updateCart(id, newQty);
//         }
//     };

//     const updateCart = async (foodItemId, quantity) => {
//         try {
//             await axios.put("http://localhost:8080/Cart/updatecart", { foodItemId, quantity }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
//                 },
//             });
//             setQuantities(prev => ({ ...prev, [foodItemId]: quantity }));
//             setCartItems(prev => ({ ...prev, [foodItemId]: quantity }));
//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.log("error", error);
//             alert("Failed to update cart.");
//         }
//     };

//     const removeFromCart = async (foodItemId) => {
//         try {
//             await axios.put("http://localhost:8080/Cart/updatecart", { foodItemId, quantity: 0 }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
//                 },
//             });

//             const updatedCart = { ...cartItems };
//             const updatedQuantities = { ...quantities };
//             delete updatedCart[foodItemId];
//             delete updatedQuantities[foodItemId];

//             setCartItems(updatedCart);
//             setQuantities(updatedQuantities);

//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.log("error", error);
//             alert("Failed to remove item from cart.");
//         }
//     };


//     const handleAddToCart = async (foodId) => {
//         try {
//             const quantityToAdd = quantities[foodId] || 1;
//             await axios.post("http://localhost:8080/Cart/createcart", {
//                 foodItemId: foodId,
//                 quantity: quantityToAdd,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
//                 },
//             });

//             setCartItems(prev => ({ ...prev, [foodId]: quantityToAdd }));
//             setQuantities(prev => ({ ...prev, [foodId]: quantityToAdd })); // 🔥 Set explicitly
//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.log("error", error);
//             alert("Failed to add to cart. Please login or try again.");
//         }
//     };


//     return (
//         <div className="min-h-screen py-10 bg-gradient-to-br from-[#faebd7] to-[#f7fafc] mt-18">
//             <div className="max-w-6xl mx-auto px-4">
//                 <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
//                     Menu
//                 </h1>
//                 {err && <div className="text-center mb-6 text-red-500 font-semibold">{err}</div>}
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
//                                             (Array.isArray(dish.images) && typeof dish.images[0] === "string"
//                                                 ? dish.images[0]
//                                                 : null) ||
//                                             "https://via.placeholder.com/250?text=No+Image"
//                                         }
//                                         alt={dish.foodName || "Food"}
//                                         className="w-full h-48 object-cover rounded mb-4"
//                                     />
//                                     <div className="flex-1 flex flex-col">
//                                         <div className="flex items-center justify-between mb-2">
//                                             <h3 className="text-xl font-bold text-[#2a2a2a]">{dish.foodName}</h3>
//                                             <span className={
//                                                 dish.isAvailable
//                                                     ? "bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-bold"
//                                                     : "bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full font-bold"
//                                             }>
//                                                 {dish.isAvailable ? "Available" : "Unavailable"}
//                                             </span>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 font-medium">
//                                             {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.type}</span>}
//                                             {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.category}</span>}
//                                         </div>
//                                         <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
//                                         <div className="flex items-center justify-between mt-auto gap-2">
//                                             <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
//                                         </div>
//                                         {dish.isAvailable ? (
//                                             cartItems[dish._id] ? (
//                                                 <div className="mt-4 flex items-center justify-between gap-3">
//                                                     <div className="flex items-center gap-2">
//                                                         <button onClick={() => decreaseQty(dish._id)} className="px-2 bg-gray-200 rounded">-</button>
//                                                         <span className="w-6 text-center inline-block">
//                                                             {quantities[dish._id] || 1}
//                                                         </span>
//                                                         <button onClick={() => increaseQty(dish._id)} className="px-2 bg-gray-200 rounded">+</button>
//                                                     </div>
//                                                     <button onClick={() => removeFromCart(dish._id)} className="text-sm text-red-600 font-semibold">Remove</button>
//                                                 </div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => handleAddToCart(dish._id)}
//                                                     className="mt-4 w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow transition"
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             )
//                                         ) : (
//                                             <div className="mt-4 text-center text-red-500 font-semibold text-[15px]">
//                                                 Currently, this dish is not available.
//                                             </div>
//                                         )}
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

const FoodMenu = ({ searchTerm }) => {
    const [food, setFood] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [quantities, setQuantities] = useState({});
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErr("");

            try {
                const [foodRes, restRes] = await Promise.all([
                    axios.get("http://localhost:8080/food-items/"),
                    axios.get("http://localhost:8080/Restaurant/")
                ]);

                const foodData = foodRes.data.foodItem || [];
                const restaurantData = restRes.data.data || [];

                // Add restaurantName to each food item
                const enrichedFood = foodData.map(item => {
                    const restaurant = restaurantData.find(r => r._id === item.restaurantId);
                    return {
                        ...item,
                        restaurantName: restaurant?.restaurantName || "Unknown Restaurant"
                    };
                });

                setFood(enrichedFood);
                setRestaurants(restaurantData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setErr("Could not fetch menu. Please try again.");
            }

            setLoading(false);
        };

        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Cart/getcart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
                    },
                });
                const cartMap = {};
                res.data.forEach(item => {
                    cartMap[item.foodItemId._id] = item.quantity;
                });
                setCartItems(cartMap);
                setQuantities(cartMap);
            } catch (err) {
                console.error("Cart fetch error", err);
            }
        };

        fetchData();
        fetchCart();
    }, []);

    const increaseQty = async (id) => {
        const newQty = (quantities[id] || 1) + 1;
        await updateCart(id, newQty);
    };

    const decreaseQty = async (id) => {
        const newQty = (quantities[id] || 0) - 1;
        if (newQty <= 0) {
            await removeFromCart(id);
        } else {
            await updateCart(id, newQty);
        }
    };

    const updateCart = async (foodItemId, quantity) => {
        try {
            await axios.put("http://localhost:8080/Cart/updatecart", { foodItemId, quantity }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
                },
            });
            setQuantities(prev => ({ ...prev, [foodItemId]: quantity }));
            setCartItems(prev => ({ ...prev, [foodItemId]: quantity }));
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log("error", error);
            alert("Failed to update cart.");
        }
    };

    const removeFromCart = async (foodItemId) => {
        try {
            await axios.put("http://localhost:8080/Cart/updatecart", { foodItemId, quantity: 0 }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
                },
            });

            const updatedCart = { ...cartItems };
            const updatedQuantities = { ...quantities };
            delete updatedCart[foodItemId];
            delete updatedQuantities[foodItemId];

            setCartItems(updatedCart);
            setQuantities(updatedQuantities);

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log("error", error);
            alert("Failed to remove item from cart.");
        }
    };

    const handleAddToCart = async (foodId) => {
        try {
            const quantityToAdd = quantities[foodId] || 1;
            await axios.post("http://localhost:8080/Cart/createcart", {
                foodItemId: foodId,
                quantity: quantityToAdd,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
                },
            });

            setCartItems(prev => ({ ...prev, [foodId]: quantityToAdd }));
            setQuantities(prev => ({ ...prev, [foodId]: quantityToAdd }));
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log("error", error);
            alert("Failed to add to cart. Please login or try again.");
        }
    };

    // 🔍 Filter logic using searchTerm
    const filteredFood = food.filter((dish) => {
        const term = searchTerm.toLowerCase();
        return (
            dish.foodName?.toLowerCase().includes(term) ||
            dish.category?.toLowerCase().includes(term) ||
            dish.restaurantName?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="min-h-screen py-10 bg-gradient-to-br from-[#faebd7] to-[#f7fafc] mt-18">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
                    Menu
                </h1>
                {err && <div className="text-center mb-6 text-red-500 font-semibold">{err}</div>}
                {loading ? (
                    <div className="text-center text-xl py-10">Loading menu...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                        {filteredFood.length ? (
                            filteredFood.map((dish) => (
                                <div key={dish._id} className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col">
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
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-[#2a2a2a]">{dish.foodName}</h3>
                                            <span className={dish.isAvailable ? "bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-bold" : "bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full font-bold"}>
                                                {dish.isAvailable ? "Available" : "Unavailable"}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 font-medium">
                                            {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.type}</span>}
                                            {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.category}</span>}
                                            {dish.restaurantName && <span className="px-2 py-0.5 bg-gray-100 rounded">{dish.restaurantName}</span>}
                                        </div>
                                        <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
                                        <div className="flex items-center justify-between mt-auto gap-2">
                                            <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
                                        </div>
                                        {dish.isAvailable ? (
                                            cartItems[dish._id] ? (
                                                <div className="mt-4 flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => decreaseQty(dish._id)} className="px-2 bg-gray-200 rounded">-</button>
                                                        <span className="w-6 text-center inline-block">
                                                            {quantities[dish._id] || 1}
                                                        </span>
                                                        <button onClick={() => increaseQty(dish._id)} className="px-2 bg-gray-200 rounded">+</button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(dish._id)} className="text-sm text-red-600 font-semibold">Remove</button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(dish._id)}
                                                    className="mt-4 w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow transition"
                                                >
                                                    Add to Cart
                                                </button>
                                            )
                                        ) : (
                                            <div className="mt-4 text-center text-red-500 font-semibold text-[15px]">
                                                Currently, this dish is not available.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                No food items match your search.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodMenu;
