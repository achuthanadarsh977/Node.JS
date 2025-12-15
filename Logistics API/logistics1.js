const express = require("express");
const router = express.Router();
const { Logistics } = require("./logistics");

/**
 * GET all logistics orders
 */
router.get("/", async (req, res) => {
  const orders = await Logistics.find().sort("-createdAt");
  res.send(orders);
});

/**
 * POST new logistics order
 * Takes EXACTLY what client sends
 */
router.post("/", async (req, res) => {
  try {
    let order = new Logistics(req.body);   // 👈 SAME AS WEATHER
    order = await order.save();
    res.send(order);
  } catch (err) {
    res.status(500).send("Error saving order: " + err.message);
  }
});

/**
 * UPDATE logistics order
 */
router.put("/:id", async (req, res) => {
  let order = await Logistics.findById(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  order.orderId = req.body.orderId || order.orderId;
  order.customer = req.body.customer || order.customer;
  order.shipment = req.body.shipment || order.shipment;
  order.vehicle = req.body.vehicle || order.vehicle;
  order.driver = req.body.driver || order.driver;
  order.createdAt = req.body.createdAt || order.createdAt;

  await order.save();
  res.send(order);
});

/**
 * DELETE logistics order
 */
router.delete("/:id", async (req, res) => {
  const order = await Logistics.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  res.send({ message: "Order deleted" });
});

module.exports = router;
