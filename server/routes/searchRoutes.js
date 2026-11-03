import express from "express";
import { SearchLog } from "../models/SearchLog.js";
import { matchCategory, filterVendors } from "../lib/search.js";
import { VENDORS } from "../data/vendorsData.js";
import { getDBStatus } from "../config/db.js";

const router = express.Router();

// POST /api/search
router.post("/", async (req, res) => {
  try {
    const { query = "" } = req.body;

    const matchedCategory = matchCategory(query, VENDORS);
    const filtered = filterVendors(VENDORS, {
      categoryId: matchedCategory.id,
      searchQuery: query,
    });

    // Log query in MongoDB if connected
    if (getDBStatus() && query.trim()) {
      try {
        await SearchLog.create({
          query: query.trim(),
          matchedCategoryId: matchedCategory.id,
          resultsCount: filtered.length,
        });
      } catch (logErr) {
        // Non-blocking log failure
      }
    }

    return res.json({
      success: true,
      query,
      category: matchedCategory,
      vendors: filtered,
      count: filtered.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

