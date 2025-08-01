const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const addressController = require('../Controller/AddressController')
const auth = require('../Middleware/Auth')

router.post('/usersignup', userController.usersignup);
router.post('/userlogin', userController.loginuser);
// router.get('/getuser', userController.getuser);
router.post('/sendotp', userController.sendotp);
router.post('/createaddress', auth, addressController.createAddress);
router.put('/updateaddress/:id', auth, addressController.updateAddress);
router.get('/alladdress', auth, addressController.allAddress);
router.get('/addressbyid', auth, addressController.addressById);
router.put('/update', auth, userController.updateProfile);
router.get('/getuser', auth, userController.getuser);
router.delete('/deleteaddress/:id', auth, addressController.deleteaddress)
module.exports = router;
