import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TotalUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }
            const res = await axios.get("http://localhost:8080/Admin/getallusers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(res.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("userToken");
                navigate("/login");
            } else {
                toast.error("Could not load users");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-gray-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <FaUsers className="inline mb-1" />
                    <span className="ml-2">Total Users</span>
                </h2>

                <div className="overflow-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr
                                        key={user._id || index}
                                        className="border-b hover:bg-gray-50 transition-all duration-300"
                                    >
                                        <td className="py-3 px-4 font-semibold">{index + 1}</td>
                                        <td className="py-3 px-4">{user.name || "N/A"}</td>
                                        <td className="py-3 px-4">{user.phone || "N/A"}</td>
                                        <td className="py-3 px-4">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-5 text-center text-gray-500 italic">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TotalUser;