const deliveryBoy = require('../Models/DeliverBoyModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImage } = require('../Helper/Helper')
const secretkey = process.env.SECRETKEY;
const DeliveryBoyLocation = require('../Models/DeliveryBoyLocation')



// exports.SignupDeliveryBoy = async (req, res) => {
//     try {
//         const { name, email, phone, password, latitude, longitude } = req.body;

//         if (!(name && email && phone && password && latitude && longitude)) {
//             return res.status(400).send({ message: "All input required including latitude & longitude" });
//         }

//         const existingMail = await deliveryBoy.findOne({ email });
//         if (existingMail) {
//             return res.status(409).send({ message: "Delivery Boy already exists" });
//         }

//         const salt = bcrypt.genSaltSync(12);
//         const hashpass = bcrypt.hashSync(password, salt);

//         const deliveryBoyData = new deliveryBoy({
//             name,
//             email,
//             phone,
//             password: hashpass,
//             location: {
//                 type: "Point",
//                 coordinates: [longitude, latitude]
//             }
//         });

//         await deliveryBoyData.save();

//         // Also save to user table
//         const userData = new user({
//             name,
//             email,
//             phone,
//             password: hashpass,
//             status: 'pending',
//             role: 'delivery-boy',
//             deliveryBoyId: deliveryBoyData._id
//         });

//         await userData.save();

//         return res.status(201).send({
//             message: "Delivery Boy Signup Successfully",
//             deliveryBoyData
//         });

//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// };

// Login

exports.SignupDeliveryBoy = async (req, res) => {
    try {
        const { name, email, phone, password, latitude, longitude } = req.body;

        if (!(name && email && phone && password && latitude && longitude)) {
            return res.status(400).send({ message: "All input required including latitude & longitude" });
        }

        const existingMail = await deliveryBoy.findOne({ email });
        if (existingMail) {
            return res.status(409).send({ message: "Delivery Boy already exists" });
        }

        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);

        // Save delivery boy data
        const deliveryBoyData = new deliveryBoy({
            name,
            email,
            phone,
            password: hashpass
        });
        await deliveryBoyData.save();

        // Save location data in DeliveryBoyLocation table
        const locationData = new DeliveryBoyLocation({
            deliveryBoyId: deliveryBoyData._id,
            latitude,
            longitude
        });
        await locationData.save();
        console.log("locationDataaaaaaaa", locationData)
        // Also save to User table
        const userData = new user({
            name,
            email,
            phone,
            password: hashpass,
            status: 'pending',
            role: 'delivery-boy',
            deliveryBoyId: deliveryBoyData._id
        });
        await userData.save();

        return res.status(201).send({
            message: "Delivery Boy Signup Successfully",
            deliveryBoy: deliveryBoyData,
            location: locationData
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// exports.loginDeliveryBoy = async (req, res) => {
//     try {
//         const { email, password, latitude, longitude } = req.body;
//         if (!(email && password && latitude && longitude)) {
//             return res.status(400).send({ message: "All input required including latitude & longitude" });
//         }

//         const existing = await deliveryBoy.findOne({ email });
//         if (!existing) {
//             return res.status(404).send({ message: "No delivery boy found with this email" });
//         }

//         const match = await bcrypt.compare(password, existing.password);
//         if (!match) {
//             return res.status(401).send({ message: "Invalid email or password" });
//         }

//         // ✅ update location using helper
//         await updateDeliveryBoyLocation(email, latitude, longitude);

//         const token = jwt.sign({ email: existing.email }, secretkey, { expiresIn: '24h' });

//         return res.status(200).send({
//             message: "Delivery Boy Login Successful",
//             role: 'delivery-boy',
//             token
//         });

//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// };



// deliveryBoyController.js


exports.loginDeliveryBoy = async (req, res) => {
    try {
        const { email, password, latitude, longitude } = req.body;
        if (!(email && password && latitude && longitude)) {
            return res.status(400).send({ message: "All input required including latitude & longitude" });
        }

        const existing = await deliveryBoy.findOne({ email });
        if (!existing) {
            return res.status(404).send({ message: "No delivery boy found with this email" });
        }

        const match = await bcrypt.compare(password, existing.password);
        if (!match) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Update location
        await updateDeliveryBoyLocation(existing._id, latitude, longitude);
        console.log("updateDeliveryBoyLocationnnnnnnnn", updateDeliveryBoyLocation)
        const token = jwt.sign({ email: existing.email }, secretkey, { expiresIn: '24h' });

        return res.status(200).send({
            message: "Delivery Boy Login Successful",
            role: 'delivery-boy',
            token
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};




const updateDeliveryBoyLocation = async (email, latitude, longitude) => {
    const existing = await deliveryBoy.findOne({ email });
    if (!existing) return null;

    existing.location.coordinates = [longitude, latitude];
    await existing.save();
    return existing;
};

// Logout
// exports.logoutDeliveryBoy = async (req, res) => {
//     try {
//         const { email, latitude, longitude } = req.body;
//         if (!(email && latitude && longitude)) {
//             return res.status(400).send({ message: "Email and location required" });
//         }

//         const updated = await updateDeliveryBoyLocation(email, latitude, longitude);
//         if (!updated) {
//             return res.status(404).send({ message: "No delivery boy found with this email" });
//         }

//         return res.status(200).send({ message: "Logout successful & location updated" });

//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// };


exports.logoutDeliveryBoy = async (req, res) => {
    try {
        const { deliveryBoyId, latitude, longitude } = req.body;

        if (!(deliveryBoyId && latitude && longitude)) {
            return res.status(400).send({ message: "All input required including latitude & longitude" });
        }

        await updateDeliveryBoyLocation(deliveryBoyId, latitude, longitude);

        return res.status(200).send({ message: "Delivery Boy Logout Successful & Location Updated" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


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
