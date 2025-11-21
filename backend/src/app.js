const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// health check
app.get("/", (req, res) => {
  res.send("Backend server running...");
});

module.exports = app;
