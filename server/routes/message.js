const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleWare = require("../middleware/middleWare");

router.get("/", authMiddleWare, async (req, res) => {
    try{
        const message = await Message.find().sort({ timestamp: 1});
        res.json(message);
    } catch (err) {
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;