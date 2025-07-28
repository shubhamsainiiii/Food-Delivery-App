import React, { useState } from "react";

const Restaurantupdate = () => {
    const [formData, setFormData] = useState({
        restaurantName: "",
        ownerName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        gstNumber: "",
        fssaiNumber: "",
        upiId: "",
        bankAccountNumber: "",
        ifscCode: "",
        restaurantType: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        // You can send the formData to your backend API here
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Detail Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="restaurantName" placeholder="Restaurant Name" onChange={handleChange} value={formData.restaurantName} className="border p-2 rounded" required />
                <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} value={formData.ownerName} className="border p-2 rounded" required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} className="border p-2 rounded" required />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} className="border p-2 rounded" required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} className="border p-2 rounded" required />
                <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} className="border p-2 rounded" required />
                <input type="text" name="state" placeholder="State" onChange={handleChange} value={formData.state} className="border p-2 rounded" required />
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} value={formData.pincode} className="border p-2 rounded" required />
                <input type="text" name="gstNumber" placeholder="GST Number" onChange={handleChange} value={formData.gstNumber} className="border p-2 rounded" required />
                <input type="text" name="fssaiNumber" placeholder="FSSAI Number" onChange={handleChange} value={formData.fssaiNumber} className="border p-2 rounded" required />
                <input type="text" name="upiId" placeholder="UPI ID" onChange={handleChange} value={formData.upiId} className="border p-2 rounded" />
                <input type="text" name="bankAccountNumber" placeholder="Bank Account Number" onChange={handleChange} value={formData.bankAccountNumber} className="border p-2 rounded" />
                <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleChange} value={formData.ifscCode} className="border p-2 rounded" />
                <input type="text" name="restaurantType" placeholder="Restaurant Type (Veg/Non-Veg/Both)" onChange={handleChange} value={formData.restaurantType} className="border p-2 rounded" required />

                <div className="md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Restaurantupdate;