import express from "express";
import { addEconomyData, getEconomyData } from "../controllers/economyController";

const router = express.Router();

router.post("/", addEconomyData);
router.get("/", getEconomyData);

export default router;
