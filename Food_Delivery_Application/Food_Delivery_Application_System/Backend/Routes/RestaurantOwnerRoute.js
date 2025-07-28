const express = require('express');
const router = express.Router();
const restaurantController = require('../Controller/RestaurantOwnerController');

router.post('/restaurantsignup', restaurantController.signupRestaurant);
router.post('/restaurantlogin', restaurantController.loginrestaurant);
router.put('/restaurantupdate', restaurantController.updateRestaurant);
router.get('/:id', restaurantController.getRestaurantDetails);
router.get('/', restaurantController.getallrestaurant);

module.exports = router;