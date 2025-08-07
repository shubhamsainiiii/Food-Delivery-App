import React, { useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import 'react-lazy-load-image-component/src/effects/blur.css';

const DishesGrid = ({ food, searchTerm }) => {
    const [addingId, setAddingId] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddToCart = async (dishId) => {
        setAddingId(dishId);
        setError('');
        setSuccessId(null);

        try {
            await axios.post(
                'http://localhost:8080/Cart/createcart',
                { foodItemId: dishId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken') || ''}`,
                    },
                }
            );
            window.dispatchEvent(new Event("cartUpdated"));
            setSuccessId(dishId);
            setTimeout(() => setSuccessId(null), 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add to cart. Please login or try again.');
        } finally {
            setAddingId(null);
        }
    };

    const filteredFood = food.filter((dish) => {
        const term = searchTerm.toLowerCase();
        return (
            (dish.foodName && dish.foodName.toLowerCase().includes(term)) ||
            (dish.category && dish.category.toLowerCase().includes(term)) ||
            (dish.restaurantName && dish.restaurantName.toLowerCase().includes(term))
        );
    });

    const displayedFood = filteredFood.filter(dish => dish.isAvailable).slice(0, 9);

    if (!food || !Array.isArray(food)) {
        return <p className="text-center py-10 text-gray-500">No food available.</p>;
    }

    return (
        <div className="py-10 px-6 bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
            <h2 className="text-3xl font-bold text-center mb-6">Our Food</h2>
            {error && <p className="text-center text-red-500 mb-4 font-semibold">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayedFood.length > 0 ? (
                    displayedFood.map((dish, index) => {
                        const imageUrl =
                            dish.images?.[0]?.imageUrl ||
                            dish.images?.[0] ||
                            dish.image?.[0] ||
                            dish.image ||
                            'https://via.placeholder.com/150';

                        return (
                            <motion.div
                                key={dish._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: false }}
                                className="rounded-xl overflow-hidden shadow-sm shadow-gray-400 transition-all bg-white"
                            >
                                <Link to={`/food/${dish._id}`} className="block hover:no-underline">
                                    <LazyLoadImage
                                        src={imageUrl}
                                        alt={dish.foodName || 'Food'}
                                        effect="blur"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" },
                                        }}
                                        className="w-full h-48 object-cover object-center"
                                    />
                                </Link>

                                <div className="p-4 flex flex-col gap-1">
                                    <Link to={`/food/${dish._id}`} className="block hover:no-underline">
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                            {dish.foodName || 'Untitled Dish'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            <span className='font-bold text-gray-700'>Category: </span>
                                            {dish.category || 'Cuisine'}
                                        </p>
                                    </Link>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {dish.description || 'No description available.'}
                                    </p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-orange-600 font-bold">₹{dish.price || 0}</span>
                                            <span className="text-gray-400 line-through text-sm">₹{(dish.price || 0) + 5}</span>
                                        </div>

                                        {dish.rating && (
                                            <span className="flex items-center text-yellow-600 text-sm">
                                                <Star size={14} fill="orange" className="mr-1" />
                                                {dish.rating}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        className={`mt-4 w-full px-4 py-2 rounded ${addingId === dish._id
                                            ? 'bg-gray-400 cursor-wait'
                                            : 'bg-orange-500 hover:bg-orange-600'
                                            } text-white font-medium transition`}
                                        disabled={addingId === dish._id}
                                        onClick={() => handleAddToCart(dish._id)}
                                    >
                                        {addingId === dish._id
                                            ? 'Adding...'
                                            : successId === dish._id
                                                ? '✓ Added!'
                                                : 'Add to Cart'}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <p className="text-center col-span-full text-gray-500 text-lg">
                        No food items match your search.
                    </p>
                )}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate('/menu')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                    Explore More Food
                </button>
            </div>
        </div>
    );
};

export default DishesGrid;