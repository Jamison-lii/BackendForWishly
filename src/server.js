import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cardRouter from "./routes/cards.route.js"; // adjust path to your routes file
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files



dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/cards", cardRouter);

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR CAUGHT:");
  console.error(err.stack || err);
  res
    .status(500)
    .json({ success: false, message: err.message || "Unexpected server error" });
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
