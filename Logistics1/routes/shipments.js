const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// Get all shipments
router.get("/", async (req, res) => {
  try {
    const { search, status, origin } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { shipmentId: { $regex: search, $options: "i" } },
        { "sender.name": { $regex: search, $options: "i" } },
        { "recipient.name": { $regex: search, $options: "i" } },
        { trackingNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All Statuses") {
      query.status = status;
    }

    if (origin && origin !== "All Origins") {
      query.origin = { $regex: origin, $options: "i" };
    }

    const shipments = await Shipment.find(query).sort({ createdAt: -1 });

    // Get unique origins for filter
    const origins = await Shipment.distinct("origin");

    res.render("shipments/index", {
      title: "Shipments",
      page: "shipments",
      shipments,
      origins,
      filters: { search, status, origin },
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error fetching shipments");
    res.redirect("/");
  }
});

// Create shipment form
router.get("/create", (req, res) => {
  res.render("shipments/create", {
    title: "Create Shipment",
    page: "shipments",
    shipment: null,
  });
});

// Create shipment
router.post("/", async (req, res) => {
  try {
    const {
      status,
      weight,
      dimensions,
      serviceType,
      senderName,
      senderEmail,
      senderPhone,
      senderAddressLine1,
      senderAddressLine2,
      senderCity,
      senderState,
      senderPostalCode,
      senderCountry,
      recipientName,
      recipientEmail,
      recipientPhone,
      recipientAddressLine1,
      recipientAddressLine2,
      recipientCity,
      recipientState,
      recipientPostalCode,
      recipientCountry,
      originWarehouse,
      destinationWarehouse,
      deliveryDate,
      notes,
    } = req.body;

    const shipment = new Shipment({
      status,
      weight,
      dimensions,
      serviceType,
      sender: {
        name: senderName,
        email: senderEmail,
        phone: senderPhone,
        addressLine1: senderAddressLine1,
        addressLine2: senderAddressLine2,
        city: senderCity,
        state: senderState,
        postalCode: senderPostalCode,
        country: senderCountry,
      },
      recipient: {
        name: recipientName,
        email: recipientEmail,
        phone: recipientPhone,
        addressLine1: recipientAddressLine1,
        addressLine2: recipientAddressLine2,
        city: recipientCity,
        state: recipientState,
        postalCode: recipientPostalCode,
        country: recipientCountry,
      },
      origin: `${senderCity}, ${senderCountry}`,
      destination: `${recipientCity}, ${recipientCountry}`,
      originWarehouse,
      destinationWarehouse,
      deliveryDate,
      notes,
    });

    await shipment.save();
    req.flash("success_msg", "Shipment created successfully");
    res.redirect("/shipments");
  } catch (error) {
    console.error("Shipment creation error:", error.message);
    req.flash("error_msg", "Error: " + error.message);
    res.redirect("/shipments/create");
  }
});

// View single shipment
router.get("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      req.flash("error_msg", "Shipment not found");
      return res.redirect("/shipments");
    }
    res.render("shipments/view", {
      title: "View Shipment",
      page: "shipments",
      shipment,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error fetching shipment");
    res.redirect("/shipments");
  }
});

// Edit shipment form
router.get("/:id/edit", async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      req.flash("error_msg", "Shipment not found");
      return res.redirect("/shipments");
    }
    res.render("shipments/create", {
      title: "Edit Shipment",
      page: "shipments",
      shipment,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error fetching shipment");
    res.redirect("/shipments");
  }
});

// Update shipment
router.put("/:id", async (req, res) => {
  try {
    const {
      status,
      weight,
      dimensions,
      serviceType,
      senderName,
      senderEmail,
      senderPhone,
      senderAddressLine1,
      senderAddressLine2,
      senderCity,
      senderState,
      senderPostalCode,
      senderCountry,
      recipientName,
      recipientEmail,
      recipientPhone,
      recipientAddressLine1,
      recipientAddressLine2,
      recipientCity,
      recipientState,
      recipientPostalCode,
      recipientCountry,
      originWarehouse,
      destinationWarehouse,
      deliveryDate,
      notes,
    } = req.body;

    await Shipment.findByIdAndUpdate(req.params.id, {
      status,
      weight,
      dimensions,
      serviceType,
      sender: {
        name: senderName,
        email: senderEmail,
        phone: senderPhone,
        addressLine1: senderAddressLine1,
        addressLine2: senderAddressLine2,
        city: senderCity,
        state: senderState,
        postalCode: senderPostalCode,
        country: senderCountry,
      },
      recipient: {
        name: recipientName,
        email: recipientEmail,
        phone: recipientPhone,
        addressLine1: recipientAddressLine1,
        addressLine2: recipientAddressLine2,
        city: recipientCity,
        state: recipientState,
        postalCode: recipientPostalCode,
        country: recipientCountry,
      },
      origin: `${senderCity}, ${senderCountry}`,
      destination: `${recipientCity}, ${recipientCountry}`,
      originWarehouse,
      destinationWarehouse,
      deliveryDate,
      notes,
    });

    req.flash("success_msg", "Shipment updated successfully");
    res.redirect("/shipments");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error updating shipment");
    res.redirect(`/shipments/${req.params.id}/edit`);
  }
});

// Delete shipment
router.delete("/:id", async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Shipment deleted successfully");
    res.redirect("/shipments");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error deleting shipment");
    res.redirect("/shipments");
  }
});

module.exports = router;
