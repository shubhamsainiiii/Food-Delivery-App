const foodItem = require('../Models/FoodModel');
const foodImage = require('../Models/FoodImageModel');
const { uploadImage } = require('../Helper/Helper');


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