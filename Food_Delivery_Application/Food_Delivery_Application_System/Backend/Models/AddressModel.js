const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    landmark: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    addressType: {
        type: String,
        enum: ["Home", "Work", "Other"],
        default: "Home",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDefault: { type: Boolean, default: false },
})

module.exports = mongoose.model('user-address', addressSchema);