import { Request, Response } from "express";
import db from "../database";

// ✅ Fetch user's wallet details
export const getWalletByUserId = (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const sql = "SELECT * FROM wallet WHERE Account_idAccount = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        res.status(200).json(results[0]); // Each user has one wallet
    });
};

// ✅ Fetch user's wallet balance
export const getWalletBalance = (req: Request, res: Response) => {
    const userId = req.params.userId;

    db.query("SELECT Balance FROM Wallet WHERE Account_idAccount = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length === 0) return res.status(404).json({ error: "Wallet not found" });

        res.json({ balance: result[0].Balance });
    });
};

// ✅ Fetch user's wallet transaction history
export const getWalletTransactions = (req: Request, res: Response) => {
    const userId = req.params.userId;

    db.query("SELECT * FROM Wallet WHERE Account_idAccount = ? ORDER BY created_at DESC", [userId], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};

// ✅ Add new transaction (income or expense)
export const addWalletTransaction = (req: Request, res: Response) => {
    const { userId, category, amount } = req.body;

    if (!userId || !category || !amount) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO Wallet (Account_idAccount, Category, Amount) VALUES (?, ?, ?)";
    db.query(sql, [userId, category, amount], (err) => {
        if (err) {
            console.error("❌ Insert error:", err);
            return res.status(500).json({ error: "Failed to add transaction" });
        }
        res.status(201).json({ success: true, message: "Transaction added successfully!" });
    });
};