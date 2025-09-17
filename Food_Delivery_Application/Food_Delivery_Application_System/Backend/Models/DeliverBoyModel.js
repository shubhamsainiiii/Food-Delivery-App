const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    phone: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    image: { type: String },
    address: { type: String, trim: true },
    vehicleNumber: { type: String, trim: true },
    aadharNumber: { type: String, trim: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});
module.exports = mongoose.model('Delivery-Boy', deliveryBoySchema);
