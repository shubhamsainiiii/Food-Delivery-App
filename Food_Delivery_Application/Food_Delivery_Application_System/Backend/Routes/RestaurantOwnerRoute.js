const express = require('express');
const router = express.Router();
const restaurantController = require('../Controller/RestaurantOwnerController');
const Auth = require('../Middleware/Auth');

router.post('/restaurantsignup', restaurantController.signupRestaurant);
router.post('/restaurantlogin', restaurantController.loginrestaurant);
router.put('/restaurantupdate/:id', Auth, restaurantController.updateRestaurant);
router.get('/:id', restaurantController.getRestaurantDetails);
router.get('/', restaurantController.getallrestaurant);

module.exports = router;