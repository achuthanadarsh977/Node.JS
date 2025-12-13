const express = require('express');
const router = express.Router();
const { Logistics, validateLogistics } = require('./logistics');

// CREATE new order (POST)
router.post("/", async (req, res) => {
  try {
    const order = new Logistics({
      orderId: req.body.orderId,
      customer: {
        name: req.body.customer?.name,
        phone: req.body.customer?.phone,
        email: req.body.customer?.email,
        address: req.body.customer?.address
      },
      shipment: {
        origin: req.body.shipment?.origin,
        destination: req.body.shipment?.destination,
        weight: req.body.shipment?.weight,
        dimensions: req.body.shipment?.dimensions,
        status: req.body.shipment?.status
      },
      vehicle: {
        vehicleId: req.body.vehicle?.vehicleId,
        vehicletype: req.body.vehicle?.vehicletype,
        capacity: req.body.vehicle?.capacity
      },
      driver: {
        driverId: req.body.driver?.driverId,
        name: req.body.driver?.name,
        phone: req.body.driver?.phone,
        licenseNumber: req.body.driver?.licenseNumber
      }
    });

    await order.save();
    res.send(order);
  } catch (err) {
    res.status(400).send("Error creating order: " + err.message);
  }
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Logistics.find().sort("-createdAt");
  res.send(orders);
});

// GET single order by ID
router.get("/:id", async (req, res) => {
  const order = await Logistics.findById(req.params.id);
  if (!order) return res.status(404).send("Order not found");
  res.send(order);
});

// UPDATE order
router.put("/:id", async (req, res) => {
  let order = await Logistics.findById(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  order.orderId = req.body.orderId || order.orderId;
  order.customer = {
    name: req.body.customer?.name || order.customer.name,
    phone: req.body.customer?.phone || order.customer.phone,
    email: req.body.customer?.email || order.customer.email,
    address: req.body.customer?.address || order.customer.address
  };
  order.shipment = {
    origin: req.body.shipment?.origin || order.shipment.origin,
    destination: req.body.shipment?.destination || order.shipment.destination,
    weight: req.body.shipment?.weight || order.shipment.weight,
    dimensions: req.body.shipment?.dimensions || order.shipment.dimensions,
    status: req.body.shipment?.status || order.shipment.status
  };
  order.vehicle = {
    vehicleId: req.body.vehicle?.vehicleId || order.vehicle.vehicleId,
    vehicletype: req.body.vehicle?.vehicletype || order.vehicle.vehicletype,
    capacity: req.body.vehicle?.capacity || order.vehicle.capacity
  };
  order.driver = {
    driverId: req.body.driver?.driverId || order.driver.driverId,
    name: req.body.driver?.name || order.driver.name,
    phone: req.body.driver?.phone || order.driver.phone,
    licenseNumber: req.body.driver?.licenseNumber || order.driver.licenseNumber
  };

  await order.save();
  res.send(order);
});

// DELETE order
router.delete("/:id", async (req, res) => {
  const order = await Logistics.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  res.send({ message: "Order deleted" });
});

module.exports = router;
