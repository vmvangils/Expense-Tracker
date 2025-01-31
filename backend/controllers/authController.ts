import { Request, Response } from "express";
import db from "../database";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

// Register a new user
export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, phoneNumber } = req.body;

    db.query("SELECT * FROM Account WHERE Email = ?", [email], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const sql = "INSERT INTO Account (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, password, phoneNumber], (err) => {
            if (err) {
                console.error("❌ Insert error:", err);
                return res.status(500).json({ message: "Registration failed. Check server logs." });
            }

            return res.status(201).json({ success: true, message: "User registered successfully!" });
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

        // Generate JWT token
        const token = jwt.sign({ id: user.idAccount, name: user.Name, email: user.Email }, SECRET_KEY, { expiresIn: "1h" });

        return res.json({ success: true, token });
    });
};

// Fetch user details (Protected Route)
export const getUser = (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user) return res.status(403).json({ message: "Unauthorized" });

    return res.json({ success: true, user });
};