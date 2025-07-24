const deliveryBoy = require('../Models/DeliverBoyModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;

exports.SignupDeliveryBoy = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!(name && email && phone && password)) {
            return res.status(404).send({ message: "all input required" });
        }
        const existingMail = await deliveryBoy.findOne({ email });
        if (existingMail) {
            return res.status(404).send({ message: "Admin Already Exist" });
        }
        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);
        const data = { name, email, phone, password: hashpass };
        const deliveryBoyData = new deliveryBoy(data);
        await deliveryBoyData.save();
        console.log("delivery Boy data :", deliveryBoyData);
        const newuser = { ...data, role: 'delivery-boy', deliveryBoyId: deliveryBoyData._id };
        const userData = new user(newuser);
        await userData.save()
        console.log('delivery Boy data in user table : ', userData)
        return res.status(202).send({ message: "Delivery Boy Signup Successfully", deliveryBoyData })
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.loginDeliveryBoy = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(404).send({ message: "All input required" });
        }
        const existing = await deliveryBoy.findOne({ email });
        if (!existing) {
            return res.status(404).send({ message: "No delivery boy found with this email" });
        }
        const match = await bcrypt.compare(password, existing.password);
        if (!match) {
            return res.status(404).send({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ email: existing.email }, secretkey, { expiresIn: '24h' });
        return res.status(202).send({
            message: "Delivery Boy Login Successful", role: existing.role, token
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}