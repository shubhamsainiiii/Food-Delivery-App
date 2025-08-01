// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Navbar() {
//     return (
//         <header className="bg-white shadow">
//             <div className="container mx-auto flex items-center justify-between py-4 px-6">
//                 <Link to="/" className="text-xl font-bold">ORDERIT</Link>

//                 <nav className="hidden md:flex space-x-6">
//                     <Link to="/" className="hover:text-orange-600">Home</Link>
//                     <Link to="/about" className="hover:text-orange-600">About</Link>
//                     <Link to="/menu" className="hover:text-orange-600">Menu</Link>
//                     <Link to="/offers" className="hover:text-orange-600">Category</Link>
//                     <Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link>
//                     <Link to="/contact" className="hover:text-orange-600">Contact Us</Link>
//                 </nav>

//                 <div className="flex items-center space-x-4">
//                     <Link to="/login" className="hidden md:block px-4 py-2 border rounded">Log In</Link>
//                     <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded">Sign Up</Link>
//                 </div>
//             </div>
//         </header>
//     );
// }



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("userToken");
    const userData = JSON.parse(localStorage.getItem("user")); // optional: to show name/role

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link to="/" className="text-xl font-bold">ORDERIT</Link>

                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-orange-600">Home</Link>
                    <Link to="/about" className="hover:text-orange-600">About</Link>
                    <Link to="/menu" className="hover:text-orange-600">Menu</Link>
                    <Link to="/offers" className="hover:text-orange-600">Category</Link>
                    <Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link>
                    <Link to="/contact" className="hover:text-orange-600">Contact Us</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {token ? (
                        <>
                            <Link
                                to={`/${userData?.role}/userdashboard`}
                                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hidden md:block px-4 py-2 border rounded">
                                Log In
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar() {
//     const navigate = useNavigate();
//     // Use a state variable for token
//     const [token, setToken] = useState(localStorage.getItem("userToken"));
//     const [userData, setUserData] = useState(() => {
//         const user = localStorage.getItem("user");
//         return user ? JSON.parse(user) : null;
//     });

//     // Listen to storage change in same window (for completeness)
//     useEffect(() => {
//         const syncLogout = () => {
//             setToken(localStorage.getItem("userToken"));
//             const user = localStorage.getItem("user");
//             setUserData(user ? JSON.parse(user) : null);
//         };
//         window.addEventListener('storage', syncLogout);
//         return () => window.removeEventListener('storage', syncLogout);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("userToken");
//         localStorage.removeItem("user");
//         setToken(null);
//         setUserData(null);
//         navigate("/login");
//     };

//     return (
//         <header className="bg-white shadow">
//             <div className="container mx-auto flex items-center justify-between py-4 px-6">
//                 <Link to="/" className="text-xl font-bold">ORDERIT</Link>
//                 <nav className="hidden md:flex space-x-6">
//                     <Link to="/" className="hover:text-orange-600">Home</Link>
//                     <Link to="/about" className="hover:text-orange-600">About</Link>
//                     <Link to="/menu" className="hover:text-orange-600">Menu</Link>
//                     <Link to="/offers" className="hover:text-orange-600">Category</Link>
//                     <Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link>
//                     <Link to="/contact" className="hover:text-orange-600">Contact Us</Link>
//                 </nav>
//                 <div className="flex items-center space-x-4">
//                     {token ? (
//                         <>
//                             <Link
//                                 to={`/${userData?.role}/userdashboard`}
//                                 className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
//                             >
//                                 Profile
//                             </Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" className="hidden md:block px-4 py-2 border rounded">
//                                 Log In
//                             </Link>
//                             <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded">
//                                 Sign Up
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }
