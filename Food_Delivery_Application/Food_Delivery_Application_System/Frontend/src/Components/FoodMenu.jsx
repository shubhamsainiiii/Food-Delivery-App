// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
// import { FaUtensils, FaUtensilSpoon } from "react-icons/fa";

// const FoodMenu = () => {
//     const [food, setFood] = useState([]);
//     const [restaurants, setRestaurants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [err, setErr] = useState("");
//     const [quantities, setQuantities] = useState({});
//     const [cartItems, setCartItems] = useState({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortOrder, setSortOrder] = useState("default");
//     const [filterType, setFilterType] = useState("all");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setErr("");

//             try {
//                 const [foodRes, restRes] = await Promise.all([
//                     axios.get("http://localhost:8080/food-items/"),
//                     axios.get("http://localhost:8080/Restaurant/")
//                 ]);

//                 const foodData = foodRes.data.foodItem || [];
//                 const restaurantData = restRes.data.data || [];

//                 const enrichedFood = foodData.map(item => {
//                     const restaurant = restaurantData.find(r => r._id === item.restaurantId);
//                     return {
//                         ...item,
//                         restaurantName: restaurant?.restaurantName || "Unknown Restaurant"
//                     };
//                 });

//                 setFood(enrichedFood);
//                 setRestaurants(restaurantData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
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

//         fetchData();
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
//             console.log("error", error)
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
//             console.log("error", error)
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
//             setQuantities(prev => ({ ...prev, [foodId]: quantityToAdd }));
//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.log("error", error)
//             alert("Failed to add to cart. Please login or try again.");
//         }
//     };

//     let filteredFood = food.filter((dish) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             dish.foodName?.toLowerCase().includes(term) ||
//             dish.category?.toLowerCase().includes(term) ||
//             dish.restaurantName?.toLowerCase().includes(term)
//         );
//     });

//     if (filterType !== "all") {
//         filteredFood = filteredFood.filter(dish => dish.type?.toLowerCase() === filterType);
//     }

//     if (sortOrder === "low-to-high") {
//         filteredFood.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === "high-to-low") {
//         filteredFood.sort((a, b) => b.price - a.price);
//     }

//     return (
//         <div className="min-h-screen py-10 bg-gradient-to-br from-[#faebd7] to-[#f7fafc] mt-18">
//             <div className="max-w-6xl mx-auto px-4">
//                 <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
//                     Menu
//                 </h1>

//                 {/* Filters */}
//                 <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
//                     <input
//                         type="text"
//                         placeholder="Search food, category, or restaurant..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     />
//                     <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-4 py-2 rounded-lg border shadow-sm">
//                         <option value="default">Sort</option>
//                         <option value="low-to-high">Price : Low to High</option>
//                         <option value="high-to-low">Price : High to Low</option>
//                     </select>
//                     <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 rounded-lg border shadow-sm">
//                         <option value="all">All</option>
//                         <option value="veg">Vegetarian</option>
//                         <option value="non-veg">Non-Vegetarian</option>
//                     </select>
//                 </div>

//                 {err && <div className="text-center mb-6 text-red-500 font-semibold">{err}</div>}

//                 {loading ? (
//                     <div className="text-center text-xl py-10">Loading menu...</div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
//                         {filteredFood.length ? (
//                             filteredFood.map((dish) => (
//                                 <Link
//                                     to={`/food/${dish._id}`}
//                                     key={dish._id}
//                                     className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-5 flex flex-col group hover:-translate-y-1"
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
//                                         className="w-full h-44 object-cover rounded-lg mb-3 group-hover:opacity-90 transition"
//                                     />

//                                     <div className="flex-1 flex flex-col">
//                                         <div className="flex items-center justify-between mb-2">
//                                             <h3 className="text-lg font-semibold text-gray-800">{dish.foodName}</h3>
//                                             <span className={`text-xs font-bold px-2 py-1 rounded-full ${dish.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
//                                                 {dish.isAvailable ? "Available" : "Unavailable"}
//                                             </span>
//                                         </div>

//                                         <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3 font-medium">
//                                             {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{dish.type}</span>}
//                                             {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{dish.category}</span>}
//                                             {dish.restaurantName && (
//                                                 <span className="px-2 py-0.5 bg-gray-100 rounded-full flex items-center">
//                                                     <FaUtensils className="size-3 mt-0.7 mx-1" /> {dish.restaurantName}
//                                                 </span>
//                                             )}
//                                         </div>

//                                         <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dish.description}</p>

//                                         <div className="flex items-center justify-between mt-auto mb-2">
//                                             <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
//                                         </div>

//                                         {dish.isAvailable ? (
//                                             cartItems[dish._id] ? (
//                                                 <div className="flex items-center justify-between mt-3 gap-3">
//                                                     <div className="flex items-center gap-2">
//                                                         <button onClick={(e) => { e.preventDefault(); decreaseQty(dish._id); }} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
//                                                             <FiMinus size={16} />
//                                                         </button>
//                                                         <span className="w-6 text-center font-semibold text-sm">
//                                                             {quantities[dish._id] || 1}
//                                                         </span>
//                                                         <button onClick={(e) => { e.preventDefault(); increaseQty(dish._id); }} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
//                                                             <FiPlus size={16} />
//                                                         </button>
//                                                     </div>
//                                                     <button onClick={(e) => { e.preventDefault(); removeFromCart(dish._id); }} className="text-sm text-red-500 hover:underline font-semibold">
//                                                         <FiTrash className="inline-block mr-1" />
//                                                         Remove
//                                                     </button>
//                                                 </div>
//                                             ) : (
//                                                 <button
//                                                     onClick={(e) => { e.preventDefault(); handleAddToCart(dish._id); }}
//                                                     className="mt-3 w-full py-2 rounded-md font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all"
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             )
//                                         ) : (
//                                             <div className="mt-3 text-center text-red-500 font-medium text-sm">
//                                                 Currently unavailable
//                                             </div>
//                                         )}
//                                     </div>
//                                 </Link>
//                             ))
//                         ) : (
//                             <div className="col-span-full text-center text-gray-500 text-lg">
//                                 No food items match your search.
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
import FoodCard from "../Components/FoodCard";
import { FaUtensils } from "react-icons/fa";

const FoodMenu = () => {
    const [food, setFood] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [quantities, setQuantities] = useState({});
    const [cartItems, setCartItems] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [filterType, setFilterType] = useState("all");

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

    // Filters & Sorting
    let filteredFood = food.filter((dish) => {
        const term = searchTerm.toLowerCase();
        return (
            dish.foodName?.toLowerCase().includes(term) ||
            dish.category?.toLowerCase().includes(term) ||
            dish.restaurantName?.toLowerCase().includes(term)
        );
    });

    if (filterType !== "all") {
        filteredFood = filteredFood.filter(dish => dish.type?.toLowerCase() === filterType);
    }

    if (sortOrder === "low-to-high") {
        filteredFood.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
        filteredFood.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="min-h-screen py-10 bg-gradient-to-br from-[#faebd7] to-[#f7fafc] mt-18">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider drop-shadow">
                    Menu
                </h1>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
                    <input
                        type="text"
                        placeholder="Search food, category, or restaurant..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-4 py-2 rounded-lg border shadow-sm">
                        <option value="default">Sort</option>
                        <option value="low-to-high">Price : Low to High</option>
                        <option value="high-to-low">Price : High to Low</option>
                    </select>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 rounded-lg border shadow-sm">
                        <option value="all">All</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                    </select>
                </div>

                {err && <div className="text-center mb-6 text-red-500 font-semibold">{err}</div>}

                {loading ? (
                    <div className="text-center text-xl py-10">Loading menu...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                        {filteredFood.length ? (
                            filteredFood.map((dish, index) => (
                                <FoodCard
                                    key={dish._id}
                                    dish={dish}
                                    index={index}
                                    cartItems={cartItems}
                                    quantities={quantities}
                                    increaseQty={increaseQty}
                                    decreaseQty={decreaseQty}
                                    removeFromCart={removeFromCart}
                                    handleAddToCart={handleAddToCart}
                                />
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
