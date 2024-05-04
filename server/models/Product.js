const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: String,
    price: Number,
    filename: String
}, {timestamps: true});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;