import mongoose from "mongoose";



mongoose
  .connect("mongodb://127.0.0.1:27017/logistics")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const shipmentSchema = new mongoose.Schema({
  supplierName: String,
  pan: String,
  tripId: String,
  tripDate: String,
  billingTo: String,
  from: String,
  to: String,
  loadingDate: String,
  vehicleNo: String,
  vehicleTypeTonnage: String,
  freight: Number,
  advance: Number,
  other: Number,
  totalAdvance: Number,
  balance: Number
});

const logistics =  mongoose.model("Shipment", shipmentSchema);

export default logistics
