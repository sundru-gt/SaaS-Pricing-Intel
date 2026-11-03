import express from "express";
import { Newsletter } from "../models/Newsletter.js";
import { getDBStatus } from "../config/db.js";

const router = express.Router();

// In-memory array for subscriptions when MongoDB isn't running
const memorySubscribers = [];

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email, consent } = req.body;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "A valid email address is required." });
    }

    if (!consent) {
      return res.status(400).json({ success: false, message: "Consent checkbox is required." });
    }

    const subData = {
      email: email.trim().toLowerCase(),
      consent: Boolean(consent),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      createdAt: new Date(),
    };

    if (getDBStatus()) {
      const doc = await Newsletter.create(subData);
      return res.status(201).json({
        success: true,
        message: "Successfully subscribed to The Price Watch weekly digest.",
        subscriber: { id: doc._id, email: doc.email },
        persisted: "mongodb",
      });
    }

    memorySubscribers.push(subData);
    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to The Price Watch weekly digest.",
      subscriber: { email: subData.email },
      persisted: "memory",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/newsletter/subscribers (admin/debug check)
router.get("/subscribers", async (req, res) => {
  try {
    if (getDBStatus()) {
      const docs = await Newsletter.find().sort({ createdAt: -1 }).lean();
      return res.json({ success: true, count: docs.length, subscribers: docs });
    }
    return res.json({ success: true, count: memorySubscribers.length, subscribers: memorySubscribers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

