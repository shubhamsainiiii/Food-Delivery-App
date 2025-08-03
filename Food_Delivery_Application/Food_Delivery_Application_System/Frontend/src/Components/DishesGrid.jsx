import React, { useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

const DishesGrid = ({ food }) => {
    const [addingId, setAddingId] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [error, setError] = useState('');

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

    if (!food || !Array.isArray(food)) {
        return <p className="text-center py-10 text-gray-500">No food available.</p>;
    }

    return (
        <div className="py-10 px-6  bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
            <h2 className="text-3xl font-bold text-center mb-6">Our Food</h2>
            {error && <p className="text-center text-red-500 mb-4 font-semibold">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {food.length > 0 ? (
                    food.filter(dish => dish.isAvailable).map((dish) => {
                        const imageUrl =
                            dish.images?.[0]?.imageUrl || dish.images?.[0] || dish.image?.[0] || dish.image || 'https://via.placeholder.com/150';

                        return (
                            <div key={dish._id} className="rounded-xl overflow-hidden shadow-sm shadow-gray-400 transition-all bg-white">
                                <img
                                    src={imageUrl}
                                    alt={dish.foodName || 'Food'}
                                    className="w-full h-55 object-cover hover:scale-105 transition-all duration-600"
                                />

                                <div className="p-4 flex flex-col gap-1">

                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                        {dish.foodName || 'Untitled Dish'}
                                    </h3>
                                    <p className="text-sm text-gray-500"><span className='font-bold text-gray-700'>Category : </span>{dish.category || 'Cuisine'}</p>

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
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center col-span-full text-gray-500">No food available.</p>
                )}
            </div>
        </div>
    );
};

export default DishesGrid;

