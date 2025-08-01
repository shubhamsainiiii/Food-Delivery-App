const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    foodItemId: { type: mongoose.Schema.ObjectId, ref: "food-items" },
    quantity: { type: Number, default: 0 }
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('Cart', cartSchema);