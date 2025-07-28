
import React from 'react';

const Discover = ({ restaurants }) => {
    return (
        <section className="py-10 px-6 bg-white">
            <h2 className="text-2xl font-bold mb-6">Discover Restaurants</h2>

            {restaurants.length === 0 ? (
                <p>No restaurants available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant._id}
                            className="border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={restaurant.image?.[0] || ''}
                                alt={restaurant.restaurantName}
                                className="w-full h-40 object-cover"
                            />

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{restaurant.restaurantName}</h3>
                                <p className="text-sm text-gray-500">Cuisine: {restaurant.cuisineType || 'N/A'}</p>
                                <p className="text-sm text-gray-500">City: {restaurant?.address?.city || 'N/A'}</p>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Discover;
