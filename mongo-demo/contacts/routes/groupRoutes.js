import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getGroups,
  getAddGroup,
  postAddGroup,
  getViewGroup,
  getEditGroup,
  postEditGroup,
  postDeleteGroups,
  postRemoveMembers,
} from "../controllers/groupController.js";

const router = Router();

router.use(requireAuth);

router.get("/", getGroups);
router.get("/add", getAddGroup);
router.post("/add", postAddGroup);
router.get("/view/:id", getViewGroup);
router.get("/edit/:id", getEditGroup);
router.post("/edit/:id", postEditGroup);
router.post("/delete", postDeleteGroups);
router.post("/remove-members/:id", postRemoveMembers);

export default router;
