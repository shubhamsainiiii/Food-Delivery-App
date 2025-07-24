const admin = require('../Models/AdminModel');
const restaurant = require('../Models/RestaurantOwnerModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;


exports.adminSignUp = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!(name && email && phone && password)) {
            return res.status(404).send({ message: "all input required" });
        }
        const existingMail = await admin.findOne({ email });
        if (existingMail) {
            return res.status(404).send({ message: "Admin Already Exist" });
        }
        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);
        const data = { name, email, phone, password: hashpass };
        const adminData = new admin(data);
        await adminData.save();
        console.log("Admin data in admin table :", adminData);
        const newuser = { ...data, role: 'admin', adminId: adminData._id };
        const userData = new user(newuser);
        await userData.save()
        console.log('admin data in user table : ', userData)
        return res.status(202).send({ message: "Admin Created Successfully", adminData, userData })
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingMail = await admin.findOne({ email });
        if (!existingMail) {
            return res.status(404).send({ message: "Admin Not Exist" });
        }
        const dbpass = existingMail.password;
        const match = bcrypt.compare(password, dbpass);
        if (!match) {
            return res.status(404).send({ message: "Enter Correct Password" });
        }
        const token = jwt.sign({ email: existingMail.email }, secretkey, { expiresIn: '24h' })
        return res.status(202).send({
            message: "Admin Logged in Successfully", role: existingMail.role, token
        });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.handleRestaurantApproval = async (req, res) => {
    const { id, action } = req.params;
    if (!['approved', 'rejected'].includes(action)) {
        return res.status(404).json({ message: "Invalid action" });
    }
    const updated = await restaurant.findByIdAndUpdate(id, { status: action }, { new: true });
    if (!updated) return res.status(404).json({ message: "Restaurant not found" });
    await user.findOneAndUpdate(
        { restaurantId: updated._id, role: 'restaurant' },
        { status: action }
    );

    res.json({ message: `Restaurant ${action}`, restaurant: updated });
};


exports.getallrestaurant = async (req, res) => {
    try {
        const restaurants = await restaurant.find();
        res.status(202).send({ success: true, data: restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send({ success: false, message: 'Failed to fetch restaurants', error: error.message });
    }
};
