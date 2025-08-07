const express = require('express');
const router = express.Router();
const cartController = require('../Controller/CartController');
const auth = require('../Middleware/Auth')


router.post('/createcart', auth, cartController.addtoCart);
router.get('/getcart', auth, cartController.getCartItems);
router.put('/updatecart', auth, cartController.updateCartItem);
router.delete('/removecart/:id', auth, cartController.removeCartItem);
router.delete('/', auth, cartController.clearCart);

module.exports = router;