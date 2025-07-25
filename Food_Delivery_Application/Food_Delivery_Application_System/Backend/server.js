const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const app = express();

const port = process.env.PORT || 9999;
const mongoURL = process.env.MongoUrl;
app.use(express.json());
app.use(cors());


const router = require('./Routes/AdminRoute');
app.use('/Admin', router)

const restaurantRouter = require('./Routes/RestaurantOwnerRoute');
app.use('/Restaurant', restaurantRouter);

const userRouter = require('./Routes/UserRoute');
app.use('/User', userRouter);

const deliveryBoyRouter = require('./Routes/deliveryBoyRoute');
app.use('/Delivery-Boy', deliveryBoyRouter)

const addfooditem = require('./Routes/FoodRoute');
app.use('/food-items', addfooditem);

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Database Connected Successfully", mongoURL)
    })
    .catch(() => {
        console.log(`Database not connected`)
    })

app.listen(port, () => {
    console.log(`Server is running on ${port} Port`)
})