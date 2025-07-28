import React from 'react';

const foodGrid = ({ food }) => {
    return (
        <div className="py-10 px-6 bg-white">
            <h2 className="text-3xl font-bold text-center mb-6">Our food</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {food.length > 0 ? (
                    food.map((dish) => (
                        <div key={dish._id} className="bg-white rounded shadow p-4">
                            <img
                                src={dish.images[0]?.imageUrl || 'https://via.placeholder.com/150'}
                                alt={dish.name}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h3 className="text-xl font-semibold">{dish.name}</h3>
                            <p className="text-gray-600">{dish.description}</p>
                            <p className="mt-2 font-bold text-orange-500">₹{dish.price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No food available.</p>
                )}
            </div>
        </div>
    );
};

export default foodGrid;
