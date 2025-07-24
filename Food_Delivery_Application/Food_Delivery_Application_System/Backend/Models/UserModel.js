const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant', 'delivery-boy'],
        default: 'user'
    },
    adminId: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
    restaurantId: { type: mongoose.Schema.ObjectId, ref: 'Restaurant' },
    deliveryBoyId: { type: mongoose.Schema.ObjectId, ref: 'Delivery-Boy' }
})

module.exports = mongoose.model('User', userModel);