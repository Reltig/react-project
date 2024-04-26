const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("./models/User")

dotenv.config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json())
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

app.post("/register", async (req,res)=>{
    const {username, password} = req.body;
    console.log(username);
    try{
        const createdUser = await User.create({username, password});
        jwt.sign({userId: createdUser._id, username}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token, {sameSite:'none', secure:true}).status(201).json({
                id: createdUser._id
            });
        });
    } 
    catch (err){
        if (err) throw err;
        res.status(500).json("error");
    }
})

app.listen(4000);