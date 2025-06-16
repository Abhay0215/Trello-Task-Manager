const express = require('express')
const connectDB = require('./config/db.js');
const http = require("http");
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth");
const cors = require("cors");
const taskRoutes = require('./routes/task');
const { Server } = require("socket.io");

const authMiddleWare = require("./middleware/middleWare")
const User = require('./models/User.js');

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("send-message", (msg) => {
        console.log("Received message: ",msg);

        io.emit("new-message",msg)
    });

    socket.on("disconnect", () =>{
        console.log("Client dicntd");
    });
});


app.use(express.json());
app.use(cors());



app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleWare, (req, res) => {
    res.json({message: " acees granted", user: req.user});
});


connectDB();

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
