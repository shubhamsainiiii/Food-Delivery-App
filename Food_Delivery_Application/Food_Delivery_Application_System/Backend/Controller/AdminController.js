const admin = require('../Models/AdminModel');
const restaurant = require('../Models/RestaurantOwnerModel');
const deliveryboy = require('../Models/DeliverBoyModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;
const moment = require('moment');
const { uploadImage } = require('../Helper/Helper')

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

exports.getalldeliveryboy = async (req, res) => {
    try {
        const deliveryboys = await deliveryboy.find();
        res.status(202).send({ success: true, data: deliveryboys });
    } catch (error) {
        console.error("Error fetching delivery boy:", error);
        res.status(500).send({ success: false, message: 'Failed to fetch delivery boy', error: error.message });
    }
};


exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const admininUser = await user.findOne({ email, role: 'admin' });

        if (!admininUser) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admininUser.otp || !admininUser.otpexpire) {
            return res.status(400).json({ message: 'OTP not found or already used' });
        }

        if (admininUser.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (moment().isAfter(admininUser.otpexpire)) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Clear OTP fields
        admininUser.otp = undefined;
        admininUser.otpexpire = undefined;
        await admininUser.save();

        return res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error("Error in verifyOtp:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.handleDeliveryBoyApproval = async (req, res) => {
    const { id, action } = req.params;
    if (!['approved', 'rejected'].includes(action)) {
        return res.status(404).json({ message: "Invalid action" });
    }

    const updated = await deliveryboy.findByIdAndUpdate(id, { status: action }, { new: true });
    if (!updated) return res.status(404).json({ message: "Delivery boy not found" });

    await user.findOneAndUpdate(
        { deliveryBoyId: updated._id, role: 'delivery-boy' },
        { status: action }
    );
    res.json({ message: `Delivery boy ${action}`, deliveryBoy: updated });
};

exports.getalluser = async (req, res) => {
    try {
        const userdata = await user.find({ role: 'user' })
        return res.status(202).send({ success: true, data: userdata });
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: "failed to fetch users", error: error.message })
    }
}

exports.getrestaurantbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantData = await restaurant.findById(id)
        console.log("restaurantdataaaaaaaaa", restaurantData);
        if (!restaurantData) {
            return res.status(404).send({ message: "no restaurant found" });
        }
        return res.status(202).send({ message: "restaurant found", restaurantData });
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: "failed to fetch restaurant", error: error.message })
    }
}


exports.getdeliveryboybyId = async (req, res) => {
    try {
        const { id } = req.params;
        const deliverybotData = await deliveryboy.findById(id);
        console.log("deliveryboydataaaaaaaa", deliverybotData)
        if (!deliverybotData) {
            return res.status(404).send({ message: "no delivery boy found" });
        }
        return res.status(202).send({ message: "delivery boy found", deliverybotData })
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: "failed to fetch delivery boy", error: error.message })
    }
}

exports.getAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;

        // Find admin by ID
        const adminData = await admin.findById(adminId);
        if (!adminData) {
            return res.status(404).send({ message: "Admin not found" });
        }

        return res.status(200).send({
            message: "Admin fetched successfully",
            data: adminData
        });

    } catch (error) {
        console.error("Error fetching admin:", error);
        return res.status(500).send({ message: error.message });
    }
};


// exports.updateAdmin = async (req, res) => {
//     try {
//         const adminId = req.params.id;
//         console.log("adminId", adminId)
//         const updateData = { ...req.body };
//         console.log("updateData", updateData)

//         const updatedAdmin = await admin.findByIdAndUpdate(adminId, updateData, {
//             new: true,
//             runValidators: true,
//         });

//         if (!updatedAdmin) {
//             return res.status(404).json({ message: 'Admin not found' });
//         }
//         console.log("updated admin", updatedAdmin)

//         const updatedUser = await user.findOneAndUpdate(
//             { adminId: adminId },
//             {
//                 name: updateData.name,
//                 email: updateData.email,
//                 phone: updateData.phone,
//                 image: updateData.image,
//             },
//             { new: true, runValidators: true }
//         );

//         if (!updatedUser) {
//             console.warn(`No linked user found for adminId: ${adminId}`);
//         }

//         return res.status(200).json({
//             message: 'Admin and User profile updated successfully',
//             admin: updatedAdmin,
//             user: updatedUser || null,
//         });
//     } catch (error) {
//         console.error('Error updating admin:', error);
//         return res.status(500).json({ message: error.message });
//     }
// };


exports.updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        console.log("adminId", adminId)
        const updateData = { ...req.body };
        console.log("updateData", updateData)
        console.log("req.filessssss", req.files)
        // If there's an image file to upload
        if (req.files && req.files.images) {
            // Upload images using your helper
            const uploadResults = await uploadImage(req.files);
            console.log("uploadResults", uploadResults)
            if (uploadResults.length > 0) {
                // Assuming first image URL, adjust if multiple images
                updateData.image = uploadResults[0].secure_url;
            }
        }
        console.log("imageeeeee", updateData.image)


        // Update Admin document with new data (including image URL)
        const updatedAdmin = await admin.findByIdAndUpdate(adminId, updateData, {
            new: true,
            runValidators: true,
        });
        console.log("updated admin", updatedAdmin)


        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update linked User document
        const updatedUser = await user.findOneAndUpdate(
            { adminId: adminId },
            {
                name: updateData.name,
                email: updateData.email,
                phone: updateData.phone,
                image: updateData.image,
            },
            { new: true, runValidators: true }
        );
        console.log("updated admin in user table ", updatedUser)
        if (!updatedUser) {
            console.warn(`No linked user found for adminId: ${adminId}`);
        }

        return res.status(200).json({
            message: 'Admin and User profile updated successfully',
            admin: updatedAdmin,
            user: updatedUser || null,
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        return res.status(500).json({ message: error.message });
    }
};
