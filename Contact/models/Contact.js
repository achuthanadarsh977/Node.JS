
import mongoose from "mongoose"
import express from "express"
import Joi from "joi"

const app = express()




mongoose
  .connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));


const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Transporter', 'Non-Transporter'],
    required: true
  },
  call_status: {
    type: String,
    enum: ['Pending', 'Called', 'Interested', 'Not Interested'],
    default: 'Pending'
  },
  call_attempts: {
    type: Number,
    default: 0,
    min: 0
  },
  remarks: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});




const contacts = mongoose.model("Contacts" , contactSchema)




export default contacts
