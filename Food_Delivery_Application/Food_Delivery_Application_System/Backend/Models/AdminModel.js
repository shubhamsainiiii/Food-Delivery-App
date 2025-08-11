const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    otp: { type: String },
    otpexpire: { type: Date },
    image: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Admin', AdminSchema);