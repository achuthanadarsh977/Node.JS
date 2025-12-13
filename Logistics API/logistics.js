const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Joi = require("joi");

mongoose
  .connect("mongodb://127.0.0.1:27017/logistics")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const logisticschema = new mongoose.Schema({
  orderId: { type: String,unique: true },
  customer: {
    name: { type: String },   // no required
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },
  shipment: {
    origin: { type: String },
    destination: { type: String },
    weight: { type: String },
    dimensions: { length: Number, width: Number, height: Number },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  vehicle: {
    vehicleId: { type: String },
    vehicletype: { type: String, enum: ["Van", "Truck", "Bike"] },
    capacity: Number
  },
  driver: {
    driverId: { type: String },
    name: String,
    phone: String,
    licenseNumber: Number
  },
  createdAt: { type: Date, default: Date.now }
});


const Logistics = mongoose.model("Logistics", logisticschema);

// async function createLogistics() {
//   const logistics = new Logistics({
//     orderId: "O6789",
//     customer: {
//       name: "Cargo Care",
//       phone: "7550277362",
//       email: "cargocare@gmail.com",
//       address: "Mailapur",
//     },
//     shipment: {
//       origin: "Malaipur",
//       destination: "Padoor",
//       weight: "40 kg",
//       dimensions: { length: 50, width: 40, height: 60 },
//       status: "Delivered",
//     },
//     vehicle: {
//       vehicleId: "V1003",
//       vehicletype: "Bike",
//       capacity: 50,
//     },
//     driver: {
//       driverId: "D113",
//       name: "Roshan Sampson",
//       phone: "8550266762",
//       licenseNumber: 1400,
//     },
//     createdAt: new Date("2024-10-02"),
//   });

//   const log = await logistics.save();
//   console.log(log);
// }
//createLogistics()

async function findLogistics() {
  const log1 = await Logistics.find();
  console.log(log1);
}

findLogistics();

function validateLogistics(logistics) {
  const schema = Joi.object({
    driverId: Joi.string().max(10).required(),
    orderId: Joi.string().max(10).required(),
  });
  return schema.validate(logistics);
}

exports.Logistics = Logistics;
exports.validateLogistics = validateLogistics;

