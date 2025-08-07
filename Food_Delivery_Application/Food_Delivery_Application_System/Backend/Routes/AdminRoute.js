const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');
const auth = require('../Middleware/Auth')


router.post('/adminsignup', adminController.adminSignUp);
router.post('/adminlogin', adminController.adminLogin);
router.patch('/restaurantrequest/:id/:action', adminController.handleRestaurantApproval);
router.get('/getallrestaurant', adminController.getallrestaurant);
router.get('/getdeliveryboy', adminController.getalldeliveryboy);
router.patch('/deliveryboyrequest/:id/:action', adminController.handleDeliveryBoyApproval);
router.get('/getallusers', adminController.getalluser);
router.get('/restaurant/:id', auth, adminController.getrestaurantbyId)
router.get('/deliveryboy/:id', auth, adminController.getdeliveryboybyId)

module.exports = router;