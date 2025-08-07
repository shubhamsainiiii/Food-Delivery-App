const invoice = require('../Models/InvoiceModel');


exports.createInvoice = async (req, res) => {
    try {
        const { addressId, userId, total } = req.body;
        if (!(addressId && userId && total)) {
            return res.status(404).send({ message: "error", error: error.message });
        }
        const newInvoice = new invoice({ addressId, userId, total, date: moment().format() })
        const invoiceData = await newInvoice.save();
        return res.status(202).send({ message: "invoice created", invoiceData })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).send({ message: "server error", error: error.message });
    }
}