const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;

exports.usersignup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!(name && email && phone && password)) {
            return res.status(404).send({ message: "all input required" });
        }
        const existingMail = await user.findOne({ email });
        if (existingMail) {
            return res.status(404).send({ message: "user Already Exist" });
        }
        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);
        const data = { name, email, phone, password: hashpass };
        const userData = new user(data);
        await userData.save();
        console.log("userData", userData)
        return res.status(202).send({ message: "User Sign Up successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingMail = await user.findOne({ email });
        if (!existingMail) {
            return res.status(404).send({ message: "user Not Exist" });
        }
        const dbpass = existingMail.password;
        const match = bcrypt.compare(password, dbpass);
        if (!match) {
            return res.status(404).send({ message: "Enter Correct Password" });
        }
        const token = jwt.sign({ email: existingMail.email }, secretkey, { expiresIn: '24h' })
        return res.status(202).send({
            message: "user Logged in Successfully", role: existingMail.role, token
        });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.getuser = async (req, res) => {
    const user = req.user;
    try {
        if (user.role === 'admin') {
            const data = await user.find();
            return res.status(202).send(data)
        }
        else if (user.role === 'user') {
            const data = await user.findById({ _id: user._id });
            return res.status(202).send(data);
        }
        else {
            ret
            return res.status(404).send({ message: "you can't access the data" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}