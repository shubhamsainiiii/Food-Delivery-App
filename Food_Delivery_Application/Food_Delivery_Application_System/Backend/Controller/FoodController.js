const foodItem = require('../Models/FoodModel');
const foodImage = require('../Models/FoodImageModel');
const { uploadImage } = require('../Helper/Helper');
const mongoose = require('mongoose')

exports.addfood = async (req, res) => {
    try {
        const { foodName, type, price, description, isAvailable, category } = req.body;
        console.log(req.body, "req.body")
        console.log("req.filesss====", req.files);
        if (!req.user || !req.user.restaurantId) {
            return res.status(403).json({ message: "Not allowed. Restaurant missing" });
        }
        const foodData = { foodName, type, price, description, isAvailable, category, restaurantId: req.user.restaurantId }
        const addedFood = new foodItem(foodData)
        const food = await addedFood.save();
        console.log(food, "food")
        if (!req.files || !req.files.images) {
            return res.status(400).json({ message: "No images uploaded" });
        }
        const image = await uploadImage(req.files);
        console.log("image====", image);
        for (let i = 0; i < image.length; i++) {
            const imageData = {
                foodItemId: food._id,
                imageName: `${foodName} - Image ${i + 1}`,
                imageUrl: image[i].secure_url || image[i].url,
            };
            const imageUpload = new foodImage(imageData);
            await imageUpload.save();
        }
        return res.status(202).send({ message: "food item added successfully", food })
    }
    catch (error) {
        return res.status(500).send({ message: "error", error: error.message })
    }
}

exports.getallfood = async (req, res) => {
    try {
        const allfood = await foodItem.aggregate([
            {
                $lookup: {
                    from: "food-images",
                    localField: "_id",
                    foreignField: "foodItemId",
                    as: "images"
                }
            },
        ])
        if (!allfood || allfood.length === 0) {
            return res.status(404).send({ message: "error", error: error.message })
        }
        return res.status(202).send({ message: "food items get successfully", foodItem: allfood })
    }
    catch (error) {
        console.error("Error fetching food items:", error);
        return res.status(500).send({ message: "An error occurred while fetching food items.", error: error.message });
    }
}

exports.getFoodsByRestaurant = async (req, res) => {
    try {
        if (!req.user || !req.user.restaurantId) {
            return res.status(403).json({ message: "Unauthorized: Missing restaurant info" });
        }
        const restaurantId = req.user.restaurantId;
        const foods = await foodItem.aggregate([
            { $match: { restaurantId: restaurantId } },
            {
                $lookup: {
                    from: "food-images",
                    localField: "_id",
                    foreignField: "foodItemId",
                    as: "images"
                }
            }
        ]);

        res.status(200).json({ foods });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch foods", error: error.message });
    }
};


exports.updateFoodItem = async (req, res) => {
    try {
        const foodId = req.params.id;
        const updates = req.body;

        if (!req.user || !req.user.restaurantId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Ensure the food item belongs to the logged-in restaurant owner
        const food = await foodItem.findOne({ _id: foodId, restaurantId: req.user.restaurantId });

        if (!food) {
            return res.status(404).json({ message: "Food item not found or access denied" });
        }

        // Update allowed fields (you can also validate fields if you want)
        Object.assign(food, updates);
        await food.save();

        res.status(200).json({ message: "Food item updated", food });
    } catch (error) {
        res.status(500).json({ message: "Failed to update food", error: error.message });
    }
};

exports.deleteFoodItem = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!req.user || !req.user.restaurantId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const food = await foodItem.findOneAndDelete({ _id: foodId, restaurantId: req.user.restaurantId });

        if (!food) {
            return res.status(404).json({ message: "Food item not found or access denied" });
        }

        // Optionally, delete corresponding images as well:
        await foodImage.deleteMany({ foodId: foodId });

        res.status(200).json({ message: "Food item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete food", error: error.message });
    }
};





exports.getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodItem.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(foodId) } },
            {
                $lookup: {
                    from: "food-images",
                    localField: "_id",
                    foreignField: "foodItemId",
                    as: "images"
                }
            },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurantId",
                    foreignField: "_id",
                    as: "restaurant"
                }
            },
            { $unwind: "$restaurant" }
        ]);
        if (!food || food.length === 0) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ food: food[0] });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch food", error: error.message });
    }
};
