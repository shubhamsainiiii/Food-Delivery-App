const express = require('express')
const auth = require('../Middleware/Auth');
const orderController = require('../Controller/OrderController')
const router = express.Router();

router.post('/createorder', auth, orderController.createOrder);
router.get('/getallorder', auth, orderController.getallorders);
router.get('/getorder/:id', auth, orderController.getOrderByInvoiceId);

module.exports = router;
