import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB, getDBStatus } from "./config/db.js";

// Routes
import categoryRoutes from "./routes/categoryRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "*"],
  credentials: true,
}));
app.use(express.json());

// API Route Mounts
app.use("/api/categories", categoryRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/ai", aiRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "SaaS Pricing Comparison API",
    mongodb: getDBStatus() ? "connected" : "fallback-memory",
    timestamp: new Date().toISOString(),
  });
});

// Root welcome
app.get("/", (req, res) => {
  res.send("SaaS Pricing Intelligence MERN Backend is running. Access API at /api/...");
});

// Start server immediately & connect DB asynchronously
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Express] Backend server listening on http://0.0.0.0:${PORT}`);
  console.log(`[Express] Health check available at http://localhost:${PORT}/api/health`);
});

connectDB();
