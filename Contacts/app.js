import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";


const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("layout", "layout"); 

mongoose
  .connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.use("/", contactRoutes);

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.error(err));
