import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const FoodCard = ({ dish, index, cartItems, quantities, increaseQty, decreaseQty, removeFromCart, handleAddToCart }) => {
    const isInCart = cartItems[dish._id];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <Link
                to={`/food/${dish._id}`}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-5 flex flex-col group hover:-translate-y-1"
            >
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                        style: { transitionDelay: "1s" },
                    }}
                    src={
                        dish.images?.[0]?.imageUrl ||
                        (Array.isArray(dish.images) && typeof dish.images[0] === "string"
                            ? dish.images[0]
                            : null) ||
                        "https://via.placeholder.com/250?text=No+Image"
                    }
                    alt={dish.foodName || "Food"}
                    className="w-full h-44 object-cover rounded-lg mb-3 group-hover:opacity-90 transition"
                />

                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{dish.foodName}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${dish.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {dish.isAvailable ? "Available" : "Unavailable"}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3 font-medium">
                        {dish.type && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{dish.type}</span>}
                        {dish.category && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{dish.category}</span>}
                        {dish.restaurantName && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded-full flex items-center">
                                <FaUtensils className="size-3 mt-0.5 mx-1" /> {dish.restaurantName}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dish.description}</p>

                    <div className="flex items-center justify-between mt-auto mb-2">
                        <span className="text-orange-600 text-lg font-bold">₹{dish.price}</span>
                    </div>

                    {dish.isAvailable ? (
                        isInCart ? (
                            <div className="flex items-center justify-between mt-3 gap-3">
                                <div className="flex items-center gap-2">
                                    <button onClick={(e) => { e.preventDefault(); decreaseQty(dish._id); }} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FiMinus size={16} />
                                    </button>
                                    <span className="w-6 text-center font-semibold text-sm">{quantities[dish._id] || 1}</span>
                                    <button onClick={(e) => { e.preventDefault(); increaseQty(dish._id); }} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FiPlus size={16} />
                                    </button>
                                </div>
                                <button onClick={(e) => { e.preventDefault(); removeFromCart(dish._id); }} className="text-sm text-red-500 hover:underline font-semibold">
                                    <FiTrash className="inline-block mr-1" /> Remove
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={(e) => { e.preventDefault(); handleAddToCart(dish._id); }}
                                className="mt-3 w-full py-2 rounded-md font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all"
                            >
                                Add to Cart
                            </button>
                        )
                    ) : (
                        <div className="mt-3 text-center text-red-500 font-medium text-sm">Currently unavailable</div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default FoodCard;
