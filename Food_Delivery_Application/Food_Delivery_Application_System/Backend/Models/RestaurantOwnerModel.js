const mongoose = require('mongoose');

const restaurantOwnerModel = new mongoose.Schema({
    restaurantName: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zip: { type: String, trim: true }
    },
    gstnumber: { type: String },
    cuisineType: { type: String, trim: true },
    openingHours: {
        open: { type: String },
        close: { type: String }
    },
    rating: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    image: {
        type: [String]
    }
})
module.exports = mongoose.model('Restaurant', restaurantOwnerModel);