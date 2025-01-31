import express, { Request, Response } from "express";
import { addExpenditure, getExpenditures } from "../controllers/expenditureController";

const router = express.Router();

// ✅ Define the routes properly
router.post("/", (req: Request, res: Response) => addExpenditure(req, res));
router.get("/:walletId", (req: Request, res: Response) => getExpenditures(req, res));

export default router;
