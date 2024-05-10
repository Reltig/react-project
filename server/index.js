const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authentificator = require("./authentificator");
const User = require("./models/User");
const Product = require("./models/Product");
const multer = require("multer");
const upload = multer({ dest: "public/" });

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

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const foundedUser = await User.findOne({username});
    if (foundedUser){
        const passwordIsOk = bcrypt.compareSync(password, foundedUser.password);
        if (passwordIsOk){
            jwt.sign({userId:foundedUser._id, username}, jwtSecret, {}, (err, token) => {
                res.cookie('token', token,  {sameSite:'none', secure:true}).json({
                    id: foundedUser._id
                })
            })
        }
    }
})

app.post("/register", async (req,res)=>{
    const {username, password} = req.body;
    try{
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username, 
            password: hashedPassword
        });
        jwt.sign({userId: createdUser._id, username}, jwtSecret, {}, (err, token) => {
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
    const products = await Product.find({});
    res.json(products).status(200);
})

app.get("/product/:productId", async (req,res) => {
    const product = await Product.findById(req.params.productId);
    res.json(product).status(200);
})

app.post("/add-good", upload.any(), async (req, res) => {
    const newProduct = {...req.body, filename: req.files[0].filename};
    newProduct.price = +newProduct.price;
    console.log(newProduct);
    const createdProduct = await Product.create(newProduct);
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

app.listen(4000);