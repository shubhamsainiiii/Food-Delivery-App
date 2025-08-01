const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;
const nodemailer = require('nodemailer');
const moment = require('moment');
const { uploadImage } = require('../Helper/Helper')

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
        console.log(req.body)
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
            message: "user Logged in Successfully", role: existingMail.role, token, user: existingMail
        });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

// exports.getuser = async (req, res) => {
//     const user = req.user;
//     try {
//         if (user.role === 'admin') {
//             const data = await user.find();
//             return res.status(202).send(data)
//         }
//         else if (user.role === 'user') {
//             const data = await user.findById({ _id: user._id });
//             return res.status(202).send(data);
//         }
//         else {
//             ret
//             return res.status(404).send({ message: "you can't access the data" });
//         }
//     }
//     catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }

exports.getuser = async (req, res) => {
    const curUser = req.user;
    try {
        if (!curUser) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        const userData = await user.findById(curUser._id).select("-password -otp -otpexpire");

        const stats = {
            orders: 0, // Replace with count from orders DB
            addresses: 0, // Replace with count from address DB
        };

        const recentOrders = []; // Replace with latest orders if applicable

        return res.status(200).send({ user: userData, stats, recentOrders });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.sendotp = async (req, res) => {
    const { email } = req.body;
    try {
        // const admin = await admin.findOne({ email });
        const admininUser = await user.findOne({ email, role: 'admin' })
        if (!admininUser) {
            return res.status(404).send({ message: 'admin not found' })
        }
        const genotp = (length) => {
            const min = Math.pow(10, length - 1);
            const max = Math.pow(10, length) - 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const otpcode = genotp(4);
        const otpexpiretime = moment().add(10, 'minutes').toDate();
        admininUser.otp = otpcode;
        admininUser.otpexpire = otpexpiretime;
        await admininUser.save();

        // admin.otp = otpcode;
        // admin.otpexpire = otpexpiretime;
        // await admin.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "shubhamthoi27@gmail.com",
                pass: "ctbt aqyo iyxh rbze"
            }
        })

        const mailOptions = {
            from: "shubhamthoi27@gmail.com",
            to: email,
            subject: 'Reset Password OTP',
            text: `Your OTP is: ${otpcode}`,
        };
        await transporter.sendMail(mailOptions);
        return res.status(202).send({ message: "otp sent successfully" });
    }
    catch (error) {
        console.error("Error in send otp :", error);
        return res.status(500).send({ message: "error", error: error.message });
    }
}

// exports.updateProfile = async (req, res) => {
//     try {
//         // const { name, phone } = req.body;
//         const { name, phone } = req.body;
//         const curuser = req.user;

//         // ✅ Use User model to find by email
//         const existingUser = await user.findOne({ email: curuser.email });
//         if (!existingUser) {
//             return res.status(400).send("User not found");
//         }
//         console.log('existinguser', existingUser)
//         let image;

//         // ✅ Upload image if exists
//         if (req.files && Object.keys(req.files).length > 0) {
//             const imageUpload = await uploadImage(req.files);
//             image = imageUpload[0]?.secure_url || imageUpload[0]?.url; // Ensure compatibility
//         }

//         const updateData = { name, phone };
//         if (image) {
//             updateData.image = image;
//         }

//         // ✅ Use User model to update
//         const updatedProfile = await user.findByIdAndUpdate(
//             existingUser._id,
//             updateData,
//             { new: true }
//         );
//         console.log("updatedProfile", updatedProfile)
//         return res.status(200).send(updatedProfile);
//     } catch (error) {
//         console.error("Profile update error:", error);
//         return res.status(500).json({ error: error.message });
//     }
// };


exports.updateProfile = async (req, res) => {
    try {
        const body = req.body || {};
        const curuser = req.user;

        const existingUser = await user.findOne({ email: curuser.email });
        if (!existingUser) {
            return res.status(400).send("User not found");
        }

        let image;
        if (req.files && Object.keys(req.files).length > 0) {
            const imageUpload = await uploadImage(req.files);
            image = imageUpload[0]?.secure_url || imageUpload[0]?.url;
        }

        // Only include field if it exists AND is not empty string or null
        let updateData = {};
        if (body.name !== undefined && body.name !== null && body.name.trim() !== '') {
            updateData.name = body.name;
        }
        if (body.phone !== undefined && body.phone !== null && body.phone.trim() !== '') {
            updateData.phone = body.phone;
        }
        if (image) {
            updateData.image = image;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send("No valid fields to update");
        }

        const updatedProfile = await user.findByIdAndUpdate(
            existingUser._id,
            updateData,
            { new: true }
        );

        return res.status(200).send(updatedProfile);
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ error: error.message });
    }
};
