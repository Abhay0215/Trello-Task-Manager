const express = require("express");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true},
    senderId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    senderName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Message", messageSchema);