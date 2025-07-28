import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupDeliveryBoy = () => {
    const [form, setForm] = useState({
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
            // POST to your backend endpoint (update URL if needed)
            const res = await axios.post('http://localhost:8080/Delivery-Boy/deliveryboysignup', form);

            if (res.status === 202 || res.status === 201) {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3 py-12">
            <div
                className="w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30 relative"
                style={{ boxShadow: '0 8px 60px 8px rgba(60,24,110,0.35)' }}
            >
                <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wider">
                    Signup as Delivery Boy
                </h1>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative mb-4">
                        <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    {/* Email */}
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    {/* Phone */}
                    <div className="relative mb-4">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    {/* Password */}
                    <div className="relative mb-8">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            style={{ background: 'transparent' }}
                            required
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all cursor-pointer duration-200"
                        style={{ letterSpacing: "1px" }}
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
