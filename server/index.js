const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth");
const cors = require("cors")

const authMiddleWare = require("./middleware/middleWare")
const User = require('./models/User.js');

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleWare, (req, res) => {
    res.json({message: " acees granted", user: req.user});
});



mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5000, () => console.log("server is runnnnyy.y.y.y."))) 
.catch ((err) => console.log(err));
