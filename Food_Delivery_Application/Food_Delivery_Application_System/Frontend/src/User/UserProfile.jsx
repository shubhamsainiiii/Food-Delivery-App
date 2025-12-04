import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const BASE_URL = "http://localhost:8080";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(null); // "name", "phone", "image"
    const [inputVal, setInputVal] = useState(""); // will hold field value for edit modal
    const [imagePreview, setImagePreview] = useState(null);
    const fileRef = useRef(null);
    const token = localStorage.getItem("userToken");
    const navigate = useNavigate();



    // Fetch user profile on mount
    useEffect(() => {
        fetchProfile();
    }, []);

    if (!token) {
        toast.error("Login expired. Please sign in again.");
        navigate('/login');
        return;
    }
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/User/getuser`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user); // important: set user object inside `user` property
            setImagePreview(res.data.user?.image);
            console.log('Update response:', res.data);
        } catch (error) {
            console.log("error", error)
            toast.error("Failed to fetch profile.");
        }
    };


    const handleEdit = (field) => {
        if (!user) return;
        let val = "";
        if (field === "name") val = user.name || "";
        else if (field === "phone") val = user.phone || "";
        setInputVal(val);
        setModal(field);
    };

    // Submit updated name or phone
    const handleEditSubmit = async (e) => {
        e.preventDefault();

       
        if (!inputVal.trim()) {
            toast.error("Value cannot be empty.");
            return;
        }

        try {
            const payload = { [modal]: inputVal.trim() }; 
            const res = await axios.put(`${BASE_URL}/User/update`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data); // update user state with response user document
            localStorage.setItem("user", JSON.stringify(res.data));
            window.dispatchEvent(new Event("profileUpdated"));

            setModal(null);
            toast.success("Profile updated!");
            navigate('/user/dashboard')
        } catch (error) {
            console.log("error", error)
            toast.error("Update failed.");
        }
    };

    // Submit new profile image
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        const file = fileRef.current.files[0];
        if (!file) {
            toast.error("Please select an image.");
            return;
        }
        const formData = new FormData();
        formData.append("images", file); // backend expects "images"
        try {
            const res = await axios.put(`${BASE_URL}/User/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser(res.data);
            setImagePreview(res.data.image);
            setModal(null);
            toast.success("Profile image updated!");
            localStorage.setItem("user", JSON.stringify(res.data));
            window.dispatchEvent(new Event("profileUpdated"));
        } catch (error) {
            console.log("error", error)
            toast.error("Image upload failed.");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-lg">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] flex flex-col items-center py-8 px-4 mt-18">
            <UserSidebar />
            <div className="w-full max-w-2xl bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] rounded-xl shadow-xs shadow-gray-600 p-8 space-y-8 ml-40">
                {/* Header / Avatar */}
                <div className="flex items-center space-x-4 pb-6 border-b">
                    <div className="relative">
                        <img
                            src={imagePreview || "https://randomuser.me/api/portraits/lego/5.jpg"}
                            alt="profile"
                            className="w-20 h-20 rounded-full border-4 border-orange-200 object-cover cursor-pointer"
                        />
                        <button
                            onClick={() => setModal("image")}
                            title="Change photo"
                            className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 cursor-pointer"
                        >
                            <FaCamera size={16} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Change Profile</h2>
                        <p className="text-gray-400">Manage your profile information</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-5">
                    {/* Name */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <FaUser className="text-xl text-orange-500" />
                            <div>
                                <div className="font-medium text-gray-600">Name</div>
                                <div className="text-gray-800">{user.name}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleEdit("name")}
                            className="bg-white border border-orange-400 text-orange-500 rounded-lg px-6 py-1.5 hover:bg-orange-50 transition-all cursor-pointer duration-300 text-sm"
                        >
                            Edit
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-xl text-orange-500" />
                            <div>
                                <div className="font-medium text-gray-600">Email</div>
                                <div className="text-gray-800">{user.email}</div>
                            </div>
                        </div>
                        {/* Email is not editable */}
                    </div>

                    {/* Phone */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <FaPhone className="text-xl text-orange-500" />
                            <div>
                                <div className="font-medium text-gray-600">Phone Number</div>
                                <div className="text-gray-800">{user.phone || "Not set"}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleEdit("phone")}
                            className="bg-white border border-orange-400 text-orange-500 rounded-lg px-6 py-1.5 hover:bg-orange-50 transition-all cursor-pointer duration-300 text-sm">
                            Change
                        </button>
                    </div>

                    {/* Password */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <FaLock className="text-xl text-orange-500" />
                            <div>
                                <div className="font-medium text-gray-600">Password</div>
                                <div className="text-gray-800">********</div>
                            </div>
                        </div>
                        <Link to='/verifyemail'
                            className="bg-white border border-orange-400 text-orange-500 rounded-lg px-6 py-1.5 hover:bg-orange-50 transition-all cursor-pointer duration-300 text-sm"
                        >
                            Change
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal for editing name or phone */}
            {["name", "phone"].includes(modal) && (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] z-50">
                    <div className="rounded-xl shadow-xs shadow-gray-700 p-6 w-full max-w-xs">
                        <h2 className="font-bold mb-4 capitalize">
                            Change {modal === "name" ? "Name" : "Phone Number"}
                        </h2>
                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <input
                                type={modal === "phone" ? "tel" : "text"}
                                className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-none"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                required
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModal(null)}
                                    className="px-4 py-2 rounded bg-gray-400 cursor-pointer hover:opacity-80 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-orange-500 text-white cursor-pointer hover:bg-orange-600 transition-all duration-300"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for image upload */}
            {modal === "image" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Change Profile Picture</h2>

                        <form onSubmit={handleImageSubmit} className="flex flex-col items-center space-y-4">

                            {/* Improved file input area */}
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-400 rounded-lg cursor-pointer hover:border-orange-600 transition-colors bg-orange-50 hover:bg-orange-100"
                                title="Click or drag and drop to upload"
                            >
                                {fileRef.current?.files && fileRef.current.files[0] ? (
                                    <img
                                        src={URL.createObjectURL(fileRef.current.files[0])}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-full"
                                    />
                                ) : (
                                    <>
                                        <svg
                                            className="w-12 h-12 mb-2 text-orange-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V12m0 0V8m0 4h14m-7-7v14"></path>
                                        </svg>
                                        <span className="text-orange-600 font-semibold">Click or drag file to upload</span>
                                        <span className="text-sm text-orange-500 mt-1">PNG, JPG, GIF up to 5MB</span>
                                    </>
                                )}

                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileRef}
                                    required
                                    onChange={() => setInputVal('')}
                                />
                            </label>

                            {/* Action buttons */}
                            <div className="flex justify-end space-x-3 w-full">
                                <button
                                    type="button"
                                    onClick={() => setModal(null)}
                                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 cursor-pointer transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 disabled:opacity-50 cursor-pointer transition-all duration-300"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserProfile;
