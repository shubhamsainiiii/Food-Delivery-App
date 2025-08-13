const Restaurant = require('../Models/RestaurantOwnerModel');
const user = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uploadImage } = require('../Helper/Helper');
const secretkey = process.env.SECRETKEY;

// exports.signupRestaurant = async (req, res) => {
//     try {
//         const {
//             restaurantName,
//             name,
//             email,
//             phone,
//             password,
//             address,
//             gstnumber,
//             cuisineType,
//             openingHours
//         } = req.body;

//         // Parse address if sent as JSON string
//         let parsedAddress = address;
//         if (typeof address === 'string') {
//             try {
//                 parsedAddress = JSON.parse(address);
//             } catch {
//                 return res.status(400).json({ message: 'Invalid address format' });
//             }
//         }

//         // Parse opening hours if sent as JSON string
//         let parsedOpeningHours = openingHours;
//         if (typeof openingHours === 'string') {
//             try {
//                 parsedOpeningHours = JSON.parse(openingHours);
//             } catch {
//                 return res.status(400).json({ message: 'Invalid openingHours format' });
//             }
//         }

//         if (!(restaurantName && name && email && phone && password)) {
//             return res.status(404).send({ message: "All input required" });
//         }

//         const existing = await Restaurant.findOne({ email });
//         if (existing) return res.status(400).json({ message: 'Email already registered' });

//         // Hash password
//         const salt = bcrypt.genSaltSync(12);
//         const hashpass = bcrypt.hashSync(password, salt);

//         // Check and upload restaurant images
//         if (!req.files || !req.files.images) {
//             return res.status(400).json({ message: "Restaurant images required" });
//         }
//         const restaurantImages = await uploadImage({ images: req.files.images });
//         const restaurantImageUrls = restaurantImages.map(img => img.secure_url);

//         // Upload owner image (optional but recommended)
//         let ownerImageUrl = '';
//         if (req.files.ownerImage) {
//             const ownerImageUpload = await uploadImage({ images: req.files.ownerImage });
//             ownerImageUrl = ownerImageUpload[0]?.secure_url || '';
//         }

//         // Create restaurant data
//         const restaurantData = {
//             restaurantName,
//             name,
//             email,
//             phone,
//             password: hashpass,
//             address: parsedAddress,
//             gstnumber,
//             cuisineType,
//             openingHours: parsedOpeningHours,
//             status: 'pending',
//             image: restaurantImageUrls,
//             ownerImage: ownerImageUrl
//         };

//         const newRestaurant = new Restaurant(restaurantData);
//         await newRestaurant.save();

//         // Add to user table
//         const userData = new user({
//             name,
//             email,
//             phone,
//             password: hashpass,
//             image: ownerImageUrl || restaurantImageUrls[0], // Prefer owner image if uploaded
//             role: 'restaurant',
//             restaurantId: newRestaurant._id,
//             status: 'pending'
//         });
//         await userData.save();

//         res.status(201).json({ message: 'Signup successful', data: newRestaurant });
//     } catch (error) {
//         res.status(500).json({ message: 'Signup failed', error: error.message });
//     }
// };



exports.signupRestaurant = async (req, res) => {
    try {
        const {
            restaurantName,
            name,
            email,
            phone,
            password,
            address,
            gstnumber,
            cuisineType,
            openingHours,
            latitude,
            longitude
        } = req.body;

        // Address parsing
        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch {
                return res.status(400).json({ message: 'Invalid address format' });
            }
        }

        // Opening hours parsing
        let parsedOpeningHours = openingHours;
        if (typeof openingHours === 'string') {
            try {
                parsedOpeningHours = JSON.parse(openingHours);
            } catch {
                return res.status(400).json({ message: 'Invalid openingHours format' });
            }
        }

        if (!(restaurantName && name && email && phone && password)) {
            return res.status(404).send({ message: "All input required" });
        }

        const existing = await Restaurant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        // Hash password
        const salt = bcrypt.genSaltSync(12);
        const hashpass = bcrypt.hashSync(password, salt);

        // Restaurant images
        if (!req.files || !req.files.images) {
            return res.status(400).json({ message: "Restaurant images required" });
        }
        const restaurantImages = await uploadImage({ images: req.files.images });
        const restaurantImageUrls = restaurantImages.map(img => img.secure_url);

        // Owner image (optional)
        let ownerImageUrl = '';
        if (req.files.ownerImage) {
            const ownerImageUpload = await uploadImage({ images: req.files.ownerImage });
            ownerImageUrl = ownerImageUpload[0]?.secure_url || '';
        }

        // Restaurant data with location
        const restaurantData = {
            restaurantName,
            name,
            email,
            phone,
            password: hashpass,
            address: parsedAddress,
            location: {
                latitude: latitude || null,
                longitude: longitude || null
            },
            gstnumber,
            cuisineType,
            openingHours: parsedOpeningHours,
            status: 'pending',
            image: restaurantImageUrls,
            ownerImage: ownerImageUrl
        };

        const newRestaurant = new Restaurant(restaurantData);
        await newRestaurant.save();

        // Add to user table
        const userData = new user({
            name,
            email,
            phone,
            password: hashpass,
            image: ownerImageUrl || restaurantImageUrls[0],
            role: 'restaurant',
            restaurantId: newRestaurant._id,
            status: 'pending'
        });
        await userData.save();

        res.status(201).json({ message: 'Signup successful', data: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};




exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        // form data as JSON string in req.body.data
        const updates = JSON.parse(req.body.data);

        // Agar images hai to upload karo
        if (req.files && req.files.ownerImage) {
            // req.files.ownerImage ho sakta hai array ya single file dono ho
            let uploadResults;
            if (Array.isArray(req.files.ownerImage)) {
                // Agar multiple images ho to helper me array bana ke bhejo
                uploadResults = await uploadImage({ images: req.files.ownerImage });
            } else {
                uploadResults = await uploadImage({ images: [req.files.ownerImage] });
            }

            // uploadResults me Cloudinary ka response array milega
            // tum sirf pehla URL store kar sakte ho
            if (uploadResults.length > 0) {
                updates.ownerImage = uploadResults[0].secure_url;
            }
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const updatedUser = await user.findOneAndUpdate(
            { restaurantId: id },
            {
                $set: {
                    name: updates.name,
                    email: updates.email,
                    phone: updates.phone,
                    image: updates.ownerImage,
                },
            },
            { new: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            restaurant: updatedRestaurant,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Update failed", error: error.message });
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
        console.log("iddddd", id)
        const restaurant = await Restaurant.findOne({ _id: id });
        console.log("restauranttttttttt", restaurant)
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(202).send({ message: "restaurant details", restaurant });
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