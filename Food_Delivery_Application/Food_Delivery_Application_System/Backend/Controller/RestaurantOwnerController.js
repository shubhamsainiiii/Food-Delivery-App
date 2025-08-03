const Restaurant = require('../Models/RestaurantOwnerModel');
const user = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uploadImage } = require('../Helper/Helper');
const secretkey = process.env.SECRETKEY;


exports.signupRestaurant = async (req, res) => {
    try {
        const { restaurantName, name, email, phone, password, address, gstnumber, cuisineType, openingHours } = req.body;

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (err) {
                return res.status(400).json({ message: 'Invalid address format' });
            }
        }
        if (!(restaurantName && name && email && phone && password)) {
            return res.status(404).send({ message: "all input required" });
        }
        const existing = await Restaurant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);

        if (!req.files || !req.files.images) {
            return res.status(400).json({ message: "No images uploaded" });
        }
        const image = await uploadImage(req.files);
        console.log("image======", image)
        const imageurl = image.map(img => img.secure_url);
        console.log("imageurl=====", imageurl)

        const data = { restaurantName, name, email, phone, password: hashpass, address: parsedAddress, gstnumber, cuisineType, openingHours, status: 'pending', image: imageurl };

        const newRestaurant = new Restaurant(data);
        await newRestaurant.save();
        console.log("newRestaurant=====", newRestaurant)

        const newuser = { name, email, phone, password: hashpass, image: imageurl[0], role: 'restaurant', restaurantId: newRestaurant._id, status: 'pending' };
        const userData = new user(newuser);
        await userData.save();
        console.log("restaurant data in user table : ", userData);
        res.status(201).json({ message: 'Signup successful', data: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};


exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        console.log("updates....", updates)
        const updated = await Restaurant.findByIdAndUpdate(id, { $set: updates }, { new: true });
        console.log("updated....", updated)
        if (!updated) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(200).json({ message: 'Profile updated successfully', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error: error.message });
    }
};

exports.loginrestaurant = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(404).json({ message: 'All input required' });
        }
        const existingMail = await Restaurant.findOne({ email });
        if (!existingMail) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        if (existingMail.status === 'pending') {
            return res.status(404).json({ message: 'Account not yet approved by admin.' });
        }
        if (existingMail.status === 'rejected') {
            return res.status(404).json({ message: 'Your signup was rejected by admin.' });
        }
        // (optional) you can check status !== 'approved' if more states come in future
        const match = await bcrypt.compare(password, existingMail.password);
        if (!match) {
            return res.status(404).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: existingMail._id, email: existingMail.email, role: 'restaurant', restaurantId: existingMail.restaurantId }, secretkey, { expiresIn: '24h' });
        res.status(202).send({
            message: 'Login successful', role: 'restaurant', token
        });
    } catch (error) {
        res.status(500).send({ message: 'Login failed', error: error.message });
    }
}


exports.getRestaurantDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findOne({ _id: id }).select('name restaurantName');
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(202).send({ name: restaurant.name, restaurantName: restaurant.restaurantName });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant details', error: error.message });
    }
};


exports.getallrestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        if (!restaurants || restaurants.length === 0) {
            return res.status(404).json({ message: 'No restaurants found' });
        }

        res.status(200).json({
            message: 'All restaurants fetched successfully',
            data: restaurants
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch restaurants',
            error: error.message
        });
    }
};