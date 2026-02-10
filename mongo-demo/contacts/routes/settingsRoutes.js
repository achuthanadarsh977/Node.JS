import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getSettings,
  getChangeEmail,
  postChangeEmail,
  getChangePassword,
  postChangePassword,
} from "../controllers/settingsController.js";

const router = Router();

router.use(requireAuth);

router.get("/", getSettings);
router.get("/change-email", getChangeEmail);
router.post("/change-email", postChangeEmail);
router.get("/change-password", getChangePassword);
router.post("/change-password", postChangePassword);

export default router;
