
// import React from 'react';

// const Discover = ({ restaurants }) => {
//     return (
//         <section className="py-10 px-6  bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
//             <h2 className="text-2xl font-bold mb-6">Discover Restaurants</h2>

//             {restaurants.length === 0 ? (
//                 <p>No restaurants available.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {restaurants.map((restaurant) => (
//                         <div
//                             key={restaurant._id}
//                             className="rounded-lg shadow-sm bg-white shadow-gray-400 transition duration-300 overflow-hidden"
//                         >
//                             {/* Image */}
//                             <img
//                                 src={restaurant.image?.[0] || ''}
//                                 alt={restaurant.restaurantName}
//                                 className="w-full h-55 object-cover hover:scale-105 transition-all duration-600"
//                             />

//                             {/* Content */}
//                             <div className="p-4">
//                                 <h3 className="text-xl font-semibold">{restaurant.restaurantName}</h3>
//                                 <p className="text-sm text-gray-500">Cuisine: {restaurant.cuisineType || 'N/A'}</p>
//                                 <p className="text-sm text-gray-500">
//                                     Address: {restaurant?.address?.street || 'N/A'}, {restaurant?.address?.city || 'N/A'}, {restaurant?.address?.state || 'N/A'} - {restaurant?.address?.zip || 'N/A'}
//                                 </p>


//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </section>
//     );
// };

// export default Discover;

import React, { useEffect, useState } from 'react';

const Discover = ({ restaurants, searchTerm }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    useEffect(() => {
        const query = searchTerm.toLowerCase();
        const filtered = restaurants.filter((restaurant) => {
            const name = restaurant.restaurantName?.toLowerCase() || '';
            const cuisine = restaurant.cuisineType?.toLowerCase() || '';
            const dishes = restaurant.dishes?.map(d => d.name?.toLowerCase()).join(' ') || '';
            return (
                name.includes(query) ||
                cuisine.includes(query) ||
                dishes.includes(query)
            );
        });

        setFilteredRestaurants(filtered);
    }, [searchTerm, restaurants]);

    return (
        <section className="py-10 px-6 bg-gradient-to-br from-[#faebd7] to-[#f7fafc]">
            <h2 className="text-2xl font-bold mb-6">Discover Restaurants</h2>

            {filteredRestaurants.length === 0 ? (
                <p>No restaurants found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant._id}
                            className="rounded-lg shadow-sm bg-white shadow-gray-400 transition duration-300 overflow-hidden"
                        >
                            <img
                                src={restaurant.image?.[0] || ''}
                                alt={restaurant.restaurantName}
                                className="w-full h-55 object-cover hover:scale-105 transition-all duration-600"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{restaurant.restaurantName}</h3>
                                <p className="text-sm text-gray-500">Cuisine: {restaurant.cuisineType || 'N/A'}</p>
                                <p className="text-sm text-gray-500">
                                    Address: {restaurant?.address?.street || 'N/A'}, {restaurant?.address?.city || 'N/A'}, {restaurant?.address?.state || 'N/A'} - {restaurant?.address?.zip || 'N/A'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Discover;
