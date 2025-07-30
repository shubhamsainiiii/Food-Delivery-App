import React, { useEffect, useState } from "react";
// import UserSidebar from "../../components/UserSidebar";
import axios from "axios";
const baseUrl = "http://localhost:8080";
import { toast } from "react-toastify";


const UserAddress = () => {
    const [edit, setEdit] = useState("add")
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        addressType: "Home",
    });

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [singleAddress, setSingleAddress] = useState(null)
    const token = localStorage.getItem("userToken");

    // Fetch saved addresses from backend
    const fetchAddresses = async () => {
        try {
            console.log(savedAddresses)
            const res = await axios.get(`${baseUrl}/User/alladdress`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data, "sdhsjhdkj,")
            setSavedAddresses(res.data);
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };

    useEffect(() => {
        fetchAddresses();

    }, []);

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
                `${baseUrl}/User/createaddress`,
                address,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(result, "asdkawjkaujd")

            if (result.status === 200) {
                toast.success("Successfully Added")
                fetchAddresses();

                setAddress({
                    street: "",
                    city: "",
                    state: "",
                    pincode: "",
                    landmark: "",
                    addressType: "Home",
                });
            }
        } catch (err) {
            console.error("Error adding address:", err);
        }
    };

    const fetchSingleAddress = async (id) => {
        const result = await axios.get(`${baseUrl}/User/addressbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(result, "single address")
        const data = result.data
        setSingleAddress(data)
        setAddress({
            street: data.street,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            landmark: data.landmark,
            addressType: data.addressType,
        });



    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const id = singleAddress._id
        const result = await axios.put(`${baseUrl}/User/updateaddress/${id}`, address, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(result)
        if (result.status === 200) {
            toast.success('Updated Successfuly')
            setAddress({
                street: "",
                city: "",
                state: "",
                pincode: "",
                landmark: "",
                addressType: "Home",
            });
            setSingleAddress(null)
            fetchAddresses()
        }
        else {
            toast.success("error occured");
        }

    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* <UserSidebar /> */}
            <div className="flex-1 p-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">
                        {edit === "add" ? " Manage Addresses" : "Edit Address"}
                    </h1>
                    <button
                        onClick={() => {
                            setEdit("add");
                            setAddress({
                                street: "",
                                city: "",
                                state: "",
                                pincode: "",
                                landmark: "",
                                addressType: "Home",
                            });
                        }}
                        className="bg-blue-500 cursor-pointer text-white font-bold border-1 rounded-sm py-2 px-5"
                    >
                        Add Address
                    </button>
                </div>

                {/* Address Form */}
                {edit === "add" ? (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Street
                            </label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Pincode
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={address.pincode}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={address.landmark}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Address Type
                            </label>
                            <select
                                name="addressType"
                                value={address.addressType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-span-1 sm:col-span-2 flex gap-4">
                            <button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                ) : (
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Street
                            </label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Pincode
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={address.pincode}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={address.landmark}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Address Type
                            </label>
                            <select
                                name="addressType"
                                value={address.addressType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-span-1 sm:col-span-2 flex gap-4">
                            <button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                            >
                                Update Address
                            </button>
                        </div>
                    </form>
                )}

                {/* Saved Addresses */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Saved Addresses
                    </h2>
                    {savedAddresses.length === 0 ? (
                        <p className="text-gray-500">No addresses saved yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {savedAddresses.map((addr, index) => (
                                <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex justify-between items-center">
                                    <div key={index} className="">
                                        <h3 className="font-semibold text-gray-800 mb-2">
                                            {addr.addressType}
                                        </h3>
                                        <p className="text-gray-600">{addr.street}</p>
                                        <p className="text-gray-600">
                                            {addr.city}, {addr.state} - {addr.pincode}
                                        </p>
                                        {addr.landmark && (
                                            <p className="text-gray-500 text-sm">{addr.landmark}</p>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => {
                                                setEdit("edit");
                                                fetchSingleAddress(addr._id);
                                            }}
                                            className="bg-blue-500 cursor-pointer hover:bg-blue-900 text-white font-bold border-1 rounded-sm py-2 px-5"
                                        >
                                            Edit
                                        </button>
                                        <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold border-1 rounded-sm py-2 px-5">
                                            Delete
                                        </button>
                                        <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold border-1 rounded-sm py-2 px-5">
                                            Active
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAddress;