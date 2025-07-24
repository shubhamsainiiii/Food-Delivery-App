import React, { useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaPhone, FaLock, FaStore } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupRestaurantOwner = () => {
    const [form, setForm] = useState({
        restaurantName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8080/Restaurant/restaurantsignup', form);

            if (res.status === 201 || res.status === 202) {
                toast.success('Signup successful! Please login.');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                toast.error((res.data && res.data.message) || 'Signup failed!');
            }
        } catch (error) {
            // Axios error structure: error.response.data.message
            if (error.response) {
                toast.error(error.response.data.message || 'Signup failed!');
            } else {
                toast.error('Network error!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3">
            <div className="w-full max-w-md mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30">
                <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wider">
                    Signup as Restaurant Owner
                </h1>
                <form className="space-y-2" onSubmit={handleSubmit} autoComplete="off">
                    {/* Restaurant Name */}
                    <div className="relative mb-4">
                        <FaStore className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="restaurantName"
                            placeholder="Restaurant Name"
                            value={form.restaurantName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 placeholder-white/60 outline-none text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-0 border-t border-white/20"></div>
                    </div>
                    {/* Owner Name */}
                    <div className="relative mb-4">
                        <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Owner Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 placeholder-white/60 outline-none text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-0 border-t border-white/20"></div>
                    </div>
                    {/* Email */}
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 placeholder-white/60 outline-none text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-0 border-t border-white/20"></div>
                    </div>
                    {/* Phone */}
                    <div className="relative mb-4">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 placeholder-white/60 outline-none text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-0 border-t border-white/20"></div>
                    </div>
                    {/* Password */}
                    <div className="relative mb-6">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 placeholder-white/60 outline-none text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-0 border-t border-white/20"></div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-200 cursor-pointer"
                        style={{ letterSpacing: "1px" }}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <a
                        href="/login"
                        className="text-sm text-white/80 hover:underline"
                    >
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupRestaurantOwner;
