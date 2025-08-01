// import React from 'react';

// const foodGrid = ({ food }) => {
//     return (
//         <div className="py-10 px-6 bg-white">
//             <h2 className="text-3xl font-bold text-center mb-6">Our food</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {food.length > 0 ? (
//                     food.map((dish) => (
//                         <div key={dish._id} className="bg-white rounded shadow p-4">
//                             <img
//                                 src={dish.images[0]?.imageUrl || 'https://via.placeholder.com/150'}
//                                 alt={dish.name}
//                                 className="w-full h-40 object-cover rounded mb-4"
//                             />
//                             <h3 className="text-xl font-semibold">{dish.name}</h3>
//                             <p className="text-gray-600">{dish.description}</p>
//                             <p className="mt-2 font-bold text-orange-500">₹{dish.price}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center col-span-full text-gray-500">No food available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default foodGrid;




import React, { useState } from 'react';
import axios from 'axios';

const DishesGrid = ({ food }) => {
    const [addingId, setAddingId] = useState(null); // Track which item is being added (for loading state)
    const [successId, setSuccessId] = useState(null); // Show success on added item
    const [error, setError] = useState('');

    // Add to cart handler
    const handleAddToCart = async (dishId) => {
        setAddingId(dishId);
        setError('');
        setSuccessId(null);

        try {
            // set quantity = 1 as default
            const res = await axios.post(
                'http://localhost:8080/Cart/createcart',
                { foodItemId: dishId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken') || ''}`,
                    },
                }
            );
            setSuccessId(dishId);
            setTimeout(() => setSuccessId(null), 1000); // Success tick for 1s
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to add to cart. Please login or try again.'
            );
        } finally {
            setAddingId(null);
        }
    };

    if (!food || !Array.isArray(food)) {
        return (
            <p className="text-center py-10 text-gray-500">No food available.</p>
        );
    }

    return (
        <div className="py-10 px-6 bg-white">
            <h2 className="text-3xl font-bold text-center mb-6">Our Food</h2>
            {error && (
                <p className="text-center text-red-500 mb-4 font-semibold">{error}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {food.length > 0 ? (
                    food.map((dish) => (
                        <div key={dish._id} className="bg-white rounded shadow p-4">
                            <img
                                src={
                                    dish.images?.[0]?.imageUrl ||
                                    'https://via.placeholder.com/150'
                                }
                                alt={dish.name || 'Food'}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h3 className="text-xl font-semibold">{dish.name}</h3>
                            <p className="text-gray-600">
                                {dish.description || 'No description available.'}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">Category: <span className="text-gray-700 font-medium">{dish.category || 'N/A'}</span></p>
                            <p className="mt-2 font-bold text-orange-500">₹{dish.price}</p>
                            <button
                                className={`mt-3 w-full px-4 py-2 rounded ${addingId === dish._id
                                    ? 'bg-gray-400 cursor-wait'
                                    : 'bg-orange-500 hover:bg-orange-600'
                                    } text-white font-medium`}
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
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No food available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DishesGrid;
