const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// Dashboard
router.get("/", async (req, res) => {
  try {
    const totalShipments = await Shipment.countDocuments();
    const pendingShipments = await Shipment.countDocuments({
      status: "Pending",
    });
    const deliveredShipments = await Shipment.countDocuments({
      status: "Delivered",
    });
    const inTransitShipments = await Shipment.countDocuments({
      status: "In Transit",
    });

    // Calculate average delivery time (mock data for now)
    const avgDeliveryTime = 3.5;

    // Get recent shipments
    const recentShipments = await Shipment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate percentage changes (mock data)
    const stats = {
      totalShipments,
      totalChange: 12,
      pendingShipments,
      pendingChange: -5,
      deliveredShipments,
      deliveredChange: 10,
      avgDeliveryTime,
      avgDeliveryStatus: "Stable",
    };

    res.render("dashboard", {
      title: "Dashboard",
      page: "dashboard",
      stats,
      recentShipments,
    });
  } catch (error) {
    console.error(error);
    res.render("dashboard", {
      title: "Dashboard",
      page: "dashboard",
      stats: {
        totalShipments: 0,
        pendingShipments: 0,
        deliveredShipments: 0,
        avgDeliveryTime: 0,
      },
      recentShipments: [],
    });
  }
});

module.exports = router;
