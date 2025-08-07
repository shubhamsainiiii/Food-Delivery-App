const mongooose = require('mongoose');

const oredrSchema = new mongooose.Schema({
    invoiceId: { type: mongooose.Schema.ObjectId, ref: 'Invoice' },
    userId: { type: mongooose.Schema.ObjectId, ref: 'User' },
    quantity: { type: Number },
    foodItemId: { type: mongooose.Schema.ObjectId, ref: 'food-items' },
    images: { type: [Object] },
    status: {
        type: String,
        enum: ['pending', 'completed', 'on the way', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true, versionKey: false })

module.exports = mongooose.model('Order', oredrSchema);