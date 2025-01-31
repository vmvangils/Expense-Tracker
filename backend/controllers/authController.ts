import { Request, Response } from "express";
import db from "../database";

// Register a new user
export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, phoneNumber } = req.body;

    db.query("SELECT * FROM Account WHERE Email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const sql = "INSERT INTO Account (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, password, phoneNumber], (err) => {
            if (err) return res.status(500).json({ message: "Registration failed" });

            res.status(201).json({ message: "User registered successfully!" });
        });
    });
};

// User Login
export const loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM Account WHERE Email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        if (password !== user.Password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ success: true, message: "Login successful" });
    });
};