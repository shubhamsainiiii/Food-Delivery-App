// const mongoose = require('mongoose');

// const deliveryBoySchema = new mongoose.Schema({
//     name: { type: String, trim: true, required: true },
//     email: { type: String, trim: true, unique: true, required: true },
//     phone: { type: String, trim: true, required: true },
//     password: { type: String, trim: true, required: true },
//     image: { type: String },
//     address: { type: String, trim: true },
//     vehicleNumber: { type: String, trim: true },
//     aadharNumber: { type: String, trim: true },
//     location: {
//         latitude: { type: Number },
//         longitude: { type: Number }
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'approved', 'rejected'],
//         default: 'pending'
//     },
// })
// deliveryBoySchema.index({ currentLocation: "2dsphere" });

// module.exports = mongoose.model('Delivery-Boy', deliveryBoySchema)

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
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

deliveryBoySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Delivery-Boy', deliveryBoySchema);
