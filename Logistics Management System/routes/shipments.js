import express from "express"
import Shipment from "../models/Shipment.js";

const router = express.Router();

/* INDEX */
router.get("/", async (req, res) => {
  const shipments = await Shipment.find();
  res.render("shipments/index", { shipments });
});

/* NEW */
router.get("/new", (req, res) => {
  res.render("shipments/new");
});

/* CREATE */
router.post("/", async (req, res) => {
  const data = req.body;

  data.totalAdvance = Number(data.advance) + Number(data.other);
  data.balance = Number(data.freight) - data.totalAdvance;

  await Shipment.create(data);
  res.redirect("/shipments");
});

/* EDIT */
router.get("/:id/edit", async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  res.render("shipments/edit", { shipment });
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const data = req.body;

  data.totalAdvance = Number(data.advance) + Number(data.other);
  data.balance = Number(data.freight) - data.totalAdvance;

  await Shipment.findByIdAndUpdate(req.params.id, data);
  res.redirect("/shipments");
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Shipment.findByIdAndDelete(req.params.id);
  res.redirect("/shipments");
});

export default router;
