
const mongoose = require("mongoose");

const foodImageSchema = new mongoose.Schema({
    foodItemId: { type: mongoose.Schema.ObjectId, ref: "food-items" },
    imageName: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model("food-images", foodImageSchema);
