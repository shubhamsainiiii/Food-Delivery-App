const Order = require('../Models/OrderModel');
const Invoice = require('../Models/InvoiceModel');
const moment = require('moment');

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
        console.log("Invoice created:", newInvoice);

        const orderPromises = items.map(item => {
            const orderData = new Order({
                invoiceId: newInvoice._id,
                userId: user._id,
                quantity: item.quantity,
                status: 'pending',
                foodItemId: item.foodItemId || item._id,
                images: item.images || []
            });
            return orderData.save();
        });

        const allOrders = await Promise.all(orderPromises);
        console.log("Orders saved:", allOrders);

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
                select: "street city state zip"
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
        const userId = req.user._id;
        const invoiceId = req.params.id;
        console.log("invoiceeeeeeeid", invoiceId)


        const invoice = await Invoice.findOne({ _id: invoiceId, userId })
            .populate("addressId");
        console.log("invoiceeeeeee", invoice)

        if (!invoice) {
            return res.status(404).send({ message: "Invoice not found" });
        }

        const orders = await Order.find({ invoiceId })
            .populate("foodItemId");

        return res.status(200).send({
            message: "Order detail fetched successfully",
            invoice,
            items: orders
        });
    } catch (error) {
        console.log("Error fetching order detail:", error);
        return res.status(500).send({ message: "Failed to fetch order detail", error: error.message });
    }
};
