const express = require('express')
const connectDB = require('./config/db.js');
const http = require("http");
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth");
const cors = require("cors");
const taskRoutes = require('./routes/task');
const { Server } = require("socket.io");
const Message = require("./models/Message.js")
const messageRouter = require("./routes/message.js");

const authMiddleWare = require("./middleware/middleWare")
const User = require("./models/User.js");

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRouter);

app.get("/api/protected", authMiddleWare, (req, res) => {
    res.json({message: " acees granted", user: req.user});
});

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  },
});

io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("send-message", async (msg) => {
        console.log("Received message: ",msg.text);

        try{
            const newMessage = new Message({
                text: msg.text,
                senderId: msg.senderId,
                senderName: msg.senderName
            });
            await newMessage.save();

            io.emit("new-message",newMessage);
        } catch (err) {
            console.error(err);
        }       
    });

    socket.on("disconnect", () => {
        console.log("Client dicntd");
    });
});

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
