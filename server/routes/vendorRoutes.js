import express from "express";
import { Vendor } from "../models/Vendor.js";
import { VENDORS } from "../data/vendorsData.js";
import { getDBStatus } from "../config/db.js";

const router = express.Router();

// GET /api/vendors
// Optional query params: categoryId, subType, q
router.get("/", async (req, res) => {
  try {
    const { categoryId, subType, q } = req.query;

    let vendorsList = [];

    if (getDBStatus()) {
      const query = {};
      if (categoryId && categoryId !== "all") query.categoryId = categoryId;
      if (subType && subType !== "All") query.subTypes = subType;
      if (q && q.trim()) {
        query.$or = [
          { name: { $regex: q.trim(), $options: "i" } },
          { description: { $regex: q.trim(), $options: "i" } },
        ];
      }
      vendorsList = await Vendor.find(query).lean();
    }

    // Fallback to in-memory if DB empty or not connected
    if (!vendorsList || vendorsList.length === 0) {
      vendorsList = VENDORS;

      if (categoryId && categoryId !== "all") {
        vendorsList = vendorsList.filter((v) => v.categoryId === categoryId);
      }
      if (subType && subType !== "All") {
        vendorsList = vendorsList.filter(
          (v) => v.subTypes && v.subTypes.some((s) => s.toLowerCase() === subType.toLowerCase())
        );
      }
      if (q && q.trim()) {
        const queryTerm = q.toLowerCase().trim();
        vendorsList = vendorsList.filter(
          (v) =>
            v.name.toLowerCase().includes(queryTerm) ||
            v.description.toLowerCase().includes(queryTerm)
        );
      }
    }

    return res.json({
      success: true,
      count: vendorsList.length,
      vendors: vendorsList,
      source: getDBStatus() ? "mongodb" : "memory",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/vendors/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const vendor = await Vendor.findOne({ id }).lean();
      if (vendor) return res.json({ success: true, vendor });
    }

    const match = VENDORS.find((v) => v.id === id);
    if (match) {
      return res.json({ success: true, vendor: match });
    }

    return res.status(404).json({ success: false, message: "Vendor not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

