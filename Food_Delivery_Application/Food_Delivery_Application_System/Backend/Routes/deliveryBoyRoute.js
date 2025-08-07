const express = require('express');
const router = express.Router();
const deliveryboyController = require('../Controller/deliveryBoyController');
const auth = require('../Middleware/Auth')

router.post('/deliveryboysignup', deliveryboyController.SignupDeliveryBoy);
router.post('/deliveryboylogin', deliveryboyController.loginDeliveryBoy);
router.put('/updatedeliveryboy', auth, deliveryboyController.updateDeliveryBoy);

module.exports = router;
