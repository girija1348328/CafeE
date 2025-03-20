import express from "express";
import { register, login, getUserProfile } from "../controllers/authController.js"; // Ensure .js extension

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserProfile);

export default router;
