import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Plus, Minus, Trash } from 'lucide-react';
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook } from 'react-icons/fa';

const FoodDetail = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    const token = localStorage.getItem("userToken") || "";

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/food-items/${id}`);
                setFood(res.data.food);
                if (res.data.food?.images?.length > 0) {
                    setSelectedImage(res.data.food.images[0].imageUrl);
                }
            } catch (err) {
                console.error('Error fetching food item', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Cart/getcart", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const cartItem = res.data.find(item => item.foodItemId._id === id);
                if (cartItem) {
                    setCartQuantity(cartItem.quantity);
                    setQuantity(cartItem.quantity);
                    setAddedToCart(true);
                }
            } catch (err) {
                console.error("Cart fetch error", err);
            }
        };

        fetchFood();
        fetchCart();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await axios.post(
                "http://localhost:8080/Cart/createcart",
                { foodItemId: food._id, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAddedToCart(true);
            setCartQuantity(quantity);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Add to cart error", error);
            alert("Failed to add to cart.");
        }
    };

    const updateCart = async (newQty) => {
        try {
            await axios.put(
                "http://localhost:8080/Cart/updatecart",
                { foodItemId: food._id, quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuantity(newQty);
            setCartQuantity(newQty);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            console.error("Update cart error", err);
        }
    };

    const removeFromCart = async () => {
        try {
            await axios.put(
                "http://localhost:8080/Cart/updatecart",
                { foodItemId: food._id, quantity: 0 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAddedToCart(false);
            setCartQuantity(0);
            setQuantity(1);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            console.error("Remove from cart error", err);
        }
    };

    const increaseQty = () => updateCart(quantity + 1);
    const decreaseQty = () => {
        if (quantity > 1) {
            updateCart(quantity - 1);
        } else {
            removeFromCart();
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!food) return <p className="text-center mt-10 text-red-500">Food not found</p>;

    const {
        foodName,
        type,
        price,
        description,
        isAvailable,
        category,
        images,
        restaurant
    } = food;

    return (
        <div className='bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]'>
            <div className="max-w-6xl mx-auto px-2 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-18 overflow-hidden ">
                {/* <h2 className="text-2xl font-bold text-orange-600 text-center mb-10">🍽️ Discover Deliciousness!</h2> */}

                {/* Left: Images */}
                <div>
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <img
                            src={selectedImage || 'https://via.placeholder.com/400'}
                            alt="Food"
                            className="w-full h-[390px] object-cover transition duration-300"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-start gap-4 mt-4">
                        {images?.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(img.imageUrl)}
                                className={`w-20 h-20 rounded-md border-0 overflow-hidden flex-shrink-0 focus:outline-none transition-transform ${selectedImage === img.imageUrl
                                    ? "scale-105"
                                    : ""
                                    }`}
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={`thumb-${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Right: Food Details */}
                <div className="flex flex-col justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{foodName}</h1>
                        <p className="text-sm text-gray-500 mb-1">Category: {category}</p>
                        <p className="text-sm text-gray-500 mb-1">Type: {type}</p>
                        <p className="text-sm text-gray-500 mb-1">
                            Availability:{' '}
                            <span className={isAvailable ? 'text-green-600 font-semibold' : 'text-red-500'}>
                                {isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                        </p>

                        <div className="mt-4 flex items-center gap-4">
                            <p className="text-3xl font-bold text-orange-600">₹{price}</p>
                            <p className="text-sm text-gray-400 line-through">₹{price + 5}</p>
                        </div>

                        <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
                    </div>

                    {/* Quantity + Cart Actions */}
                    {isAvailable && (
                        <div className="flex items-center gap-4 mt-6">
                            {addedToCart ? (
                                <>
                                    <div className="flex items-center border rounded-md bg-gray-100 overflow-hidden">
                                        <button onClick={decreaseQty} className="px-3 py-2 hover:bg-gray-200">
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-4 py-2 font-medium">{quantity}</span>
                                        <button onClick={increaseQty} className="px-3 py-2 hover:bg-gray-200">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={removeFromCart}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                                    >
                                        <Trash size={16} /> Remove
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                                >
                                    <Plus size={18} /> Add to Cart
                                </button>
                            )}
                        </div>
                    )}

                    {/* Restaurant Info */}
                    <div className="mt-10 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">

                            Served by <span className="text-orange-600">{restaurant?.restaurantName}</span></h2>

                        <p className="flex items-center text-sm text-gray-700">
                            <MdEmail className="mr-2 text-orange-500" /> {restaurant?.email}
                        </p>

                        <p className="flex items-center text-sm text-gray-700">
                            <MdPhone className="mr-2 text-orange-500" /> {restaurant?.phone}
                        </p>

                        <p className="flex items-center text-sm text-gray-700">
                            <MdLocationOn className="mr-2 text-orange-500" />
                            {restaurant?.address?.street}, {restaurant?.address?.city}
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
