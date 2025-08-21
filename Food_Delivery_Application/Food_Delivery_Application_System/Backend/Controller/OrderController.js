const Order = require('../Models/OrderModel');
const Invoice = require('../Models/InvoiceModel');
const moment = require('moment');
const Food = require('../Models/FoodModel');
const FoodImage = require("../Models/FoodImageModel");

exports.createOrder = async (req, res) => {
    try {
        const user = req.user;
        const { items, addressId, totalamount } = req.body;

        if (!(items && Array.isArray(items) && items.length > 0 && addressId && totalamount)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const invoiceData = new Invoice({
            userId: user._id,
            addressId,
            total: totalamount,
            date: moment().format(),
            status: 'pending'
        });

        const newInvoice = await invoiceData.save();

        const orderPromises = items.map(async (item) => {
            let restaurantId;
            if (item.restaurantId) {
                restaurantId = item.restaurantId;
            } else {
                const food = await Food.findById(item.foodItemId || item._id);
                restaurantId = food ? food.restaurantId : null;
            }

            const orderData = new Order({
                invoiceId: newInvoice._id,
                userId: user._id,
                quantity: item.quantity,
                restaurantId,
                status: 'pending',
                foodItemId: item.foodItemId || item._id,
                images: item.images || []
            });

            return orderData.save();
        });

        const allOrders = await Promise.all(orderPromises);

        return res.status(201).send({
            message: "Order placed successfully",
            invoice: newInvoice,
            orders: allOrders
        });
    } catch (error) {
        console.error("Order error:", error);
        return res.status(500).send({ message: "Error placing order", error: error.message });
    }
};

exports.getallorders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all invoices for this user
        const invoices = await Invoice.find({ userId })
            .populate({
                path: "addressId",
                select: "landmark street city state zip"
            })
            .sort({ createdAt: -1 });

        const results = [];

        for (const invoice of invoices) {
            const orders = await Order.find({ invoiceId: invoice._id })
                .populate("foodItemId");
            console.log("orderssssssssss", orders)
            results.push({
                invoice,
                items: orders
            });
        }

        res.status(200).send({
            message: "Grouped orders fetched successfully",
            groupedOrders: results
        });
    } catch (error) {
        console.error("Get orders error:", error);
        return res.status(500).send({ message: "Failed to fetch orders", error: error.message });
    }
};


exports.getOrderByInvoiceId = async (req, res) => {
    try {
        const invoiceId = req.params.id;
        const role = req.user.role;
        const restaurantId = req.user.restaurantId; // sirf restaurant ke case me hoga

        // 1. Invoice fetch karo (with user + address info)
        const invoice = await Invoice.findOne({ _id: invoiceId })
            .populate("addressId")
            .populate("userId", "name email phone image createdAt");

        if (!invoice) {
            return res.status(404).send({ message: "Invoice not found" });
        }

        // 2. Orders fetch karo
        let orderQuery = { invoiceId };

        // Agar restaurant login hai to filter lagao
        if (role === "restaurant" && restaurantId) {
            orderQuery.restaurantId = restaurantId;
        }

        const orders = await Order.find(orderQuery)
            .populate({
                path: "foodItemId",
                model: "food-items",
                populate: {
                    path: "images",
                    model: "food-images"
                }
            });

        // 3. Items final structure me map karo
        const items = await Promise.all(
            orders.map(async order => {
                let images = [];
                if (order.foodItemId?._id) {
                    images = await FoodImage.find({ foodItemId: order.foodItemId._id });
                }
                return {
                    foodName: order.foodItemId?.foodName || "Unknown",
                    quantity: order.quantity,
                    price: order.foodItemId?.price || 0,
                    restaurantId: order.restaurantId,
                    images
                };
            })
        );

        // 4. Response
        return res.status(200).send({
            message: "Order detail fetched successfully",
            invoice: {
                invoiceId: invoice._id,
                createdAt: invoice.createdAt,
                user: {
                    name: invoice.userId.name,
                    email: invoice.userId.email,
                    phone: invoice.userId.phone,
                    image: invoice.userId.image || null,
                    joined: invoice.userId.createdAt
                },
                address: invoice.addressId,
                total: invoice.total,
                status: invoice.status
            },
            items
        });

    } catch (error) {
        console.log("Error fetching order detail:", error);
        return res.status(500).send({ message: "Failed to fetch order detail", error: error.message });
    }
};


exports.getOrdersForRestaurant = async (req, res) => {
    try {
        const restaurantId = req.user.restaurantId;
        console.log("Restaurant ID from token", restaurantId);

        // Orders + FoodItem + User + Invoice populate
        let orders = await Order.find({ restaurantId })
            .populate('foodItemId', 'foodName price')
            .populate('userId', 'name email phone address')
            .populate({
                path: 'invoiceId',
                select: 'addressId date total status',
                populate: {
                    path: 'addressId',
                    select: 'landmark street city state zip'
                }
            })
            .lean();

        // Har order ke foodItemId ke images lao
        const foodItemIds = orders.map(o => o.foodItemId?._id);
        const images = await FoodImage.find({ foodItemId: { $in: foodItemIds } })
            .select('foodItemId imageUrl -_id')
            .lean();

        // Images ko orders me merge karo
        orders = orders.map(order => ({
            ...order,
            foodItemId: {
                ...order.foodItemId,
                images: images
                    .filter(img => img.foodItemId.toString() === order.foodItemId?._id.toString())
                    .map(img => img.imageUrl)
            }
        }));

        res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        console.error('Error fetching restaurant orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};



