import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            console.error('Failed to fetch dish', err);
        }
    };

    useEffect(() => {
        if (id) fetchDish();
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
                    category: form.category
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (updateRes.status === 200) {
                alert('Dish updated successfully!');
                navigate('/dashboard'); // Change path as needed
            }
        } catch (err) {
            console.error('Error updating dish:', err.response?.data || err.message);
            alert('Failed to update dish');
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Dish</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={form.foodName}
                    onChange={(e) => setForm({ ...form, foodName: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <select
                    value={form.isAvailable}
                    onChange={(e) => setForm({ ...form, isAvailable: e.target.value === 'true' })}
                    className="w-full p-2 border rounded"
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2 border rounded"
                />

                {form.images.length > 0 && (
                    <div className="space-y-2">
                        <label className="block font-medium">Images:</label>
                        {form.images.map((img, index) => (
                            <img key={index} src={img.imageUrl} alt="Dish" className="w-24 h-24 object-cover rounded" />
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update Dish
                </button>
            </form>
        </div>
    );
};

export default EditDishes;
