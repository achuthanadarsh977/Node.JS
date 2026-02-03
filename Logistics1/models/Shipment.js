const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      unique: true,
    },
    trackingNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Delayed", "Cancelled"],
      default: "Pending",
    },
    weight: {
      type: Number,
      required: true,
    },
    dimensions: {
      type: String,
    },
    serviceType: {
      type: String,
      enum: ["Standard", "Express", "Overnight", "Economy"],
      default: "Standard",
    },
    sender: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    recipient: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    originWarehouse: {
      type: String,
    },
    destinationWarehouse: {
      type: String,
    },
    deliveryDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Generate shipment ID before saving
shipmentSchema.pre("save", async function (next) {
  if (!this.shipmentId) {
    const count = await mongoose.model("Shipment").countDocuments();
    this.shipmentId = `SHP${String(count + 1).padStart(3, "0")}`;
  }
  if (!this.trackingNumber) {
    this.trackingNumber = `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model("Shipment", shipmentSchema);
