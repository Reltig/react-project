const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    products: [{
        productId: mongoose.Schema.Types.ObjectId,
        value: Number
    }]
}, {timestamps: true});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;