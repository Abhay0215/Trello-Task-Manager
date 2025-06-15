const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const signin = async ( req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user ) return res.status(400).json({ error: "Invalid creds"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid creds"});

        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.json({
            token,
        user:{ id: user._id, name:user.name, email: user.email     
        }});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error"});
    }
    
};

const register = async (req, res) => {
    const { name, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({ error: " User already there "});

        const newUser = new User({ name, email, password});
        const savedUser = await newUser.save();

        const token = jwt.sign(
            { userId: savedUser._id},
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.status(201).json({message: " Registered",
            user: {id: savedUser._id,
            name: savedUser.name, email: savedUser.email
        },token })
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
};

module.exports = { signin, register };