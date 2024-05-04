const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("./models/User")
const Product = require("./models/Product")
const multer = require("multer");
const upload = multer({ dest: "public/" })

dotenv.config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

let baseShopCart = [
    {
        name: "tovar1",
        description: "desc tovar1",
        price: 100
    },
    {
        name: "tovar2",
        description: "desc tovar2",
        price: 200
    },
    {
        name: "tovar3",
        description: "desc tovar3",
        price: 300
    }
]

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

app.get("/profile", (req, res) => {
    const token = req.cookies?.token;

    if (!token){
        res.status(401).json("no token");
        return;
    }

    jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        const {id, username} = userData;
        res.json(userData);
    });
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

app.post("/goods-list", async (req,res) => {
    const products = await Product.find({});
    res.json(products).status(200);
})

app.post("/add-good", (req, res) => {
    console.log(req.body);
    res.json("create").status(201);
})

app.post("/upload_files", upload.any(), uploadFiles);

async function uploadFiles(req, res) {
    const newProduct = {...req.body, filename: req.files[0].filename};
    newProduct.price = +newProduct.price;
    const createdProduct = await Product.create(newProduct);
    res.json(createdProduct._id).status(201);
}

app.get("/files/:fileId", (req, res)=>{
    const file = `${__dirname}/public/${req.params.fileId}`;
    res.download(file);
})

app.listen(4000);