

import mongoose from "mongoose"
import express from "express"
import Joi from "joi"

const app = express()




mongoose
  .connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));


const contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    category:{
        type:String,
        enum:['Transporter' , 'Non-Transporter']
    },

    callStatus:{
        type:String,
        default:'Pending'
    },

    ivrResponse:String,

    leadType:{
        type:String,
        enum:['HOT','COLD','WARM','NONE']
    }
}) 


const contacts = mongoose.model("Contacts" , contactSchema)




export default contacts
