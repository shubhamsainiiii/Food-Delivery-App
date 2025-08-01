// import React, { useState } from 'react';

// const CartItem = ({ item, onUpdate, onRemove }) => {
//     const [quantity, setQuantity] = useState(item.quantity);

//     const handleQuantityChange = (e) => {
//         const val = Math.max(1, Number(e.target.value));
//         setQuantity(val);
//     };

//     return (
//         <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white shadow-sm rounded-lg hover:shadow-lg transition mb-3">
//             {/* Food Image */}
//             <img
//                 src={item.foodItemId?.images?.[0]?.imageUrl || 'https://via.placeholder.com/80'}
//                 alt={item.foodItemId?.name}
//                 className="w-20 h-20 rounded object-cover border"
//             />

//             {/* Info */}
//             <div className="flex-1 text-left">
//                 <p className="font-bold text-lg text-gray-900">{item.foodItemId?.name}</p>
//                 <p className="text-gray-600 text-sm mt-1">Price: <span className="text-orange-600 font-semibold">₹{item.foodItemId?.price}</span></p>
//                 <p className="text-xs text-gray-500 mt-2">Total: <span className="text-orange-700 font-semibold">₹{(item.foodItemId?.price * quantity)}</span></p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row items-center gap-2">
//                 {/* Quantity Selector */}
//                 <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={handleQuantityChange}
//                     className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-orange-500 bg-gray-50"
//                 />

//                 {/* Update Button */}
//                 <button
//                     onClick={() => onUpdate(item.foodItemId._id, quantity)}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Update
//                 </button>

//                 {/* Remove Button */}
//                 <button
//                     onClick={() => onRemove(item._id)}
//                     className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;



// import React, { useState, useEffect } from 'react';

// const CartItem = ({ item, onUpdate, onRemove }) => {
//     const [quantity, setQuantity] = useState(item.quantity);

//     // Keep quantity state synced if item.quantity changes externally
//     useEffect(() => {
//         setQuantity(item.quantity);
//     }, [item.quantity]);

//     const handleQuantityChange = (e) => {
//         const val = Math.max(1, Number(e.target.value));
//         setQuantity(val);
//     };

//     // Determine the image URL safely from various possible structures
//     const imageUrl =
//         (item.foodItemId?.images && item.foodItemId.images.length > 0 && (
//             typeof item.foodItemId.images[0] === 'string'
//                 ? item.foodItemId.images[0]
//                 : item.foodItemId.images[0]?.imageUrl
//         )) ||
//         item.foodItemId?.image?.[0] ||
//         item.foodItemId?.image ||
//         'https://via.placeholder.com/80';

//     console.log('cart item ', item)
//     console.log('food item ', item.foodItemId)

//     return (
//         <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white shadow-sm rounded-lg hover:shadow-lg transition mb-3">
//             {/* Food Image */}
//             <img
//                 src={imageUrl}
//                 alt={item.foodItemId?.name || 'Food Image'}
//                 className="w-20 h-20 rounded object-cover border"
//             />

//             {/* Info */}
//             <div className="flex-1 text-left">
//                 <p className="font-bold text-lg text-gray-900">{item.foodItemId?.foodName || 'Unnamed Item'}</p>
//                 <p className="text-gray-600 text-sm mt-1">
//                     Price: <span className="text-orange-600 font-semibold">₹{item.foodItemId?.price ?? 'N/A'}</span>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                     Total: <span className="text-orange-700 font-semibold">₹{(item.foodItemId?.price ?? 0) * quantity}</span>
//                 </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row items-center gap-2">
//                 {/* Quantity Selector */}
//                 <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={handleQuantityChange}
//                     className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-orange-500 bg-gray-50"
//                 />

//                 {/* Update Button */}
//                 <button
//                     onClick={() => onUpdate(item.foodItemId._id, quantity)}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Update
//                 </button>

//                 {/* Remove Button */}
//                 <button
//                     onClick={() => onRemove(item._id)}
//                     className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;


// import React, { useState, useEffect } from 'react';

// const CartItem = ({ item, onUpdate, onRemove }) => {
//     const [quantity, setQuantity] = useState(item.quantity);

//     useEffect(() => {
//         setQuantity(item.quantity);
//     }, [item.quantity]);

//     const food = item.foodItemId || {};

//     const imageUrl = 'https://via.placeholder.com/80'; // Until you add images field

//     return (
//         <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white shadow-sm rounded-lg hover:shadow-lg transition mb-3">
//             <img
//                 src={imageUrl}
//                 alt={food.foodName || 'Food Image'}
//                 className="w-20 h-20 rounded object-cover border"
//             />

//             <div className="flex-1 text-left">
//                 <p className="font-bold text-lg text-gray-900">{food.foodName || 'Unnamed Item'}</p>
//                 <p className="text-gray-600 text-sm mt-1">
//                     Price: <span className="text-orange-600 font-semibold">₹{food.price ?? 'N/A'}</span>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                     Total: <span className="text-orange-700 font-semibold">₹{(food.price ?? 0) * quantity}</span>
//                 </p>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-2">
//                 <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
//                     className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-orange-500 bg-gray-50"
//                 />
//                 <button
//                     onClick={() => onUpdate(item.foodItemId._id, quantity)}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Update
//                 </button>
//                 <button
//                     onClick={() => onRemove(item._id)}
//                     className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;


// import React, { useState, useEffect } from 'react';

// const CartItem = ({ item, onUpdate, onRemove }) => {
//     const [quantity, setQuantity] = useState(item.quantity);

//     useEffect(() => {
//         setQuantity(item.quantity);
//     }, [item.quantity]);

//     const food = item.foodItemId || {};

//     // Image fallback logic supporting multiple possible data shapes
//     const imageUrl =
//         (food.images && food.images.length > 0 && (
//             typeof food.images[0] === 'string'
//                 ? food.images[0]
//                 : food.images[0]?.imageUrl
//         )) ||
//         food.image?.[0] ||
//         food.image ||
//         'https://via.placeholder.com/80';

//     return (
//         <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white shadow-sm rounded-lg hover:shadow-lg transition mb-3">
//             {/* Food Image */}
//             <img
//                 src={imageUrl}
//                 alt={food.foodName || 'Food Image'}
//                 className="w-20 h-20 rounded object-cover border"
//             />

//             {/* Info */}
//             <div className="flex-1 text-left">
//                 <p className="font-bold text-lg text-gray-900">{food.foodName || 'Unnamed Item'}</p>
//                 <p className="text-gray-600 text-sm mt-1">
//                     Price: <span className="text-orange-600 font-semibold">₹{food.price ?? 'N/A'}</span>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                     Total: <span className="text-orange-700 font-semibold">₹{(food.price ?? 0) * quantity}</span>
//                 </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row items-center gap-2">
//                 {/* Quantity Selector */}
//                 <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
//                     className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-orange-500 bg-gray-50"
//                 />

//                 {/* Update Button */}
//                 <button
//                     onClick={() => onUpdate(item.foodItemId._id, quantity)}
//                     className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Update
//                 </button>

//                 {/* Remove Button */}
//                 <button
//                     onClick={() => onRemove(item._id)}
//                     className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded transition font-medium shadow"
//                 >
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;


import React, { useState, useEffect } from 'react';

const CartItem = ({ item, onUpdate, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const food = item.foodItemId || {};

    const imageUrl =
        (food.images && food.images.length > 0 && (
            typeof food.images[0] === 'string'
                ? food.images[0]
                : food.images[0]?.imageUrl
        )) ||
        food.image?.[0] ||
        food.image ||
        'https://via.placeholder.com/80';

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white shadow-sm rounded-lg hover:shadow-lg transition mb-3">
            <img
                src={imageUrl}
                alt={food.foodName || 'Food Image'}
                className="w-20 h-20 rounded object-cover border"
            />

            <div className="flex-1 text-left">
                <p className="font-bold text-lg text-gray-900">{food.foodName || 'Unnamed Item'}</p>
                <p className="text-gray-600 text-sm mt-1">
                    Price: <span className="text-orange-600 font-semibold">₹{food.price ?? 'N/A'}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Total: <span className="text-orange-700 font-semibold">₹{(food.price ?? 0) * quantity}</span>
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-orange-500 bg-gray-50"
                />

                <button
                    onClick={() => onUpdate(item.foodItemId._id, quantity)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition font-medium shadow"
                >
                    Update
                </button>

                <button
                    onClick={() => onRemove(item._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded transition font-medium shadow"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
