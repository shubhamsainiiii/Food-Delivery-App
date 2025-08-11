// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import UserSidebar from './UserSidebar';

// const BASE_URL = "http://localhost:8080";

// const UserOrderHistory = () => {
//     const [groupedOrders, setGroupedOrders] = useState([]);
//     const token = localStorage.getItem("userToken");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchUserOrders();
//     }, []);

//     const fetchUserOrders = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/Order/getallorder`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             const grouped = Array.isArray(res.data.groupedOrders) ? res.data.groupedOrders : [];
//             setGroupedOrders(grouped);
//         } catch (error) {
//             console.error("Failed to fetch orders", error);
//             toast.error("Unable to load order history");
//         }
//     };

//     return (
//         <div className="bg-gradient-to-br from-[#fff4e5] to-[#f7fafc] min-h-screen p-6">
//             <UserSidebar />
//             <h2 className="text-3xl font-bold text-center mb-8">Your Order History</h2>

//             {groupedOrders.length === 0 ? (
//                 <p className="text-center text-gray-600">No orders found</p>
//             ) : (
//                 <div className="overflow-x-auto ml-64">
//                     <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                         <thead className="bg-orange-100 text-gray-700 text-left">
//                             <tr>
//                                 <th className="py-3 px-4">Invoice ID</th>
//                                 <th className="py-3 px-4">Status</th>
//                                 <th className="py-3 px-4">Date</th>
//                                 <th className="py-3 px-4">Address</th>
//                                 <th className="py-3 px-4">Total (₹)</th>
//                                 <th className="py-3 px-4">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {groupedOrders.map((group, index) => (
//                                 <tr key={index} className="border-t">
//                                     <td className="py-3 px-4">{group.invoice._id}</td>
//                                     <td className="py-3 px-4 capitalize text-yellow-700 font-medium">
//                                         {group.invoice.status}
//                                     </td>
//                                     <td className="py-3 px-4">{moment(group.invoice.date).format('LLL')}</td>
//                                     <td className="py-3 px-4">
//                                         {`${group.invoice.addressId?.street}, ${group.invoice.addressId?.city}, ${group.invoice.addressId?.state} - ${group.invoice.addressId?.zip}`}
//                                     </td>
//                                     <td className="py-3 px-4 font-semibold">₹{group.invoice.total}</td>
//                                     <td className="py-3 px-4">
//                                         <button
//                                             className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded"
//                                             onClick={() => navigate(`/user/orderdetails/${group.invoice._id}`)}
//                                         >
//                                             View Details
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserOrderHistory;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const BASE_URL = "http://localhost:8080";

const UserOrderHistory = () => {
    const [groupedOrders, setGroupedOrders] = useState([]);
    const token = localStorage.getItem("userToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/Order/getallorder`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("resssssss", res)
            const grouped = Array.isArray(res.data.groupedOrders) ? res.data.groupedOrders : [];
            console.log("grouped", grouped)
            setGroupedOrders(grouped);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            toast.error("Unable to load order history");
        }
    };

    return (
        <div className="grid grid-cols-[16rem_1fr] min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            {/* Sidebar */}
            <div className="h-full border-r shadow-md">
                <UserSidebar />
            </div>

            {/* Main Content */}
            <div className="p-6">
                <h2 className="text-3xl font-bold text-center mb-8">Your Order History</h2>

                {groupedOrders.length === 0 ? (
                    <p className="text-center text-gray-600">No orders found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-b shadow-md overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700 text-left ">
                                <tr>
                                    <th className="py-3 px-4">Invoice ID</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Address</th>
                                    <th className="py-3 px-4">Total (₹)</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedOrders.map((group, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50 transition-all duration-300">
                                        <td className="py-3 px-4">{group.invoice._id}</td>
                                        <td className="py-3 px-4 capitalize text-yellow-700 font-medium">
                                            {group.invoice.status}
                                        </td>
                                        <td className="py-3 px-4">{moment(group.invoice.date).format('LLL')}</td>
                                        <td className="py-3 px-4">
                                            {`${group.invoice.addressId?.landmark}, ${group.invoice.addressId?.street}, ${group.invoice.addressId?.city}, ${group.invoice.addressId?.state} - ${group.invoice.addressId?.zip}`}
                                        </td>
                                        <td className="py-3 px-4 font-semibold">₹{group.invoice.total}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded transition-all duration-300 cursor-pointer"
                                                onClick={() => navigate(`/user/orderdetails/${group.invoice._id}`)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrderHistory;
