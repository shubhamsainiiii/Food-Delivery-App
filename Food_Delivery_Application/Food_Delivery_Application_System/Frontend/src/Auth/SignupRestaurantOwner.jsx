import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaUtensils, FaAddressBook,
    FaMapMarkerAlt, FaCity, FaMapPin, FaHourglassHalf, FaRegClock, FaUserCircle, FaImage, FaTimes
} from 'react-icons/fa';
import { FiUploadCloud } from "react-icons/fi";
import { MdLocationOff } from "react-icons/md";
import bgImage from '../assets/res4.jpg';

const SignupRestaurantOwner = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ownerImage, setOwnerImage] = useState(null);
    const [ownerPreview, setOwnerPreview] = useState(null);
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [restaurantPreviews, setRestaurantPreviews] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationOn, setLocationOn] = useState(false); // toggle state

    const [form, setForm] = useState({
        restaurantName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        gstnumber: '',
        cuisineType: '',
        address: { street: '', city: '', state: '', zip: '' },
        openingHours: { open: '', close: '' }
    });

    const toggleLocation = () => {
        if (locationOn) {
            setLatitude(null);
            setLongitude(null);
            setLocationOn(false);
            toast.info("Location removed.");
        } else {
            if (!navigator.geolocation) {
                toast.error("Geolocation is not supported by your browser.");
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLatitude(pos.coords.latitude);
                    setLongitude(pos.coords.longitude);
                    setLocationOn(true);
                    toast.success("Location captured successfully!");
                },
                (err) => {
                    if (err.code === 1) {
                        toast.warning("Please allow location access to store your restaurant's location.");
                    } else if (err.code === 2) {
                        toast.error("Position unavailable. Turn on GPS or check connection.");
                    } else if (err.code === 3) {
                        toast.error("Location request timed out. Try again.");
                    }
                }
            );
        }
    };

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

    const handleOwnerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOwnerImage(file);
            setOwnerPreview(URL.createObjectURL(file));
        }
    };

    const removeOwnerImage = () => {
        setOwnerImage(null);
        setOwnerPreview(null);
    };

    const handleRestaurantImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedFiles = [...restaurantImages, ...files].slice(0, 3);
        setRestaurantImages(updatedFiles);
        setRestaurantPreviews(updatedFiles.map(file => URL.createObjectURL(file)));
    };

    const removeRestaurantImage = (index) => {
        const updatedFiles = restaurantImages.filter((_, i) => i !== index);
        setRestaurantImages(updatedFiles);
        setRestaurantPreviews(updatedFiles.map(file => URL.createObjectURL(file)));
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

            if (!ownerImage) {
                toast.error("Please upload owner image.");
                setLoading(false);
                return;
            }
            formData.append("ownerImage", ownerImage);

            if (latitude && longitude) {
                formData.append('latitude', latitude);
                formData.append('longitude', longitude);
            }

            if (restaurantImages.length !== 3) {
                toast.error("Please upload exactly 3 restaurant images.");
                setLoading(false);
                return;
            }
            restaurantImages.forEach((img) => {
                formData.append("images", img);
            });

            const res = await axios.post(
                'http://localhost:8080/Restaurant/restaurantsignup',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            if (res.status === 200 || res.status === 201) {
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
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-3 py-5"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="w-full max-w-6xl mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-sm shadow-black/30 backdrop-blur-xs border border-white/50">
                <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
                    Restaurant Signup
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="relative">
                            <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="restaurantName" placeholder="Restaurant Name" value={form.restaurantName} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border-b border-white outline-none text-white placeholder-white" />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="name" placeholder="Owner Name" value={form.name} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border-b border-white outline-none text-white placeholder-white" />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border-b border-white outline-none text-white placeholder-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaUtensils className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="cuisineType" placeholder="Cuisine Type" value={form.cuisineType} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaAddressBook className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="gstnumber" placeholder="GST Number" value={form.gstnumber} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="address.street" placeholder="Street" value={form.address.street} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="address.city" placeholder="City" value={form.address.city} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="address.state" placeholder="State" value={form.address.state} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="text" name="address.zip" placeholder="ZIP" value={form.address.zip} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                        <div className="relative">
                            <FaRegClock className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="time" name="openingHours.open" placeholder="Opening Time" value={form.openingHours.open} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaHourglassHalf className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                            <input type="time" name="openingHours.close" placeholder="Closing Time" value={form.openingHours.close} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-b border-white text-white placeholder-white outline-none" />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='w-1/2'>
                            <label className="text-md font-medium text-white mb-2 flex items-center">
                                <FaUserCircle className="mr-2" /> Upload Owner Image
                            </label>
                            {ownerPreview && (
                                <div className="relative inline-block mb-2">
                                    <img src={ownerPreview} alt="Owner Preview" className="h-32 w-32 object-cover rounded-lg border" />
                                    <button type="button" onClick={removeOwnerImage} className="absolute top-1 right-1 bg-white/30 text-red-500 p-1 rounded-full cursor-pointer">
                                        <FaTimes size={12} />
                                    </button>
                                </div>
                            )}
                            <label htmlFor="owner-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 transition-all duration-300 border-dashed border-gray-300 hover:border-indigo-400 rounded-lg cursor-pointer bg-white/0">
                                <FiUploadCloud size={32} className="text-indigo-400 mb-2" />
                                <span className="text-white text-sm">Click or drag image here</span>
                                <span className="text-white/70 text-xs">JPEG, PNG, GIF allowed</span>
                                <input id="owner-upload" type="file" accept="image/*" className="hidden" onChange={handleOwnerImageChange} />
                            </label>
                        </div>

                        <div className='w-1/2'>
                            <label className="text-md font-medium text-white flex items-center">
                                <FaImage className="mr-2" /> Upload 3 Restaurant Images
                            </label>
                            <div className="flex gap-4 flex-wrap mb-2">
                                {restaurantPreviews.map((src, index) => (
                                    <div key={index} className="relative inline-block">
                                        <img src={src} alt={`Restaurant ${index}`} className="h-32 w-32 object-cover rounded-lg border" />
                                        <button type="button" onClick={() => removeRestaurantImage(index)} className="absolute top-1 right-1 bg-white/30 text-red-500 p-1 rounded-full cursor-pointer">
                                            <FaTimes size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="restaurant-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 transition-all duration-300 border-dashed border-gray-300 hover:border-indigo-400 rounded-lg cursor-pointer bg-white/0">
                                <FiUploadCloud size={32} className="text-indigo-400 mb-2" />
                                <span className="text-white text-sm">Click or drag images here</span>
                                <span className="text-black/70 text-xs">JPEG, PNG, GIF. Multiple allowed</span>
                                <input id="restaurant-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleRestaurantImagesChange} />
                            </label>
                        </div>
                    </div>
                    <div className="mb-6 gap-1">
                        <div
                            className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors border px-1
      ${locationOn ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"}
    `}
                            onClick={toggleLocation}
                            style={{ userSelect: "none" }}
                            title={locationOn ? "Turn OFF Location" : "Turn ON Location"}
                        >
                            <div
                                className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow border transition-transform duration-200
        ${locationOn ? "translate-x-8 border-green-700" : "translate-x-0 border-gray-400"}
      `}
                            >
                                {locationOn ? (
                                    <FaMapMarkerAlt className="text-green-600 text-base" />
                                ) : (

                                    < MdLocationOff className="text-gray-400 text-base" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-64 py-2 mt-6 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-300 cursor-pointer"
                        >
                            {loading ? "Signing up..." : "SIGN UP"}
                        </button>

                    </div>

                </form>

                <div className="flex items-center justify-center">
                    <a href="/login" className="block w-64 py-2.5 mt-4 text-center hover:underline text-white font-semibold tracking-wider">
                        Already have an account? Login
                    </a>
                </div>

            </div>
        </div>
    );
};

export default SignupRestaurantOwner;
