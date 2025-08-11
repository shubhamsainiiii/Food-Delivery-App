import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaUtensils, FaAddressBook,
    FaMapMarkerAlt, FaCity, FaMapPin, FaHourglassHalf, FaRegClock, FaImage, FaUserCircle
} from 'react-icons/fa';

const SignupRestaurantOwner = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [ownerImage, setOwnerImage] = useState(null); // ✅ New state for owner image

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

            // ✅ Owner image validation
            if (!ownerImage) {
                toast.error("Please upload owner image.");
                setLoading(false);
                return;
            }
            formData.append("ownerImage", ownerImage);

            // ✅ Restaurant images validation
            if (images.length !== 3) {
                toast.error("Please upload exactly 3 restaurant images.");
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3 py-12">
            <div className="w-full max-w-lg mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30 relative" style={{ boxShadow: '0 8px 60px 8px rgba(60,24,110,0.4)' }}>
                <h2 className="text-3xl font-extrabold text-center text-white mb-6" style={{ letterSpacing: "1px" }}>Restaurant Signup</h2>

                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* Restaurant Name */}
                    <div className="relative mb-4">
                        <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="text" name="restaurantName" placeholder="Restaurant Name" value={form.restaurantName} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Owner Name */}
                    <div className="relative mb-4">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="text" name="name" placeholder="Owner Name" value={form.name} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Email */}
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Phone */}
                    <div className="relative mb-4">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Password */}
                    <div className="relative mb-4">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Cuisine Type */}
                    <div className="relative mb-4">
                        <FaUtensils className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="text" name="cuisineType" placeholder="Cuisine Type" value={form.cuisineType} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* GST Number */}
                    <div className="relative mb-4">
                        <FaAddressBook className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input type="text" name="gstnumber" placeholder="GST Number" value={form.gstnumber} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                    </div>

                    {/* Address */}
                    <h3 className="text-lg font-semibold text-white/80 mt-6 mb-2">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <div className="relative mb-4">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="address.street" placeholder="Street" value={form.address.street} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                        <div className="relative mb-4">
                            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="address.city" placeholder="City" value={form.address.city} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                        <div className="relative mb-4">
                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="address.state" placeholder="State" value={form.address.state} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                        <div className="relative mb-4">
                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="address.zip" placeholder="ZIP Code" value={form.address.zip} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <h3 className="text-lg font-semibold text-white/80 mt-6 mb-2">Opening Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <div className="relative mb-4">
                            <FaRegClock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="openingHours.open" placeholder="Opening Time (e.g. 9:00 AM)" value={form.openingHours.open} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                        <div className="relative mb-4">
                            <FaHourglassHalf className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input type="text" name="openingHours.close" placeholder="Closing Time (e.g. 10:00 PM)" value={form.openingHours.close} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60" />
                        </div>
                    </div>

                    {/* Owner Image Upload */}
                    <div className="pt-4 pb-2">
                        <label className="text-sm font-medium text-white/80 mb-2 flex items-center">
                            <FaUserCircle className="mr-2" size={18} /> Upload Owner Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setOwnerImage(e.target.files[0])}
                            className="w-full p-3 rounded-md bg-white/10 text-white file:bg-gradient-to-r file:from-[#6055dd] file:via-[#a366d9] file:to-[#9f3e71] file:text-white cursor-pointer"
                            required
                        />
                    </div>

                    {/* Restaurant Images */}
                    <div className="pt-4 pb-2">
                        <label className="text-sm font-medium text-white/80 mb-2 flex items-center">
                            <FaImage className="mr-2" size={18} /> Upload 3 Restaurant Images
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages([...e.target.files])}
                            className="w-full p-3 rounded-md bg-white/10 text-white file:bg-gradient-to-r file:from-[#6055dd] file:via-[#a366d9] file:to-[#9f3e71] file:text-white cursor-pointer"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 !mt-6 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-300"
                    >
                        {loading ? "Signing up..." : "SIGN UP"}
                    </button>
                </form>

                <div className="mt-8">
                    <a href="/login" className="block w-full py-2.5 text-center rounded-lg text-white/75 font-semibold tracking-wider bg-white/10 hover:bg-white/20">
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupRestaurantOwner;
