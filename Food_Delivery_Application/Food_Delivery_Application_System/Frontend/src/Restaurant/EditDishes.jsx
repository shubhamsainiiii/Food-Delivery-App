import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantSidebar from './RestaurantSidebar';
import { FiEdit3 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EditDishes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        foodName: '',
        type: '',
        price: '',
        description: '',
        isAvailable: true,
        category: '',
        images: [],
    });

    const fetchDish = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const res = await axios.get(`http://localhost:8080/food-items/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const dish = res.data.food;
            setForm({
                foodName: dish.foodName || '',
                type: dish.type || '',
                price: dish.price || '',
                description: dish.description || '',
                isAvailable: dish.isAvailable || false,
                category: dish.category || '',
                images: dish.images || [],
            });
        } catch (err) {
            toast.error('Failed to fetch dish');
            console.error('Failed to fetch dish', err);
        }
    };

    useEffect(() => {
        if (id) fetchDish();
        // eslint-disable-next-line
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            const updateRes = await axios.put(
                `http://localhost:8080/food-items/update/${id}`,
                {
                    foodName: form.foodName,
                    type: form.type,
                    price: form.price,
                    description: form.description,
                    isAvailable: form.isAvailable,
                    category: form.category,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (updateRes.status === 200) {
                toast.success('Dish updated successfully!');
                navigate('/restaurant/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update dish');
            console.error('Error updating dish:', err.response?.data || err.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <div className="w-64 fixed top-0 left-0 h-screen border-r shadow-md bg-white">
                <RestaurantSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto p-8 mt-18 shadow-sm shadow-gray-500">
                    <div className="flex items-center gap-3 mb-8">
                        <FiEdit3 className="text-3xl" />
                        <h2 className="text-2xl font-bold text-gray-800">Edit Dish</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Food Name */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-700">Food Name</label>
                            <input
                                type="text"
                                value={form.foodName}
                                onChange={(e) => setForm({ ...form, foodName: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-none outline-none"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-700">Type</label>
                            <input
                                type="text"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-none  outline-none"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-700">Price</label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-none  outline-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-700">Category</label>
                            <input
                                type="text"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-none  outline-none"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-700">Availability</label>
                            <select
                                value={form.isAvailable}
                                onChange={(e) => setForm({ ...form, isAvailable: e.target.value === 'true' })}
                                className="w-full p-3 border rounded-lg focus:ring-none  outline-none"
                            >
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-1 text-gray-700">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-none  outline-none h-28 resize-none"
                            />
                        </div>

                        {/* Images */}
                        {form.images.length > 0 && (
                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-2 text-gray-700">Images</label>
                                <div className="flex gap-4 flex-wrap">
                                    {form.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.imageUrl}
                                            alt="Dish"
                                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                            >
                                Update Dish
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditDishes;
