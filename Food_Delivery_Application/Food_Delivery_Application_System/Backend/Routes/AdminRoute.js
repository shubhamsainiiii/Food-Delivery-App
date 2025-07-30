const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');

router.post('/adminsignup', adminController.adminSignUp);
router.post('/adminlogin', adminController.adminLogin);
router.patch('/restaurantrequest/:id/:action', adminController.handleRestaurantApproval);
router.get('/getallrestaurant', adminController.getallrestaurant);



module.exports = router;