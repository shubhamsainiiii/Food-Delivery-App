const express = require('express');
const invoiceController = require('../Controller/InvoiceController')
const auth = require('../Middleware/Auth');
const router = express.Router();

router.post('/createinvoice', auth, invoiceController.createInvoice)


module.exports = router;
