import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [st, setSt] = useState("")
    const [loading, setLoading] = useState(false);
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
            const { user } = res.data
            setSt(user.status)
            console.log(user, ",,..")
            console.log(user.status, "shsh")
            console.log(st, "ksskd")


            console.log(res.data, "dhsh")
            if (res.status === 200 || res.status === 202) {
                if (res.data.role === "admin" || res.data.role === "user") {
                    toast.success('Login successful!');
                }
                if (res.data.role === "restaurant" || res.data.role === "delivery-boy") {
                    if (user.status === "pending") {
                        toast.error('Your request is in pending state');
                    }
                    else if (user.status === "rejected") {
                        toast.error('You request is rejected');
                    }
                    else {
                        toast.success('Login successful!');
                    }
                }

                localStorage.setItem('userToken', res.data.token || '');
                localStorage.setItem('userRole', res.data.role || '');
                localStorage.setItem("user", JSON.stringify(res.data.user))
                if (res.data.role === "user") {
                    navigate("/user/userdashboard")
                }
                else if (res.data.role === "admin") {
                    navigate("/admin-dashboard")
                }
                else if (res.data.role === "restaurant") {
                    if (user.status === "pending" || user.status === "rejected") {
                        navigate("/login")
                    }
                    else {
                        navigate("/rd")
                    }

                }
                else if (res.data.role === "delivery-boy") {
                    navigate("/delivery-dashboard")
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3 py-12">
            <div className="w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30 relative" style={{ boxShadow: '0 8px 60px 8px rgba(60,24,110,0.4)' }}>
                <div className="flex justify-center mb-6">
                    <FaUserCircle size={100} className="text-white/30 bg-white/0 rounded-full" />
                </div>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                            style={{ background: 'transparent' }}
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    <div className="relative mb-6">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                            required
                            style={{ background: 'transparent' }}
                        />
                        <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm text-white">
                            <input type="checkbox" className="mr-2 accent-white/70" />
                            Remember me
                        </label>
                        <a href="/verifyemail" className="text-white text-sm opacity-60 hover:underline transition-all">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-300 cursor-pointer"
                        style={{ letterSpacing: "1px" }}
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </form>
                <div className="mt-8">
                    <a
                        href="/"
                        className="block w-full py-2.5 text-center rounded-lg text-white/75 font-semibold tracking-wider bg-white/10 hover:bg-white/20 transition-all duration-300"
                        style={{ letterSpacing: ".7px" }}
                    >
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;

