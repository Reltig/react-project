const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    cart: [{
        productId: mongoose.Schema.Types.ObjectId,
        value: Number
    }]
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;