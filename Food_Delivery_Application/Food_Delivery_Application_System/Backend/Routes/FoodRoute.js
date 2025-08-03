const express = require("express")
const router = express.Router()
const foodController = require('../Controller/FoodController');
const auth = require('../Middleware/Auth');

router.post("/addfood", auth, foodController.addfood);
router.get("/", foodController.getallfood)
router.get('/restaurant/foods', auth, foodController.getFoodsByRestaurant);  // new endpoint
router.put('/update/:id', auth, foodController.updateFoodItem);              // new update
router.get('/:id', auth, foodController.getFoodById);                       // get one food
router.delete('/:id', auth, foodController.deleteFoodItem);                 // delete

module.exports = router

