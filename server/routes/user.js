import express from "express";
const router = express.Router();
import { signup, checkUser, getUser, editUser } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";
router.post("/signup", signup);
router.post("/check-user", checkUser);
router.get("/:id", auth, getUser);
router.patch("/:id", auth, editUser);

export default router;
