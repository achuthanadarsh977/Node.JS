import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getDashboard,
  getAddContact,
  postAddContact,
  getViewContact,
  getEditContact,
  postEditContact,
  postDeleteContact,
  postBulkDelete,
  postBulkMove,
  getTrash,
  postRestore,
  postPermanentDelete,
} from "../controllers/contactController.js";

const router = Router();

router.use(requireAuth);

router.get("/", getDashboard);
router.get("/add", getAddContact);
router.post("/add", postAddContact);
router.get("/view/:id", getViewContact);
router.get("/edit/:id", getEditContact);
router.post("/edit/:id", postEditContact);
router.post("/delete", postDeleteContact);
router.post("/bulk-delete", postBulkDelete);
router.post("/bulk-move", postBulkMove);
router.get("/trash", getTrash);
router.post("/restore", postRestore);
router.post("/permanent-delete", postPermanentDelete);

export default router;
