
const mongoose = require("mongoose")

const express = require("express")

const app = express()

const Joi = require("joi")


mongoose
  .connect("mongodb://127.0.0.1:27017/logistics")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));


const logisticSchema = new mongoose.Schema({
    Supplier_Name: {type:String},
    

})




