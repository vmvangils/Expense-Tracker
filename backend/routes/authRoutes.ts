import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authenticateJWT, getUser); // ✅ Protected route

export default router;