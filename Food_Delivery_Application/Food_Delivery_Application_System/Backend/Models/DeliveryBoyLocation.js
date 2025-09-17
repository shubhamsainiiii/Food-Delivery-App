const mongoose = require('mongoose');

const deliveryboylocationSchema = new mongoose.Schema({
    deliveryBoyId: { type: mongoose.Schema.ObjectId, ref: 'Delivery-Boy' },
    latitude: { type: Number },
    longitude: { type: Number }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Delivery-Boy-Location', deliveryboylocationSchema)