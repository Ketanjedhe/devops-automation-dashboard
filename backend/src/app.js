const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// 🔹 Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// 🔹 Connect to database
connectDB();

// 🔹 Register your routes here
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jenkins", require("./routes/jenkinsRoutes")); //jenkins

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Backend server running...");
});

module.exports = app;
