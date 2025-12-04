import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/db.png';

const SignupDeliveryBoy = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        latitude: '',
        longitude: ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setForm((prev) => ({
                        ...prev,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }));
                },
                (err) => {
                    console.error("Location error:", err);
                    toast.error("Unable to get location. Please allow location access.");
                }
            );
        } else {
            toast.error("Geolocation is not supported by your browser.");
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!form.latitude || !form.longitude) {
            toast.error("Location not captured. Please enable GPS and try again.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/Delivery-Boy/deliveryboysignup', form);

            if (res.status === 201 || res.status === 202) {
                toast.success('Signup successful! Please login.');
                setTimeout(() => navigate('/login'), 1200);
            } else {
                toast.error(res.data.message || 'Signup failed!');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Network error!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-3 py-12 overflow-hidden">
            
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[0.3px]"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="absolute inset-0 bg-black/35"></div>

            <div className="relative z-10 w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-xs border border-black/20">
                <h1 className="text-2xl font-bold text-center text-white/90 mb-6 tracking-wider">
                    Signup as Delivery Boy
                </h1>

                <form className="space-y-2" onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>

                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>

                    <div className="relative mb-4">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>

                    <div className="relative mb-8">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-200 cursor-pointer"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <a href="/login" className="text-sm text-white/80 hover:underline">
                        Already have an account?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupDeliveryBoy;
