const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: String
}, {timestamps: true});

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;