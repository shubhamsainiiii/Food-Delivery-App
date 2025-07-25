const express = require("express")
const router = express.Router()
const foodController = require('../Controller/FoodController');
const auth = require('../Middleware/Auth');

router.post("/addfood", auth, foodController.addFood);
module.exports = router