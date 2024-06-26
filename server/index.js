const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authentificator = require("./authentificator");
const Order = require("./models/Order");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const multer = require("multer");
//const upload = multer({ dest: "public/" });
const uploader = require("./uploader");

dotenv.config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const auth = authentificator(jwtSecret);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get("/test", (req, res)=>{
    res.json('test ok')
})

app.get("/add-category/:category", async (req, res)=>{
    const result = await Category.create({name: req.params.category});
    console.log(result);
    res.status(201);
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const foundedUser = await User.findOne({username});
    if (foundedUser){
        const passwordIsOk = bcrypt.compareSync(password, foundedUser.password);
        if (passwordIsOk){
            jwt.sign({userId:foundedUser._id, username, role: foundedUser.role}, jwtSecret, {}, (err, token) => {
                res.cookie('token', token,  {sameSite:'none', secure:true}).json({
                    id: foundedUser._id
                })
            })
        }
    }
})

app.get("/logout", (req, res)=> {
    res.cookie('token', 'none', {
        sameSite:'none',
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        secure: true
    })
    res.json("ok");
})

app.post("/register", async (req,res)=>{
    const {username, password, role} = req.body;
    try{
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username, 
            password: hashedPassword,
            role
        });
        jwt.sign({userId: createdUser._id, username, role}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token, {sameSite:'none', secure:true}).status(201).json({
                id: createdUser._id
            });
        });
    } 
    catch (err){
        res.status(500).json("error");
    }
})

app.use(auth)

app.get("/profile", (req, res) => {
    if (!req?.userData)
        res.status(401);
    res.json(req.userData);
})

app.post("/goods-list", async (req,res) => {
    // let priceCondition = {$gt: +req.body.lowestPrice};
    // if (req.body.highestPrice != "" && req.body.highestPrice != null)
    //     priceCondition["$lt"] = +req.body.highestPrice;
    // const products = await Product.find({
    //     name: {$regex: req.body.startWith, $options: "i"},
    //     price: priceCondition
    // });
    const products = await Product.find({});
    res.json(products);
})

app.get("/categories", async (req, res)=> {
    const result = await Category.find({});
    res.json(result);
})

app.get("/product/:productId", async (req,res) => {
    const product = await Product.findById(req.params.productId);
    res.json(product).status(200);
})

app.post("/add-good", multer().any(), async (req, res) => {
    const upload = await uploader.Upload({ buffer: req.files[0].buffer }, '/images/');
    const newProduct = {...req.body, filename: upload.key.split('/')[1]};
    newProduct.price = +newProduct.price;
    const createdProduct = await Product.create(newProduct);
    console.log(createdProduct);
    res.json(createdProduct._id).status(201);
});

app.get("/files/:fileId", (req, res)=>{
    if (req.params.fileId == "undefined"){
        res.status(400);
    }
    else{
        const file = `${__dirname}/public/${req.params.fileId}`;
        res.download(file);
    }
})

app.get("/user-cart", async (req, res)=>{
    const cart = (await User.findById(req.userData.userId)).cart;
    const cartIds = cart.map(p => p.productId);
    const mapper = {};
    cart.forEach(p => mapper[p.productId] = p.value)
    const result = (await Product.find({_id: {$in: cartIds}})).map(r => {
        return ({...r._doc, value: mapper[`${r._id}`]});
    });
    res.json(result || []).status(201);
})

app.post("/add-to-cart/:productId", async (req, res)=>{
    const user = await User.findById(req.userData.userId);
    const newElement = {
        productId: req.params.productId,
        value: 1
    }
    if (!user.cart.some(p => p.productId == newElement.productId))
        user.cart.push(newElement);
    user.save();
    res.json("succes").status(201);
})

app.patch("/cart/modify-value/:productId", async (req, res) => {
    const user = await User.updateOne(
        {_id: req.userData.userId, "cart.productId": req.params.productId}, 
        {$inc: {"cart.$.value": req.body.value || 1}}
    );
    res.json({status: "succes"}).status(200);
})

app.delete("/cart/modify-value/:productId", async (req, res) => {
    const user = await User.updateOne(
        {_id: req.userData.userId}, 
        {$pull: {"cart": {productId: req.params.productId}}}
    );
    res.json({status: "succes"}).status(200);
})

app.post("/cart/create-order", async (req, res) => {
    const cart = (await User.findById(req.userData.userId)).cart;
    const result = await Order.create({
        customerId: req.userData.userId,
        products: cart
    });
    await User.findOneAndUpdate(
        {_id: req.userData.userId},
        {$set: {cart: []}}
    )
    res.json(result).status(200);
})

app.get("/orders", async (req, res) => {
    const result = await Order.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "products.list"
            }
        },
        {
            $project: {
                result: "$products.list"
            }
        }
    ]);
    res.json(result);
})

app.get("/users", async (req, res) => {
    const result = await User.aggregate([{
        $project: {
            username: 1
        }
    }]);
    res.json(result);
})

app.delete("/users", async (req, res)=> {
    const _id = req.body.id;
    await User.deleteOne({_id});
    res.status(204)
})

app.listen(4000);