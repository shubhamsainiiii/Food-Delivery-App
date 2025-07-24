const Restaurant = require('../Models/RestaurantOwnerModel');
const user = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretkey = process.env.SECRETKEY;

exports.signupRestaurant = async (req, res) => {
    try {
        const { restaurantName, name, email, phone, password } = req.body;
        if (!(restaurantName && name && email && phone && password)) {
            return res.status(404).send({ message: "all input required" });
        }
        const existing = await Restaurant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);

        const data = { restaurantName, name, email, phone, password: hashpass, status: 'pending' };
        const newRestaurant = new Restaurant(data);
        await newRestaurant.save();
        const newuser = { ...data, role: 'restaurant', restaurantId: newRestaurant._id };
        const userData = new user(newuser);
        await userData.save()
        console.log('restaurant data in user table : ', userData)
        res.status(202).json({ message: 'Signup successful', data: newRestaurant });

    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updated = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
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
