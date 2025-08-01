// const cart = require('../Models/CartModel');

// exports.addtoCart = async (req, res) => {
//     const { foodItemId, quantity } = req.body;
//     if (!foodItemId) {
//         return res.status(404).send({ message: "food item is required" });
//     }
//     const qnty = quantity && quantity > 0 ? quantity : 0;

//     let existingCartItem = await cart.findOne({ userId: req.user._id, foodItemId });

//     if (existingCartItem) {
//         existingCartItem.quantity += qnty;
//         await existingCartItem.save();
//         return res.status(200).send(existingCartItem);
//     }
//     const newCartItem = new cart({
//         userId: req.user._id,
//         foodItemId,
//         quantity: qnty
//     });
//     await newCartItem.save();
//     return res.status(201).send({ message: "add to cart successfull", newCartItem })
// }


// exports.getCartItems = async (req, res) => {
//     try {
//         // const cartItems = await cart.find({ userId: req.user._id }).populate('foodItemId');
//         const cartItems = await cart.find({ userId: req.user._id })
//             .populate({
//                 path: 'foodItemId',
//                 populate: { path: 'images' } // if images is a referenced model
//             });

//         res.status(200).send(cartItems);
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };

// exports.updateCartItem = async (req, res) => {
//     try {
//         const { foodItemId, quantity } = req.body;

//         if (!foodItemId || quantity === undefined) {
//             return res.status(400).send({ message: 'foodItemId and quantity are required' });
//         }

//         if (quantity < 1) {
//             return res.status(400).send({ message: 'Quantity must be at least 1' });
//         }

//         const cartItem = await cart.findOne({ userId: req.user._id, foodItemId });
//         if (!cartItem) {
//             return res.status(404).send({ message: 'Cart item not found' });
//         }

//         cartItem.quantity = quantity;
//         await cartItem.save();

//         res.status(200).send(cartItem);
//     } catch (error) {
//         console.error('Error updating cart item:', error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };

// exports.removeCartItem = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const cartItem = await cart.findOneAndDelete({ _id: id, userId: req.user._id });

//         if (!cartItem) {
//             return res.status(404).send({ message: 'Cart item not found or already deleted' });
//         }
//         console.log("cart item ======", cartItem);
//         res.status(200).send({ message: 'Cart item removed successfully' });
//     } catch (error) {
//         console.error('Error removing cart item:', error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };

// exports.clearCart = async (req, res) => {
//     try {
//         await cart.deleteMany({ userId: req.user._id });
//         res.status(200).send({ message: 'Cart cleared successfully' });
//     } catch (error) {
//         console.error('Error clearing cart:', error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };

const cart = require('../Models/CartModel');
const foodImage = require('../Models/FoodImageModel');

exports.addtoCart = async (req, res) => {
    const { foodItemId, quantity } = req.body;
    if (!foodItemId) {
        return res.status(404).send({ message: "food item is required" });
    }
    const qnty = quantity && quantity > 0 ? quantity : 0;

    let existingCartItem = await cart.findOne({ userId: req.user._id, foodItemId });

    if (existingCartItem) {
        existingCartItem.quantity += qnty;
        await existingCartItem.save();
        return res.status(200).send(existingCartItem);
    }
    const newCartItem = new cart({
        userId: req.user._id,
        foodItemId,
        quantity: qnty
    });
    await newCartItem.save();
    return res.status(201).send({ message: "add to cart successfull", newCartItem })
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await cart.find({ userId: req.user._id })
            .populate('foodItemId')
            .lean();

        const foodItemIds = cartItems.map(item => item.foodItemId?._id);

        const images = await foodImage.find({ foodItemId: { $in: foodItemIds } });

        const imageMap = images.reduce((acc, img) => {
            if (!acc[img.foodItemId]) acc[img.foodItemId] = [];
            acc[img.foodItemId].push(img);
            return acc;
        }, {});

        const enrichedCartItems = cartItems.map(item => {
            item.foodItemId.images = imageMap[item.foodItemId._id] || [];
            return item;
        });

        res.status(200).send(enrichedCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { foodItemId, quantity } = req.body;
        if (!foodItemId || quantity === undefined) {
            return res.status(400).send({ message: 'foodItemId and quantity are required' });
        }
        if (quantity < 1) {
            return res.status(400).send({ message: 'Quantity must be at least 1' });
        }
        const cartItem = await cart.findOne({ userId: req.user._id, foodItemId });
        if (!cartItem) {
            return res.status(404).send({ message: 'Cart item not found' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).send(cartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await cart.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!cartItem) {
            return res.status(404).send({ message: 'Cart item not found or already deleted' });
        }
        res.status(200).send({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await cart.deleteMany({ userId: req.user._id });
        res.status(200).send({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};