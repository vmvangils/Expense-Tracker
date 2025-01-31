import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // ✅ Pass function directly
router.post("/login", loginUser); // ✅ Pass function directly

export default router;


