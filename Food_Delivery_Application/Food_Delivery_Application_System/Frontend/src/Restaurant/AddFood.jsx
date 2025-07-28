import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialForm = {
    foodName: "",
    type: "",
    price: "",
    description: "",
    category: "",
    isAvailable: true,
    images: [],
};

const AddFoodItem = () => {
    const [form, setForm] = useState(initialForm);
    const [imgPreview, setImgPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            setForm({ ...form, [e.target.name]: e.target.checked });
        } else if (e.target.type === "file") {
            if (e.target.files.length > 0) {
                const filesArr = Array.from(e.target.files);
                setForm({ ...form, images: filesArr });
                setImgPreview(filesArr.map(file => URL.createObjectURL(file)));
            } else {
                setForm({ ...form, images: [] });
                setImgPreview([]);
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");
        console.log('tokennnnnnnnnnnnn', token)
        if (!token) {
            toast.error("You are not logged in");
            return;
        }


        if (!form.foodName || !form.type || !form.price || !form.description) {
            toast.error("Please fill all required fields");
            return;
        }
        if (form.images.length === 0) {
            toast.error("Image required");
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append("foodName", form.foodName);
        data.append("type", form.type);
        data.append("price", form.price);
        data.append("description", form.description);
        data.append("isAvailable", form.isAvailable);
        data.append("category", form.category || "");

        form.images.forEach(img => data.append("images", img));
        try {
            await axios.post("http://localhost:8080/food-items/addfood", data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            toast.success("Food item added!");
            setForm(initialForm);
            setImgPreview([]);
            console.log('food items', data)
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add food item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center py-10 min-h-screen bg-blue-100">
            <form
                onSubmit={handleSubmit}
                className="border shadow bg-white rounded-2xl p-8 w-full max-w-lg"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Add Food Item</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Food Name *</label>
                    <input
                        name="foodName"
                        required
                        className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300 bg-white"
                        value={form.foodName}
                        onChange={handleChange}
                        placeholder="E.g. Paneer Pizza"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Type *</label>
                    <input
                        name="type"
                        required
                        className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300 bg-white"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="Veg | Non-Veg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Price *</label>
                    <input
                        name="price"
                        type="number"
                        required
                        min={1}
                        className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300 bg-white"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="250"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Description *</label>
                    <input
                        name="description"
                        required
                        className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300 bg-white"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Cheesy and spicy..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Category</label>
                    <input
                        name="category"
                        className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-300 bg-white"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Pizza, Main Course"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        id="isAvailable"
                        name="isAvailable"
                        type="checkbox"
                        checked={form.isAvailable}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 accent-blue-500"
                    />
                    <label htmlFor="isAvailable" className="ml-2 font-medium">Available</label>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Image *</label>
                    <input
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="block w-full"
                    />
                    <div className="flex gap-2 mt-2">
                        {imgPreview.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt="preview"
                                className="w-20 h-20 rounded-lg border object-cover"
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 mt-4 font-bold rounded-xl 
            bg-blue-500 hover:bg-blue-600 text-white shadow-lg disabled:opacity-50 transition"
                >
                    {loading ? "Adding..." : "Add Food Item"}
                </button>
            </form>
        </div>
    );
};

export default AddFoodItem;
