const user = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;


module.exports = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    console.log("bearerToken", bearerToken);
    if (!bearerToken) {
        return res.status(404).send({ message: "No Token Provide" });
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
        return res.status(404).send({ message: "No Token Found" })
    }
    console.log("token", token)

    const decode = jwt.verify(token, secretkey);
    if (!decode) {
        return res.status(404).send({ message: "Invalid Token" });
    }
    console.log("decode", decode);
    const email = decode.email;
    const userDetail = await user.findOne({ email })
    if (!userDetail) {
        return res.status(404).send({ message: "no user detail found" })
    }
    console.log("userDetail", userDetail);
    req.user = userDetail;
    next();
}   
