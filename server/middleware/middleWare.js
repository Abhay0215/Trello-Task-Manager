const express = require("express")
const jwt = require("jsonwebtoken")

const authMiddleWare = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({error: "Access denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        console.error("JWT Verification Error:", err.message);
        res.status(400).json({error:"Invalid token"});
    }
}

module.exports = authMiddleWare;