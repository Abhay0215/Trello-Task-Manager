const express = require('express')
const connectDB = require('./config/db.js');
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth");
const cors = require("cors")
const taskRoutes = require('./routes/task');
const authMiddleWare = require("./middleware/middleWare")
const User = require('./models/User.js');

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleWare, (req, res) => {
    res.json({message: " acees granted", user: req.user});
});


connectDB();

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
