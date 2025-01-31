import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import economyRoutes from "./routes/economyRoutes";
import authRoutes from "./routes/authRoutes";
import "./database"; // Ensure DB connects on startup

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/economy", economyRoutes);
app.use("/api/auth", authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});