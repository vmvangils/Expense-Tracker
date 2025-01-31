import { Request, Response } from "express";
import db from "../database";

// Register a new user
export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, phoneNumber } = req.body;

    db.query("SELECT * FROM Account WHERE Email = ?", [email], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err); // ✅ Log the exact error
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const sql = "INSERT INTO Account (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, password, phoneNumber], (err) => {
            if (err) {
                console.error("❌ Insert error:", err); // ✅ Log the error
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

        // If using JWT (Recommended)
        // const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
        // return res.json({ success: true, token });

        return res.json({ success: true }); // ✅ Simplified if no JWT yet
    });
};