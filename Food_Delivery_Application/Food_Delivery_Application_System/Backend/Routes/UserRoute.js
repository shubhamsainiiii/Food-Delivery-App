const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

router.post('/usersignup', userController.usersignup);
router.post('/userlogin', userController.loginuser);
router.get('/getuser', userController.getuser);

module.exports = router;
