// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaUserCircle, FaUserAlt, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

// const Signup = () => {
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!form.name || !form.email || !form.phone || !form.password) {
//             toast.error('Please fill in all fields.');
//             return;
//         }
//         setLoading(true);

//         try {
//             // POST to your backend endpoint
//             const res = await axios.post('http://localhost:8080/User/usersignup', form);

//             if (res.status === 200 || res.status === 201 || res.status === 202) {
//                 toast.success('Signup successful!');
//                 setTimeout(() => navigate('/login'), 1000);
//             } else {
//                 toast.error(res.data.message || 'Signup failed!');
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error('Network error!');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3 py-12">
//             <div className="w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30 relative" style={{ boxShadow: '0 8px 60px 8px rgba(60,24,110,0.4)' }}>
//                 <h1 className="text-2xl font-bold text-center text-white mb-4 tracking-wider">Sign Up</h1>
//                 <form className="space-y-2" onSubmit={handleSubmit}>
//                     {/* Name */}
//                     <div className="relative mb-4">
//                         <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Full Name"
//                             value={form.name}
//                             onChange={handleChange}
//                             className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
//                             required
//                             style={{ background: 'transparent' }}
//                         />
//                         <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
//                     </div>
//                     {/* Email */}
//                     <div className="relative mb-4">
//                         <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email ID"
//                             value={form.email}
//                             onChange={handleChange}
//                             className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
//                             required
//                             style={{ background: 'transparent' }}
//                         />
//                         <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
//                     </div>
//                     {/* Phone */}
//                     <div className="relative mb-4">
//                         <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
//                         <input
//                             type="text"
//                             name="phone"
//                             placeholder="Phone"
//                             value={form.phone}
//                             onChange={handleChange}
//                             className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
//                             required
//                             style={{ background: 'transparent' }}
//                         />
//                         <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
//                     </div>
//                     {/* Password */}
//                     <div className="relative mb-8">
//                         <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={form.password}
//                             onChange={handleChange}
//                             className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
//                             required
//                             style={{ background: 'transparent' }}
//                         />
//                         <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-85 transition-all duration-200 cursor-pointer"
//                         style={{ letterSpacing: "1px" }}
//                     >
//                         {loading ? "Processing..." : "SIGN UP"}
//                     </button>
//                 </form>
//                 <div className="text-center mt-2">
//                     <a href="/login" className="text-sm text-white/80 hover:underline">
//                         Already have an account? Login
//                     </a>
//                 </div>
//                 <div className="flex items-center my-3">
//                     <div className="flex-grow h-px bg-white/20 mt-1 mr-1" />
//                     <span className="text-white/60">or</span>
//                     <div className="flex-grow h-px bg-white/20 mt-1 ml-1" />
//                 </div>
//                 <div>
//                     <p className="text-center mb-2 text-white/80">Sign up as</p>
//                     <a
//                         href="/signupdeliveryboy"
//                         className="block w-full mb-2 py-2 rounded-lg text-indigo-100 bg-white/10 font-medium text-center hover:bg-white/20 transition"
//                     >
//                         Delivery Boy
//                     </a>
//                     <a
//                         href="/signuprestaurantowner"
//                         className="block w-full py-2 rounded-lg  text-indigo-100 bg-white/10 font-medium text-center hover:bg-white/20 transition"
//                     >
//                         Restaurant Owner
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Signup;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserAlt, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import bgImage from '../assets/log7.jpg'
const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.password) {
            toast.error('Please fill in all fields.');
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8080/User/usersignup', form);

            if ([200, 201, 202].includes(res.status)) {
                toast.success('Signup successful!');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                toast.error(res.data.message || 'Signup failed!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Network error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-3 py-6"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="w-full max-w-sm mx-auto rounded-3xl p-8 bg-white/10 shadow-2xl backdrop-blur-[1.7px] border border-black/20">
                <h1 className="text-2xl font-bold text-center text-black/50 mb-4 tracking-wider">Sign Up</h1>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative mb-4">
                        <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 text-black border-b border-black/30 outline-none placeholder-black/60 text-base"
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="relative mb-4">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 text-black border-b border-black/30 outline-none placeholder-black/60 text-base"
                            required
                        />
                    </div>
                    {/* Phone */}
                    <div className="relative mb-4">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 text-black border-b border-black/30 outline-none placeholder-black/60 text-base"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="relative mb-8">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 text-black border-b border-black/30 outline-none placeholder-black/60 text-base"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-90 transition-all duration-300 cursor-pointer"
                    >
                        {loading ? "Processing..." : "SIGN UP"}
                    </button>
                </form>
                <div className="text-center mt-2">
                    <a href="/login" className="text-sm text-black/70 hover:underline">
                        Already have an account? Login
                    </a>
                </div>
                <div className="flex items-center my-3">
                    <div className="flex-grow h-px bg-black/20 mt-1 mr-1" />
                    <span className="text-black/60">or</span>
                    <div className="flex-grow h-px bg-black/20 mt-1 ml-1" />
                </div>
                <div>
                    <p className="text-center mb-2 text-black/60">Sign up as</p>
                    <a
                        href="/signupdeliveryboy"
                        className="block w-full mb-2 py-2 rounded-lg text-white bg-black/20 font-medium text-center hover:bg-black/30 transition-all duration-300"
                    >
                        Delivery Boy
                    </a>
                    <a
                        href="/signuprestaurantowner"
                        className="block w-full mb-2 py-2 rounded-lg text-white bg-black/20 font-medium text-center hover:bg-black/30 transition-all duration-300"
                    >
                        Restaurant Owner
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
