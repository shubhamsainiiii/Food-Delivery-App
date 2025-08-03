// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaUserCircle, FaBox, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

// const UserSidebar = ({ user }) => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('userToken');
//         navigate('/login');
//     };

//     const navLinks = [
//         { path: '/user/profile', label: 'Change Profile', icon: FaUserCircle },
//         { path: '/user/orders', label: 'My Order', icon: FaBox },
//         { path: '/user/addresses', label: 'Saved Address', icon: FaMapMarkerAlt },
//     ];

//     return (
//         <aside className="w-64 bg-white p-6 flex-shrink-0 border-r border-gray-200 hidden md:flex flex-col">
//             <div className="text-center mb-10">
//                 <div className="relative w-24 h-24 mx-auto mb-3">
//                     <img
//                         className="w-full h-full rounded-full object-cover"
//                         src={user?.image ? user.image : null}
//                         alt="User Avatar"
//                     />
//                     <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-tr from-orange-400 to-yellow-300 opacity-20"></div>
//                 </div>
//                 <h2 className="font-bold text-lg text-gray-800">{user?.name || 'User Name'}</h2>
//                 <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
//             </div>

//             <nav className="flex-grow">
//                 <ul>
//                     {navLinks.map((link) => (
//                         <li key={link.path}>
//                             <NavLink
//                                 to={link.path}
//                                 className={({ isActive }) =>
//                                     `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${isActive
//                                         ? 'bg-orange-100 text-orange-600 font-bold border-l-4 border-orange-500'
//                                         : 'text-gray-600 hover:bg-gray-100'
//                                     }`
//                                 }
//                             >
//                                 <link.icon className="mr-3" />
//                                 {link.label}
//                             </NavLink>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             <button
//                 onClick={handleLogout}
//                 className="flex items-center px-4 py-3 mt-4 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
//             >
//                 <FaSignOutAlt className="mr-3" /> Log Out
//             </button>
//         </aside>
//     );
// };

// export default UserSidebar;


import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBox, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const UserSidebar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        // Fetch profile info for sidebar
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/User/getuser`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.user);
            } catch (error) {
                console.log(error)
                setUser(null); // fallback
            }
        };
        fetchUser();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const navLinks = [
        { path: '/user/profile', label: 'Change Profile', icon: FaUserCircle },
        { path: '/user/orders', label: 'My Order', icon: FaBox },
        { path: '/user/addresses', label: 'Saved Address', icon: FaMapMarkerAlt },
    ];

    return (
        <aside className="w-64 bg-gradient-to-br from-[#faebd7] to-[#f7fafc]p-6 flex-shrink-0 border-r border-gray-500 hidden md:flex flex-col">
            <div className="text-center mb-10">
                <div className="relative w-28 h-28 mt-10 m-auto mb-5">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.image ? user.image : " "}
                        alt="User Avatar"
                    />
                </div>
                <h2 className="font-bold text-lg text-gray-800">{user?.name || 'User Name'}</h2>
                {/* <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p> */}
            </div>

            <nav className="flex-grow">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-orange-100 text-orange-600 font-bold border-l-4 border-orange-500'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <link.icon className="mr-3" />
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 mt-4 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
            >
                <FaSignOutAlt className="mr-3" /> Log Out
            </button>
        </aside>
    );
};

export default UserSidebar;
