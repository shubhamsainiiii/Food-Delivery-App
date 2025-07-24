const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
    foodName: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true, required: true },
    isAvailable: { type: Boolean, default: true },
    category: { type: String, trim: true },
    restaurantId: { type: mongoose.Schema.ObjectId, ref: "Restaurant", required: true }
});

module.exports = mongoose.model("food-items", foodItemSchema);
