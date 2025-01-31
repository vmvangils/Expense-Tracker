import { Request, Response } from "express";
import db from "../database";
import mysql from "mysql";

// Insert new economy transaction
export const addEconomyData = (req: Request, res: Response) => {
    const { category, amount } = req.body;
    const sql = "INSERT INTO economy (category, amount) VALUES (?, ?)";

    db.query(sql, [category, amount], (err: mysql.MysqlError | null, result: any) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "Data inserted successfully!" });
    });
};

// Fetch all economy transactions
export const getEconomyData = (req: Request, res: Response) => {
    const sql = "SELECT * FROM economy";

    db.query(sql, (err: mysql.MysqlError | null, results: any[]) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};