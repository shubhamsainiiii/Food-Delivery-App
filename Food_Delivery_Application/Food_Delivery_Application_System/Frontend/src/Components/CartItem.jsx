import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom'
const CartItem = ({ item, onUpdate, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const food = item.foodItemId || {};
    console.log("food>>>>>>", food)
    const imageUrl =
        (food.images?.[0]?.imageUrl || food.images?.[0] || food.image?.[0] || food.image) ??
        'https://via.placeholder.com/100';

    const handleQuantityChange = (delta) => {
        const newQty = quantity + delta;

        if (newQty <= 0) {
            onRemove(item._id);
        } else {
            setQuantity(newQty);
            onUpdate(item.foodItemId._id, newQty);
        }
    };

    return (
        <div className="flex items-start bg-white rounded-lg shadow p-3 gap-5 hover:shadow-md transition h-36">
            {/* Image Thumbnail */}
            {/* <Link } className="shrink-0"></Link > */}
            {/* Image Thumbnail */}
            <Link to={`/food/${food._id || food.id}`} className="shrink-0">
                <img
                    src={imageUrl}
                    alt={food.foodName || 'Food'}
                    className="w-20 h-20 object-cover rounded-md mt-1"
                />
            </Link>
            {/* Content */}
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <Link to={`/food/${food._id || food.id}`} className="shrink-0">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                {food.foodName || 'Food Name'}
                            </h3>
                            <p className="text-xs text-gray-500">{food.category || 'Cuisine'}</p>
                        </div>
                    </Link>
                    <span className="flex items-center text-xs text-yellow-600">
                        <Star size={12} fill="orange" className="mr-1" />
                        {food.rating || '4.5'}
                    </span>

                </div>

                <div className="flex items-center text-sm mt-1 gap-2">
                    <span className="text-orange-600 font-semibold">₹{food.price || '0'}</span>
                    <span className="line-through text-gray-400 text-xs">₹{(food.price || 0) + 5}</span>
                </div>
                {/* Quantity & Remove */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded bg-gray-100 overflow-hidden">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="px-2 text-gray-600 hover:text-orange-600"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="px-2 text-gray-600 hover:text-orange-600"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item._id)}
                        className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                        <Trash2 size={14} className="inline mr-1" />
                        Remove
                    </button>
                </div>

            </div>
        </div >
    );
};

export default CartItem;


// import React, { useEffect, useState } from 'react';
// import { Minus, Plus, Trash2, Star } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const CartItem = ({ item, onUpdate, onRemove }) => {
//     const [quantity, setQuantity] = useState(item.quantity);

//     useEffect(() => {
//         setQuantity(item.quantity);
//     }, [item.quantity]);

//     const food = item.foodItemId || {};
//     const imageUrl =
//         (food.images?.[0]?.imageUrl || food.images?.[0] || food.image?.[0] || food.image) ??
//         'https://via.placeholder.com/100';

//     const handleQuantityChange = (delta) => {
//         const newQty = quantity + delta;
//         if (newQty <= 0) {
//             onRemove(item._id);
//         } else {
//             setQuantity(newQty);
//             onUpdate(item.foodItemId._id, newQty);
//         }
//     };

//     return (
//         <div className="flex items-start bg-white rounded-md shadow p-3 gap-4 hover:shadow-md transition h-28">
//             <Link to={`/food/${food._id || food.id}`} className="shrink-0">
//                 <img
//                     src={imageUrl}
//                     alt={food.foodName || 'Food'}
//                     className="w-16 h-16 object-cover rounded-md"
//                 />
//             </Link>

//             <div className="flex-1 flex flex-col justify-between">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h3 className="text-xs font-semibold text-gray-800">
//                             {food.foodName || 'Food Name'}
//                         </h3>
//                         <p className="text-[10px] text-gray-500">{food.category || 'Cuisine'}</p>
//                     </div>
//                     <span className="flex items-center text-[10px] text-yellow-600">
//                         <Star size={12} fill="orange" className="mr-1" />
//                         {food.rating || '4.5'}
//                     </span>
//                 </div>

//                 <div className="flex items-center text-sm gap-2">
//                     <span className="text-sm font-semibold text-orange-600">₹{food.price || '0'}</span>
//                     <span className="line-through text-[10px] text-gray-400">₹{(food.price || 0) + 5}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center border rounded bg-gray-100 overflow-hidden">
//                         <button
//                             onClick={() => handleQuantityChange(-1)}
//                             className="px-2 text-gray-600 hover:text-orange-600"
//                         >
//                             <Minus size={12} />
//                         </button>
//                         <span className="px-2 text-xs font-medium">{quantity}</span>
//                         <button
//                             onClick={() => handleQuantityChange(1)}
//                             className="px-2 text-gray-600 hover:text-orange-600"
//                         >
//                             <Plus size={12} />
//                         </button>
//                     </div>

//                     <button
//                         onClick={() => onRemove(item._id)}
//                         className="text-xs text-red-500 hover:underline"
//                     >
//                         <Trash2 size={12} className="inline mr-1" />
//                         Remove
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartItem;
