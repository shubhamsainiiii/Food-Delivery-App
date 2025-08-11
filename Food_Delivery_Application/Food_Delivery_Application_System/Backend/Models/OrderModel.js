const mongoose = require('mongoose');

const oredrSchema = new mongoose.Schema({
    invoiceId: { type: mongoose.Schema.ObjectId, ref: 'Invoice' },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    quantity: { type: Number },
    foodItemId: { type: mongoose.Schema.ObjectId, ref: 'food-items' },
    restaurantId: { type: mongoose.Schema.ObjectId, ref: 'Restaurant' },
    images: { type: [Object] },
    status: {
        type: String,
        enum: ['pending', 'completed', 'on the way', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Order', oredrSchema);