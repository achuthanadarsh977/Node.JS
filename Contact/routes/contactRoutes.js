import express from "express";
import {
  dashboard,
  addForm,
  createContact,
  editForm,
  updateContact,
  deleteContact,


} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", dashboard);
router.get("/add", addForm);
router.post("/add", createContact);
router.get("/edit/:id", editForm);
router.post("/edit/:id", updateContact);
router.get("/delete/:id", deleteContact);


export default router;
