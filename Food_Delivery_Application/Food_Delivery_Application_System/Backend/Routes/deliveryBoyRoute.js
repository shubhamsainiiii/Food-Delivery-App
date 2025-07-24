const express = require('express');
const router = express.Router();
const deliveryboyController = require('../Controller/deliveryBoyController');

router.post('/deliveryboysignup', deliveryboyController.SignupDeliveryBoy);
router.post('/deliveryboylogin', deliveryboyController.loginDeliveryBoy);

module.exports = router;
