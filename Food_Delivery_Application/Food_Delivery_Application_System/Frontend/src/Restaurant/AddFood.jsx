import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RestaurantSidebar from "./RestaurantSidebar";
import { FiUploadCloud, FiX } from "react-icons/fi"; // ✅ React Icons

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
                setImgPreview(filesArr.map((file) => URL.createObjectURL(file)));
            } else {
                setForm({ ...form, images: [] });
                setImgPreview([]);
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...form.images];
        updatedImages.splice(index, 1);
        URL.revokeObjectURL(imgPreview[index]);
        const updatedPreviews = [...imgPreview];
        updatedPreviews.splice(index, 1);
        setForm({ ...form, images: updatedImages });
        setImgPreview(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");
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
        form.images.forEach((img) => data.append("images", img));

        try {
            await axios.post("http://localhost:8080/food-items/addfood", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Food item added!");
            setForm(initialForm);
            setImgPreview([]);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add food item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-[16rem_1fr] min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <div className="w-64 min-h-screen">
                <RestaurantSidebar />
            </div>

            {/* Form container */}
            <div className="flex justify-center py-12 px-8 mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="p-8 w-full max-w-4xl shadow-sm shadow-gray-400"
                    encType="multipart/form-data"
                >
                    <h2 className="text-2xl font-bold text-center mb-3">Add Food Item</h2>

                    <div className="grid grid-cols-3 gap-6">
                        {/* ------------ Inputs ------------ */}
                        <div>
                            <label className="block mb-1 font-medium">Food Name *</label>
                            <input
                                name="foodName"
                                required
                                className="border px-3 py-2 w-full rounded-lg outline-none focus:ring-none placeholder:text-gray-400"
                                value={form.foodName}
                                onChange={handleChange}
                                placeholder="E.g. Paneer Pizza"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Type *</label>
                            <input
                                name="type"
                                required
                                className="border px-3 py-2 w-full rounded-lg outline-none focus:ring-none placeholder:text-gray-400"
                                value={form.type}
                                onChange={handleChange}
                                placeholder="Veg | Non-Veg"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Price *</label>
                            <input
                                name="price"
                                type="number"
                                required
                                min={1}
                                className="border px-3 py-2 w-full rounded-lg outline-none focus:ring-none placeholder:text-gray-400"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="250"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Category *</label>
                            <input
                                name="category"
                                className="border px-3 py-2 w-full rounded-lg outline-none focus:ring-none placeholder:text-gray-400"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Pizza, Main Course"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Description *</label>
                            <input
                                name="description"
                                required
                                className="border px-3 py-2 w-full rounded-lg outline-none focus:ring-none placeholder:text-gray-400"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Cheesy and spicy..."
                            />
                        </div>

                        <div className="flex items-center col-span-3">
                            <input
                                id="isAvailable"
                                name="isAvailable"
                                type="checkbox"
                                checked={form.isAvailable}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 accent-blue-500 cursor-pointer"
                            />
                            <label htmlFor="isAvailable" className="ml-2 font-medium cursor-pointer">
                                Available
                            </label>
                        </div>

                        {/* ------------ Image Upload ------------ */}
                        <div className="col-span-3">
                            <label className="block mb-2 font-semibold text-gray-800">
                                Upload Images *
                            </label>
                            <label
                                htmlFor="fileInput"
                                className="flex flex-col items-center justify-center w-full p-5 border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-white transition-all duration-300"
                            >
                                <FiUploadCloud className="h-8 w-8 text-indigo-400" />
                                <p className="text-gray-600 font-medium">Click or drag images here</p>
                                <p className="text-xs text-gray-400">
                                    JPEG, PNG, GIF. Multiple files allowed.
                                </p>
                                <input
                                    id="fileInput"
                                    name="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>

                            {imgPreview.length > 0 && (
                                <div className="flex gap-4 mt-4 flex-wrap">
                                    {imgPreview.map((src, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group rounded-xl overflow-hidden"
                                        >
                                            <img src={src} alt="preview" className="w-18 h-18 object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-1 right-1 bg-white/80 text-red-500 rounded-full w-4 h-4 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                                            >
                                                <FiX size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-44 text-center py-3 mt-6 font-bold rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg disabled:opacity-50 transition-all duration-300 cursor-pointer"
                        >
                            {loading ? "Adding..." : "Add Food Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default AddFoodItem;
