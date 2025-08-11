import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const statusMap = {
    all: { label: "All", color: "text-gray-500", icon: <FaUser className="inline mb-1" /> },
    pending: { label: "Pending", color: "text-yellow-500", icon: <FaClock className="inline mb-1" /> },
    approved: { label: "Approved", color: "text-green-500", icon: <FaCheckCircle className="inline mb-1" /> },
    rejected: { label: "Rejected", color: "text-red-500", icon: <FaTimesCircle className="inline mb-1" /> },
};

const HandleDeliveryBoy = () => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeliveryBoys();
    }, []);

    const fetchDeliveryBoys = async () => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get("http://localhost:8080/Admin/getdeliveryboy", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDeliveryBoys(res.data.data || []);
        } catch (error) {
            console.log("error", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("userToken");
                navigate("/login");
            } else {
                toast.error('Could not load delivery boys');
            }
        }
    };

    const handleDeliveryStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.patch(
                `http://localhost:8080/Admin/deliveryboyrequest/${id}/${newStatus}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(res.data.message);
            fetchDeliveryBoys();
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("userToken");
                navigate("/login");
            } else {
                toast.error(error?.response?.data?.message || "Failed to update delivery boy status");
            }
        }
    };

    const filteredDeliveryBoys = selectedDeliveryStatus === 'all'
        ? deliveryBoys
        : deliveryBoys.filter(d => d.status === selectedDeliveryStatus);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] mt-18">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <FaUser className="inline mb-1" />
                    <span className="ml-2">Delivery Boy Requests</span>
                </h2>

                <div className="flex flex-wrap gap-3 mb-4">
                    {["all", "pending", "approved", "rejected"].map(status => (
                        <button
                            key={status}
                            onClick={() => setSelectedDeliveryStatus(status)}
                            className={`px-4 py-1 rounded-full border text-sm cursor-pointer font-medium
                                    ${selectedDeliveryStatus === status
                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                                    : 'text-gray-600 border-gray-300'
                                }`}
                        >
                            {statusMap[status].label}
                            {status !== "all" && (
                                <> ({deliveryBoys.filter(d => d.status === status).length})</>
                            )}
                        </button>
                    ))}
                </div>

                <div className="overflow-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                                <th className="py-3 px-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDeliveryBoys.map((d, index) => (
                                <tr key={d._id} className="border-b hover:bg-gray-50 transition-all duration-300">
                                    <td className="py-3 px-4 font-semibold">{index + 1}</td>
                                    <td className="py-3 px-4">{d.name}</td>
                                    <td className="py-3 px-4">{d.email}</td>
                                    <td className="py-3 px-4">{d.phone}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${d.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : d.status === 'approved'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}>
                                            {statusMap[d.status]?.label || d.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {d.status === 'pending' ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDeliveryStatusChange(d._id, "approved")}
                                                    className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleDeliveryStatusChange(d._id, "rejected")}
                                                    className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm italic">—</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => navigate(`/admin/deliveryboydetail/${d._id}`)}
                                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HandleDeliveryBoy;
