const deliveryBoy = require('../Models/DeliverBoyModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImage } = require('../Helper/Helper')
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
        const newuser = { name, email, phone, password: hashpass, status: 'pending', role: 'delivery-boy', deliveryBoyId: deliveryBoyData._id };
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




// exports.updateDeliveryBoy = async (req, res) => {
//     try {
//         const deliveryBoyId = req.user._id; // assuming login token gives this
//         console.log("iddddddddd", deliveryBoyId)
//         const { name, phone, address, vehicleNumber, aadharNumber } = req.body;

//         // Find delivery boy first
//         const deliveryBoyData = await deliveryBoy.findById(deliveryBoyId);
//         if (!deliveryBoyData) {
//             return res.status(404).send({ message: "Delivery boy not found" });
//         }
//         console.log("deliveryboyyyyyy", deliveryBoyData)
//         // Handle image upload if present
//         if (req.files && req.files.profileImage) {
//             const uploadedImages = await uploadImage({ images: req.files.profileImage });
//             if (uploadedImages.length > 0) {
//                 deliveryBoyData.profileImage = uploadedImages[0].secure_url;
//             }
//         }

//         // Update fields
//         if (name) deliveryBoyData.name = name;
//         if (phone) deliveryBoyData.phone = phone;
//         if (address) deliveryBoyData.address = address;
//         if (vehicleNumber) deliveryBoyData.vehicleNumber = vehicleNumber;
//         if (aadharNumber) deliveryBoyData.aadharNumber = aadharNumber;

//         // Save updated document
//         await deliveryBoyData.save();

//         return res.status(200).send({
//             message: "Delivery boy updated successfully",
//             deliveryBoy: deliveryBoyData
//         });
//     } catch (error) {
//         console.error("Update Error:", error);
//         return res.status(500).send({
//             message: "Failed to update delivery boy",
//             error: error.message
//         });
//     }
// };

exports.updateDeliveryBoy = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find the logged-in user
        const userData = await user.findById(userId);
        if (!userData || userData.role !== 'delivery-boy') {
            return res.status(404).json({ message: "User not found or not a delivery boy" });
        }

        // 2. Get the deliveryBoyId from user document
        const deliveryBoyId = userData.deliveryBoyId;
        if (!deliveryBoyId) {
            return res.status(404).json({ message: "Linked delivery boy not found in user" });
        }

        // 3. Find delivery boy document
        const deliveryBoyData = await deliveryBoy.findById(deliveryBoyId);
        if (!deliveryBoyData) {
            return res.status(404).json({ message: "Delivery boy document not found" });
        }

        const { name, phone, address, vehicleNumber, aadharNumber } = req.body;

        // 4. Handle image upload
        if (req.files && req.files.image) {
            const uploadedImages = await uploadImage({ images: req.files.image });
            if (uploadedImages.length > 0) {
                deliveryBoyData.image = uploadedImages[0].secure_url;
                userData.image = uploadedImages[0].secure_url;
            }
        }

        // 5. Update fields
        if (name) {
            deliveryBoyData.name = name;
            userData.name = name;
            // userData.image = image;
        }
        if (phone) {
            deliveryBoyData.phone = phone;
            userData.phone = phone;
        }
        if (address) deliveryBoyData.address = address;
        if (vehicleNumber) deliveryBoyData.vehicleNumber = vehicleNumber;
        if (aadharNumber) deliveryBoyData.aadharNumber = aadharNumber;

        // 6. Save both
        await deliveryBoyData.save();
        await userData.save();

        return res.status(200).json({
            message: "Delivery boy and user updated successfully",
            deliveryBoy: deliveryBoyData,
            user: userData
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({
            message: "Failed to update delivery boy",
            error: error.message
        });
    }
};

exports.getdeliverboy = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware (decoded JWT)
        console.log("userIddddddd", userId)
        const userData = await user.findById(userId);
        console.log("userDataaaaaaaaaa", userData)
        if (!userData || userData.role !== 'delivery-boy') {
            return res.status(404).json({ message: "User not found or not a delivery boy" });
        }
        const deliveryBoyId = userData.deliveryBoyId;
        console.log("userIddddddd.delibveryboyIddddddd", userData.deliveryBoyId)
        if (!deliveryBoyId) {
            return res.status(404).json({ message: "Linked delivery boy not found in user record" });
        }

        const deliveryBoyData = await deliveryBoy.findById(deliveryBoyId);
        console.log("deliveryboyDatataaaaaaaaaaaaa", deliveryBoyData)
        if (!deliveryBoyData) {
            return res.status(404).json({ message: "Delivery boy document not found" });
        }

        return res.status(200).json({
            message: "Delivery boy details fetched successfully",
            deliveryBoy: deliveryBoyData,
            user: userData
        });

    } catch (error) {
        console.error("Get Delivery Boy Error:", error);
        return res.status(500).json({
            message: "Failed to fetch delivery boy details",
            error: error.message
        });
    }
};
