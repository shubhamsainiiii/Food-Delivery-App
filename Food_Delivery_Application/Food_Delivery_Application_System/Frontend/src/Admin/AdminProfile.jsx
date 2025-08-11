import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [modal, setModal] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [modalImagePreview, setModalImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileRef = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("userToken");
    console.log("tokennnnnnn", token)
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("storeduserrrrrrrrr", storedUser)
    const adminIdd = storedUser.adminId;
    console.log("adminIdddddddddddddd", adminIdd)

    useEffect(() => {
        fetchProfile();
        // Cleanup on unmount: revoke object URL if any
        return () => {
            if (modalImagePreview) URL.revokeObjectURL(modalImagePreview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/Admin/getadmin/${adminIdd}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAdmin(res.data.data);
            console.log("dattaaaaaaaaa", res.data.data)
            setImagePreview(res.data.data?.image || null);
            console.log("dattaaaaaaaaa imageeeeeee", res.data?.image)
        } catch (error) {
            toast.error("Error fetching profile");
        }
    };

    const openEditModal = (field) => {
        if (field === "password") {
            // Navigate immediately to /verifyemail on password change click
            navigate("/verifyemail");
            return;
        }

        if (!admin) return;

        let val = "";
        if (field === "name") val = admin.name || "";
        else if (field === "phone") val = admin.phone || "";

        setInputVal(val);
        setModal(field);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!inputVal.trim()) {
            toast.error("Value cannot be empty.");
            return;
        }

        try {
            const payload = { [modal]: inputVal.trim() };
            const res = await axios.put(
                `${BASE_URL}/Admin/update/${adminIdd}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAdmin(res.data.data);
            toast.success(`${modal.charAt(0).toUpperCase() + modal.slice(1)} updated!`);
            setModal(null);
        } catch (error) {
            toast.error("Update failed.");
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        console.log("filesssss", file)
        if (file) {
            // Revoke old preview to free memory
            if (modalImagePreview) {
                URL.revokeObjectURL(modalImagePreview);
            }
            const previewUrl = URL.createObjectURL(file);
            setModalImagePreview(previewUrl);
            setImagePreview(previewUrl);
            setModal("image");
            setSelectedFile(file);  // <-- Save selected file in state
        }
    };

    const handleModalClose = () => {
        if (modalImagePreview) {
            URL.revokeObjectURL(modalImagePreview);
            setModalImagePreview(null);
        }
        setSelectedFile(null); // <-- Clear selected file on modal close
        setModal(null);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);  // <-- Use selectedFile state here

        try {
            const res = await axios.put(
                `${BASE_URL}/Admin/update/${adminIdd}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("dattaaaaaaaaa", res.data.data)
            console.log("dattaaaaaaaaa", res.data?.image)
            setAdmin(res.data.data);
            setImagePreview(res.data.data?.image);
            toast.success("Profile picture updated!");
            handleModalClose();
        } catch (error) {
            toast.error("Image upload failed.");
        }
    };

    if (!admin)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-lg">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-orange-50 to-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl space-y-8">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img
                            src={imagePreview || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md cursor-pointer"
                            onClick={() => fileRef.current?.click()}
                        />
                        <button
                            onClick={() => fileRef.current?.click()}
                            title="Change photo"
                            className="absolute bottom-1 right-1 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 text-white"
                        >
                            <FaCamera />
                        </button>
                        <input
                            id="image-upload"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileRef}
                            onChange={handleImageSelect}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Change Profile</h2>
                        <p className="text-gray-500">Manage your profile information</p>
                    </div>
                </div>

                <hr />

                {/* Profile Fields */}
                <div className="space-y-6">
                    {/* Name */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-orange-500 text-xl" />
                            <div>
                                <p className="font-semibold text-gray-700">Name</p>
                                <p className="text-gray-900">{admin.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => openEditModal("name")}
                            className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-50"
                        >
                            Edit
                        </button>
                    </div>

                    {/* Email (not editable) */}
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-orange-500 text-xl" />
                        <div>
                            <p className="font-semibold text-gray-700">Email</p>
                            <p className="text-gray-900">{admin.email}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-orange-500 text-xl" />
                            <div>
                                <p className="font-semibold text-gray-700">Phone Number</p>
                                <p className="text-gray-900">{admin.phone || "Not set"}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => openEditModal("phone")}
                            className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-50"
                        >
                            Edit
                        </button>
                    </div>

                    {/* Password */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FaLock className="text-orange-500 text-xl" />
                            <div>
                                <p className="font-semibold text-gray-700">Password</p>
                                <p className="text-gray-900">********</p>
                            </div>
                        </div>
                        <button
                            onClick={() => openEditModal("password")}
                            className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-50"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for text fields */}
            {["name", "phone"].includes(modal) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
                        <h2 className="text-lg font-bold mb-4 capitalize">
                            Change {modal === "phone" ? "Phone Number" : "Name"}
                        </h2>
                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <input
                                type={modal === "phone" ? "tel" : "text"}
                                className="w-full border px-3 py-2 rounded-lg"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                required
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModal(null)}
                                    className="px-4 py-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-orange-500 text-white cursor-pointer hover:bg-orange-600"
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
                        <form onSubmit={handleImageUpload} className="flex flex-col items-center space-y-4">
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-400 rounded-lg cursor-pointer hover:border-orange-600 transition-colors bg-orange-50 hover:bg-orange-100"
                                title="Click or drag and drop to upload"
                            >
                                {modalImagePreview ? (
                                    <img
                                        src={modalImagePreview}
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
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileRef}
                                    onChange={handleImageSelect}
                                />
                            </label>

                            <div className="flex justify-end space-x-3 w-full">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 cursor-pointer transition-all duration-300"
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

export default AdminProfile;
