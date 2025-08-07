const mongooose = require('mongoose');
const moment = require('moment')
const invoiceSchema = new mongooose.Schema({
    addressId: { type: mongooose.Schema.ObjectId, ref: 'user-address' },
    userId: { type: mongooose.Schema.ObjectId, ref: 'User' },
    date: { type: String, default: () => moment().toDate() },
    total: { type: Number },
    status: {
        type: String,
        enum: ['pending', 'completed', 'on the way', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true, versionKey: false })

module.exports = mongooose.model('Invoice', invoiceSchema);