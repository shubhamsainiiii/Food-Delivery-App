import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupRestaurantOwner = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const [form, setForm] = useState({
        restaurantName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        gstnumber: '',
        cuisineType: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        openingHours: {
            open: '',
            close: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const key = name.split('.')[1];
            setForm(prev => ({
                ...prev,
                address: { ...prev.address, [key]: value }
            }));
        } else if (name.includes("openingHours.")) {
            const key = name.split('.')[1];
            setForm(prev => ({
                ...prev,
                openingHours: { ...prev.openingHours, [key]: value }
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append('restaurantName', form.restaurantName);
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('password', form.password);
            formData.append('gstnumber', form.gstnumber);
            formData.append('cuisineType', form.cuisineType);
            formData.append('openingHours', JSON.stringify(form.openingHours));
            formData.append('address', JSON.stringify(form.address));

            if (images.length !== 3) {
                toast.error("Please upload exactly 3 images.");
                setLoading(false);
                return;
            }

            images.forEach((img) => {
                formData.append("images", img);
            });

            const res = await axios.post('http://localhost:8080/Restaurant/restaurantsignup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 201 || res.status === 200) {
                toast.success('Signup successful! Please wait for admin approval.');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                toast.error(res.data.message || 'Signup failed');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Signup failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Restaurant Signup</h2>

                <input className="input" type="text" name="restaurantName" placeholder="Restaurant Name" value={form.restaurantName} onChange={handleChange} required />
                <input className="input" type="text" name="name" placeholder="Owner Name" value={form.name} onChange={handleChange} required />
                <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input className="input" type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <input className="input" type="text" name="gstnumber" placeholder="GST Number" value={form.gstnumber} onChange={handleChange} />
                <input className="input" type="text" name="cuisineType" placeholder="Cuisine Type" value={form.cuisineType} onChange={handleChange} />

                {/* Address */}
                <div className="grid grid-cols-2 gap-2">
                    <input className="input" type="text" name="address.street" placeholder="Street" value={form.address.street} onChange={handleChange} />
                    <input className="input" type="text" name="address.city" placeholder="City" value={form.address.city} onChange={handleChange} />
                    <input className="input" type="text" name="address.state" placeholder="State" value={form.address.state} onChange={handleChange} />
                    <input className="input" type="text" name="address.zip" placeholder="ZIP Code" value={form.address.zip} onChange={handleChange} />
                </div>

                {/* Opening Hours */}
                <div className="grid grid-cols-2 gap-2">
                    <input className="input" type="text" name="openingHours.open" placeholder="Opening Time (e.g. 9:00 AM)" value={form.openingHours.open} onChange={handleChange} />
                    <input className="input" type="text" name="openingHours.close" placeholder="Closing Time (e.g. 10:00 PM)" value={form.openingHours.close} onChange={handleChange} />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm mb-1">Upload 3 Restaurant Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                        className="input bg-white/10 text-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignupRestaurantOwner;
