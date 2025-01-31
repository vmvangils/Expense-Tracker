import { Request, Response } from "express";
import db from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

// ✅ Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        if (!name || !email || !password || !phoneNumber) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        db.query("SELECT * FROM Account WHERE Email = ?", [email], async (err, results) => {
            if (err) {
                res.status(500).json({ message: "Database error" });
                return;
            }
            if (results.length > 0) {
                res.status(400).json({ message: "Email already exists" });
                return;
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                db.query(
                    "INSERT INTO Account (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)",
                    [name, email, hashedPassword, phoneNumber],
                    (err) => {
                        if (err) {
                            res.status(500).json({ message: "Registration failed." });
                            return;
                        }
                        res.status(201).json({ success: true, message: "User registered successfully!" });
                    }
                );
            } catch (err) {
                res.status(500).json({ message: "Error hashing password" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        db.query("SELECT * FROM Account WHERE Email = ?", [email], async (err, results) => {
            if (err) {
                res.status(500).json({ message: "Database error" });
                return;
            }
            if (results.length === 0) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.Password);
            if (!passwordMatch) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            const token = jwt.sign({ id: user.idAccount, email: user.Email }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ success: true, token });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
