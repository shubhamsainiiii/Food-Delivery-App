import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, Star } from 'lucide-react';

const CartItem = ({ item, onUpdate, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const food = item.foodItemId || {};
    const imageUrl =
        (food.images?.[0]?.imageUrl || food.images?.[0] || food.image?.[0] || food.image) ??
        'https://via.placeholder.com/200';

    const handleQuantityChange = (delta) => {
        const newQty = quantity + delta;

        if (newQty <= 0) {
            onRemove(item._id); // remove item if qty is zero
        } else {
            setQuantity(newQty);
            onUpdate(item.foodItemId._id, newQty);
        }
    };


    return (
        <div className="bg-white rounded-xl shadow-sm shadow-gray-400 transition-all overflow-hidden">
            <img
                src={imageUrl}
                alt={food.foodName || 'Food'}
                className="w-full h-55 object-cover hover:scale-105 transition-all duration-500"
            />

            <div className="p-4 flex flex-col gap-2">
                <p className="text-sm text-gray-500">{food.category || 'Cuisine'}</p>

                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {food.foodName || 'Food Name'}
                </h3>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-orange-600 font-semibold">₹{food.price || '0'}</span>
                    <span className="line-through text-gray-400 text-sm">₹{(food.price || 0) + 5}</span>
                    <span className="flex items-center text-sm text-yellow-600 ml-auto">
                        <Star size={14} fill="orange" className="mr-1" />
                        {food.rating || '4.5'}
                    </span>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-md bg-gray-100 overflow-hidden">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="px-3 py-1 text-gray-600 hover:text-orange-600"
                        >
                            <Minus size={14} className='cursor-pointer' />
                        </button>
                        <span className="px-4 py-1 font-medium text-sm">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="px-3 py-1 text-gray-600 hover:text-orange-600"
                        >
                            <Plus size={14} className='cursor-pointer' />
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item._id)}
                        className="ml-2 px-4 py-1 text-sm text-orange-500 border border-orange-400 rounded-full hover:bg-orange-50 transition-all duration-300 cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
