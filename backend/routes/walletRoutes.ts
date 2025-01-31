import express from "express";
import { getWalletByUserId, getWalletBalance, getWalletTransactions, addWalletTransaction } from "../controllers/walletController";

const router = express.Router();

// ✅ Ensure correct API routes
router.get("/:userId", getWalletByUserId);             // Fetch wallet details
router.get("/:userId/balance", getWalletBalance);      // Fetch balance
router.get("/:userId/transactions", getWalletTransactions); // Fetch transaction history
router.post("/transaction", addWalletTransaction);     // Add transaction (expense/income)

export default router;