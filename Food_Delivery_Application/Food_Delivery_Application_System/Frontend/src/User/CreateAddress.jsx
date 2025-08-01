import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAddress = ({ userId }) => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        landmark: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        addressType: "Home",
        isDefault: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken");
            console.log('token', token)
            const res = await axios.post(
                "http://localhost:8080/User/createaddress",
                {
                    ...form,
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(res.data.message || "Address created successfully!");
            setForm({
                name: "",
                phone: "",
                landmark: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                addressType: "Home",
                isDefault: false,
            });
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to create address. Try again."
            );
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Create Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={form.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={form.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <select
                    name="addressType"
                    value={form.addressType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </select>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                    <label htmlFor="isDefault">Set as Default</label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
                >
                    Save Address
                </button>
            </form>
        </div>
    );
};

export default CreateAddress;

