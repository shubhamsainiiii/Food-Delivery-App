// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import Sidebar from "./Sidebar";
// // import { toast } from "react-toastify";
// // import { motion } from "framer-motion";

// // const RestaurantDetails = () => {
// //     const { id } = useParams();
// //     const [restaurant, setRestaurant] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const token = localStorage.getItem("userToken");

// //     useEffect(() => {
// //         const fetchRestaurant = async () => {
// //             try {
// //                 const res = await axios.get(`http://localhost:8080/Admin/restaurant/${id}`,
// //                     {
// //                         headers: { Authorization: `Bearer ${token}` },
// //                     }
// //                 );
// //                 setRestaurant(res.data.restaurantData);
// //             } catch (err) {
// //                 console.error(err);
// //                 toast.error("Failed to fetch restaurant details");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchRestaurant();
// //     }, [id, token]);

// //     if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
// //     if (!restaurant) return <p className="text-center mt-10">No restaurant found</p>;

// //     return (
// //         <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
// //             {/* Sidebar */}
// //             <div className="w-64">
// //                 <Sidebar />
// //             </div>

// //             {/* Main Content */}
// //             <div className="flex-1 p-6">
// //                 <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.6 }}
// //                     className="bg-white rounded-xl shadow p-6"
// //                 >
// //                     <h1 className="text-3xl font-bold mb-4">{restaurant.restaurantName}</h1>
// //                     <p><strong>Owner:</strong> {restaurant.name}</p>
// //                     <p><strong>Email:</strong> {restaurant.email}</p>
// //                     <p><strong>Address:</strong> {restaurant.address}</p>

// //                     {/* Food Items */}
// //                     <h2 className="text-2xl font-semibold mt-6 mb-3">Menu</h2>
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         {restaurant.foodItems && restaurant.foodItems.length > 0 ? (
// //                             restaurant.foodItems.map((food, i) => (
// //                                 <div key={i} className="border rounded-lg p-4 shadow hover:shadow-md transition">
// //                                     <img
// //                                         src={food.image}
// //                                         alt={food.name}
// //                                         className="w-full h-40 object-cover rounded-lg mb-2"
// //                                     />
// //                                     <h3 className="font-bold">{food.name}</h3>
// //                                     <p className="text-sm text-gray-600">{food.description}</p>
// //                                     <p className="text-green-600 font-semibold mt-1">₹{food.price}</p>
// //                                 </div>
// //                             ))
// //                         ) : (
// //                             <p>No food items available</p>
// //                         )}
// //                     </div>
// //                 </motion.div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default RestaurantDetails;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";

// const RestaurantDetails = () => {
//     const { id } = useParams();
//     const [restaurant, setRestaurant] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRestaurant = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:8080/Admin/restaurant/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                         },
//                     }
//                 );
//                 setRestaurant(res.data.restaurantData); // match backend key
//             } catch (error) {
//                 console.error("Error fetching restaurant details", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRestaurant();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <p className="text-lg font-medium text-gray-600">Loading...</p>
//             </div>
//         );
//     }

//     if (!restaurant) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <p className="text-lg font-medium text-red-500">Restaurant not found</p>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             {/* Restaurant Info */}
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="mb-8"
//             >
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     {restaurant.name}
//                 </h1>
//                 <p className="text-gray-600">{restaurant.description}</p>
//             </motion.div>

//             {/* Food Menu */}
//             <motion.div
//                 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//                 initial="hidden"
//                 animate="show"
//                 variants={{
//                     hidden: {},
//                     show: { transition: { staggerChildren: 0.15 } },
//                 }}
//             >
//                 {restaurant.foods && restaurant.foods.length > 0 ? (
//                     restaurant.foods.map((food) => (
//                         <motion.div
//                             key={food._id}
//                             variants={{
//                                 hidden: { opacity: 0, y: 20 },
//                                 show: { opacity: 1, y: 0 },
//                             }}
//                             transition={{ duration: 0.4 }}
//                             className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                         >
//                             <img
//                                 src={food.image}
//                                 alt={food.name}
//                                 className="w-full h-48 object-cover"
//                             />
//                             <div className="p-4">
//                                 <h2 className="text-lg font-semibold text-gray-800">{food.name}</h2>
//                                 <p className="text-gray-600 mt-1">{food.description}</p>
//                                 <p className="text-primary font-bold mt-2">₹{food.price}</p>
//                             </div>
//                         </motion.div>
//                     ))
//                 ) : (
//                     <p className="col-span-full text-gray-500">
//                         No foods available for this restaurant.
//                     </p>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default RestaurantDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/Admin/restaurant/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRestaurant(res.data.restaurantData);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, [id, token]);

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (!restaurant) {
        return <div className="p-5 text-center">Restaurant not found.</div>;
    }

    // Address handling
    const formattedAddress =
        typeof restaurant.address === "object"
            ? `${restaurant.address.street || ""}, ${restaurant.address.city || ""}, ${restaurant.address.state || ""} - ${restaurant.address.zip || ""}`
            : restaurant.address;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
            <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>
            <p><strong>Email:</strong> {restaurant.email}</p>
            <p><strong>Phone:</strong> {restaurant.phone}</p>
            <p><strong>Address:</strong> {formattedAddress}</p>
            <p>
                <strong>Status:</strong>
                <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm ${restaurant.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : restaurant.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    {restaurant.status}
                </span>
            </p>
            {restaurant.image && (
                <div className="mt-4">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full rounded-lg shadow"
                    />
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;
