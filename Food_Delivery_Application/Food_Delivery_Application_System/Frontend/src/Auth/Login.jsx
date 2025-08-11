/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg3.jpg';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [st, setSt] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Please fill in both fields.');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/User/userlogin', {
                email: form.email,
                password: form.password
            });
            const { user } = res.data;
            setSt(user.status);

            if (res.status === 200 || res.status === 202) {
                if (res.data.role === "admin" || res.data.role === "user") {
                    toast.success('Login successful!');
                }
                if (res.data.role === "restaurant" || res.data.role === "delivery-boy") {
                    if (user.status === "pending") {
                        toast.error('Your request is in pending state');
                    } else if (user.status === "rejected") {
                        toast.error('Your request is rejected');
                    } else {
                        toast.success('Login successful!');
                    }
                }

                localStorage.setItem('userToken', res.data.token || '');
                localStorage.setItem('userRole', res.data.role || '');
                localStorage.setItem("user", JSON.stringify(res.data.user));

                if (res.data.role === "user") {
                    navigate("/user/dashboard");
                } else if (res.data.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (res.data.role === "restaurant") {
                    if (user.status === "pending" || user.status === "rejected") {
                        navigate("/login");
                    } else {
                        navigate("/restaurant/dashboard");
                    }
                } else if (res.data.role === "delivery-boy") {
                    if (user.status === "pending" || user.status === "rejected") {
                        navigate("/login");
                    } else {
                        navigate("/deliveryboy/dashboard");
                    }
                }
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed or network error!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-3 py-12 overflow-hidden">
            {/* Blurred Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs scale-102"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-black/25"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/0 shadow-2xl backdrop-blur-md border border-white/20">
                <div className="flex justify-center mb-6">
                    <FaUserCircle size={100} className="text-white/50" />
                </div>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent text-white placeholder-white/60 text-base focus:outline-none border-b border-white/20"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative mb-6">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-10 py-3 rounded-md bg-transparent text-white placeholder-white/60 text-base focus:outline-none border-b border-white/20"
                            required
                        />
                        <div
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm text-white">
                            <input type="checkbox" className="mr-2 accent-white/70" />
                            Remember me
                        </label>
                        <a href="/verifyemail" className="text-white text-sm opacity-60 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-300 cursor-pointer"
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-8">
                    <a
                        href="/signup"
                        className="block w-full py-2.5 text-center rounded-lg text-white/75 font-semibold tracking-wider bg-white/10 hover:bg-white/20 transition-all duration-300"
                    >
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
