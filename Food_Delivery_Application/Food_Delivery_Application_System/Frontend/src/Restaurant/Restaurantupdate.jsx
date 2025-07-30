import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Restaurantupdate = ({ restaurantId }) => {
    const [formData, setFormData] = useState({
        restaurantName: "",
        name: "",
        phone: "",
        email: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: ""
        },
        gstnumber: "",
        cuisineType: "",
        openingHours: {
            open: "",
            close: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For nested address or openingHours
        if (name.includes("address.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value }
            }));
        } else if (name.includes("openingHours.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                openingHours: { ...prev.openingHours, [key]: value }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken"); // make sure it's stored properly
            const response = await axios.put(`http://localhost:8080/restaurant/restaurantupdate/${restaurantId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            toast.success("Restaurant updated successfully!");
            console.log("Success:", response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
            console.error("Update error:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Restaurant Info</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="restaurantName" placeholder="Restaurant Name" onChange={handleChange} value={formData.restaurantName} className="border p-2 rounded" />
                <input type="text" name="name" placeholder="Owner Name" onChange={handleChange} value={formData.name} className="border p-2 rounded" />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} className="border p-2 rounded" />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} className="border p-2 rounded" />

                <input type="text" name="address.street" placeholder="Street" onChange={handleChange} value={formData.address.street} className="border p-2 rounded" />
                <input type="text" name="address.city" placeholder="City" onChange={handleChange} value={formData.address.city} className="border p-2 rounded" />
                <input type="text" name="address.state" placeholder="State" onChange={handleChange} value={formData.address.state} className="border p-2 rounded" />
                <input type="text" name="address.zip" placeholder="ZIP Code" onChange={handleChange} value={formData.address.zip} className="border p-2 rounded" />

                <input type="text" name="gstnumber" placeholder="GST Number" onChange={handleChange} value={formData.gstnumber} className="border p-2 rounded" />
                <input type="text" name="cuisineType" placeholder="Cuisine Type" onChange={handleChange} value={formData.cuisineType} className="border p-2 rounded" />
                <input type="text" name="openingHours.open" placeholder="Opening Time" onChange={handleChange} value={formData.openingHours.open} className="border p-2 rounded" />
                <input type="text" name="openingHours.close" placeholder="Closing Time" onChange={handleChange} value={formData.openingHours.close} className="border p-2 rounded" />

                <div className="md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Restaurantupdate;
