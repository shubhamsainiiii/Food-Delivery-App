const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');

router.post('/adminsignup', adminController.adminSignUp);
router.post('/adminlogin', adminController.adminLogin);
router.patch('/restaurantrequest/:id/:action', adminController.handleRestaurantApproval);
router.get('/getallrestaurant', adminController.getallrestaurant);
router.get('/getdeliveryboy', adminController.getalldeliveryboy);
router.patch('/deliveryboyrequest/:id/:action', adminController.handleDeliveryBoyApproval);
router.get('/getallusers', adminController.getalluser);



module.exports = router;