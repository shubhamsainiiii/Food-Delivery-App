const mongooose = require('mongoose');
const moment = require('moment')
const invoiceSchema = new mongooose.Schema({
    addressId: { type: mongooose.Schema.ObjectId, ref: 'user-address' },
    userId: { type: mongooose.Schema.ObjectId, ref: 'User' },
    date: { type: String, default: () => moment().toDate() },
}, { timestamps: true, versionKey: false })

module.exports = mongooose.model('Invoice', invoiceSchema);