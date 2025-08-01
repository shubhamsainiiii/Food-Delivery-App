const UserAddress = require("../Models/AddressModel")


exports.createAddress = async (req, res) => {
    const user = req.user;
    const {
        street,
        city,
        state,
        zip,
        landmark,
        addressType,
        isDefault,
    } = req.body;

    const data = {
        userId: user._id,
        name: user.name,
        phone: user.phone,
        street,
        city,
        state,
        zip,
        landmark,
        addressType,
        isDefault,
    };
    const newAddress = new UserAddress(data)
    await newAddress.save()
    return res.status(200).send(newAddress);
};

exports.updateAddress = async (req, res) => {
    const { id } = req.params
    const { street,
        city,
        state,
        zip,
        landmark, } = req.body
    console.log(req.body)

    const data = { street, city, state, zip, landmark }

    const result = await UserAddress.findByIdAndUpdate({ _id: id }, data, { new: true })
    console.log(result)

    return res.status(200).json({ msg: "updated", result })

}

exports.allAddress = async (req, res) => {
    const result = await UserAddress.find({ userId: req.user._id })
    return res.status(200).send({ address: result })
}

exports.addressById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const result = await UserAddress.findById({ _id: id })
    return res.status(200).send(result)
}
exports.deleteaddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Find and delete only if the address belongs to the user
        const deletedAddress = await UserAddress.findOneAndDelete({ _id: id, userId: userId });
        console.log("delete", deletedAddress)

        if (!deletedAddress) {
            return res.status(404).json({ msg: "Address not found or you're not authorized to delete it." });
        }

        return res.status(200).json({ msg: "Address deleted successfully." });
    } catch (error) {
        console.error("Error deleting address:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};
