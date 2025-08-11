import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantSidebar from "./RestaurantSidebar";
import { FiUploadCloud, FiXCircle, FiUser, FiEdit, FiEdit3 } from "react-icons/fi";

const RestaurantUpdate = () => {
    const [formData, setFormData] = useState({
        restaurantName: "",
        name: "",
        phone: "",
        email: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
        gstnumber: "",
        cuisineType: "",
        openingHours: {
            open: "",
            close: "",
        },
    });

    const [ownerImage, setOwnerImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const navigate = useNavigate();

    const fileInputRef = useRef();
    const { id: restaurantId } = useParams();

    // Fetch on mount
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    toast.error("Not authorized");
                    return;
                }

                const res = await axios.get(
                    `http://localhost:8080/Restaurant/restaurantdetails/${restaurantId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const data = res.data.restaurant || res.data; // adjust to your API shape

                setFormData({
                    restaurantName: data.restaurantName || "",
                    name: data.name || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    address: data.address || { street: "", city: "", state: "", zip: "" },
                    gstnumber: data.gstnumber || "",
                    cuisineType: data.cuisineType || "",
                    openingHours: data.openingHours || { open: "", close: "" },
                });

                if (data.ownerImage) {
                    setImgPreview(data.ownerImage);
                }
            } catch (error) {
                toast.error("Failed to load restaurant data");
                console.error(error);
            }
        };

        fetchRestaurantData();
    }, [restaurantId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else if (name.includes("openingHours.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                openingHours: { ...prev.openingHours, [key]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOwnerImage(file);
            setImgPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setOwnerImage(null);
        setImgPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken");
            const data = new FormData();
            data.append("data", JSON.stringify(formData));
            if (ownerImage) {
                data.append("ownerImage", ownerImage);
            }

            const response = await axios.put(
                `http://localhost:8080/Restaurant/restaurantupdate/${restaurantId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Restaurant updated successfully");
            navigate('/restaurant/dashboard')

            // ------------- Update localStorage user image here -------------
            const updatedOwnerImageUrl = response.data?.restaurant?.ownerImage;
            if (updatedOwnerImageUrl) {
                let user = JSON.parse(localStorage.getItem("user")) || {};
                user.image = updatedOwnerImageUrl;
                localStorage.setItem("user", JSON.stringify(user));

                // Dispatch custom event to notify other components
                window.dispatchEvent(new Event("profileUpdated"));
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff5e6] to-[#f0f5f9] flex mt-10">
            {/* Sidebar */}
            <aside className="w-64 fixed top-0 left-0 h-screen z-10 bg-[#1e1e2f] shadow-lg">
                <RestaurantSidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-10 overflow-auto">
                <div className="max-w-4xl mx-auto shadow-sm shadow-gray-400 p-10">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <FiEdit3 className="text-3xl" />
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Update Restaurant Info
                        </h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        encType="multipart/form-data"
                    >
                        {/* All inputs */}
                        <input
                            type="text"
                            name="restaurantName"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            placeholder="Restaurant Name"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Owner Name"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            placeholder="Street"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="address.zip"
                            value={formData.address.zip}
                            onChange={handleChange}
                            placeholder="ZIP"
                            required
                            className="border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="gstnumber"
                            value={formData.gstnumber}
                            onChange={handleChange}
                            placeholder="GST Number"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="cuisineType"
                            value={formData.cuisineType}
                            onChange={handleChange}
                            placeholder="Cuisine Type"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="openingHours.open"
                            value={formData.openingHours.open}
                            onChange={handleChange}
                            placeholder="Opening Time"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="openingHours.close"
                            value={formData.openingHours.close}
                            onChange={handleChange}
                            placeholder="Closing Time"
                            className="border p-2 rounded"
                        />

                        {/* Modern Image Upload */}
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium text-gray-700">Owner Image</label>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative w-36 h-36 flex items-center justify-center bg-gray-100 shadow-sm rounded-xl">
                                    {imgPreview ? (
                                        <>
                                            <img
                                                src={imgPreview}
                                                alt="Owner"
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 bg-white rounded-full p-1.5 text-red-500 hover:bg-red-500 hover:text-white shadow transition"
                                            >
                                                <FiXCircle size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <FiUser className="w-16 h-16 text-gray-300" />
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current && fileInputRef.current.click()
                                        }
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition font-semibold text-indigo-700 shadow border border-indigo-100"
                                    >
                                        <FiUploadCloud size={20} />
                                        {imgPreview ? "Change Image" : "Upload Image"}
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <p className="text-xs text-gray-400 mt-2">
                                        Accepted: .jpg, .png | Max size: 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RestaurantUpdate;