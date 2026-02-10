import { Router } from "express";
import { redirectIfAuth } from "../middleware/auth.js";
import {
  getSignin,
  postSignin,
  getSignup,
  postSignup,
  getForgotPassword,
  postForgotPassword,
  logout,
} from "../controllers/authController.js";

const router = Router();

router.get("/", redirectIfAuth, (req, res) => res.redirect("/signin"));
router.get("/signin", redirectIfAuth, getSignin);
router.post("/signin", redirectIfAuth, postSignin);
router.get("/signup", redirectIfAuth, getSignup);
router.post("/signup", redirectIfAuth, postSignup);
router.get("/forgot-password", redirectIfAuth, getForgotPassword);
router.post("/forgot-password", redirectIfAuth, postForgotPassword);
router.get("/logout", logout);

export default router;
