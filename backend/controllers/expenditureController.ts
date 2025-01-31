import { Request, Response } from "express";
import db from "../database";

// ✅ Insert a new expenditure and update wallet balance
export const addExpenditure = (req: Request, res: Response): void => {
    const { walletId, category, amount } = req.body;

    if (!walletId || !category || !amount) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    db.query(
        "INSERT INTO Expenditure (Wallet_idWallet, Category, Amount) VALUES (?, ?, ?)",
        [walletId, category, amount],
        (err) => {
            if (err) {
                res.status(500).json({ error: "Failed to add expenditure" });
                return;
            }

            db.query(
                "UPDATE Wallet SET Balance = Balance - ? WHERE idWallet = ?",
                [amount, walletId],
                (err) => {
                    if (err) {
                        res.status(500).json({ error: "Failed to update balance" });
                        return;
                    }

                    res.status(201).json({ message: "Expenditure added successfully!" });
                }
            );
        }
    );
};

// ✅ Fetch all expenditures for a specific wallet
export const getExpenditures = (req: Request, res: Response): void => {
    const { walletId } = req.params;

    if (!walletId) {
        res.status(400).json({ error: "Wallet ID is required" });
        return;
    }

    db.query("SELECT * FROM Expenditure WHERE Wallet_idWallet = ?", [walletId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Failed to fetch expenditures" });
            return;
        }

        res.json(results);
    });
};
