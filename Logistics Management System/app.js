import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shipmentRoutes from "./routes/shipments.js";
import methodOverride from "method-override";
import Shipment from "./models/Shipment.js"; // ✅ REQUIRED

dotenv.config();

const app = express();

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/logistics")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
app.use("/shipments", shipmentRoutes);

// Home
app.get("/", (req, res) => res.redirect("/shipments"));

// ✅ FIXED UPDATE ROUTE (PATH MATTERS)
app.put("/shipments/:id", async (req, res) => {
  await Shipment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/shipments");
});

// Server
app.listen(3000, () => {
  console.log("🚚 Server running on http://localhost:3000");
});
