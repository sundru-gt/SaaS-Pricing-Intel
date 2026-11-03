import express from "express";
import { Category } from "../models/Category.js";
import { CATEGORIES, ALL_CATEGORY } from "../data/categoriesData.js";
import { getDBStatus } from "../config/db.js";

const router = express.Router();

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    if (getDBStatus()) {
      const fromDB = await Category.find().lean();
      if (fromDB && fromDB.length > 0) {
        return res.json({
          success: true,
          categories: fromDB,
          allCategory: ALL_CATEGORY,
          source: "mongodb",
        });
      }
    }

    // Fallback to in-memory data
    return res.json({
      success: true,
      categories: CATEGORIES,
      allCategory: ALL_CATEGORY,
      source: "memory",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "all") {
      return res.json({ success: true, category: ALL_CATEGORY });
    }

    if (getDBStatus()) {
      const cat = await Category.findOne({ id }).lean();
      if (cat) return res.json({ success: true, category: cat });
    }

    const match = CATEGORIES.find((c) => c.id === id || c.slug === id);
    if (match) {
      return res.json({ success: true, category: match });
    }

    return res.status(404).json({ success: false, message: "Category not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

