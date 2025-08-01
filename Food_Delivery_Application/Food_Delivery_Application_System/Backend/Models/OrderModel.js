const mongooose = require('mongoose');

const oredrSchema = new mongooose.Schema({
    invoiceId: { type: mongooose.Schema.ObjectId, ref: 'invoice' },
    cartId: { type: mongooose.Schema.ObjectId, ref: 'Cart' }
}, { timestamps: true, versionKey: false })

module.exports = mongooose.model('Order', oredrSchema);