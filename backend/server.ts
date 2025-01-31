import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import economyRoutes from "./routes/economyRoutes"; // ✅ Economy settings
import walletRoutes from "./routes/walletRoutes"; // ✅ Wallet transactions
import authRoutes from "./routes/authRoutes";
import "./database"; // Ensure DB connects on startup

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/economy", economyRoutes); // ✅ Economy handles settings (rent/salary)
app.use("/api/wallet", walletRoutes);   // ✅ Wallet handles transactions
app.use("/api/auth", authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
