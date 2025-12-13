const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const weatherRouter = require("./weather1");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/weather")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

// API routes
app.use("/api/weather", weatherRouter);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "weather.html"));
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
