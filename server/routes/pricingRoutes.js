import express from "express";
import { calculatePlanCost, calculateUnusedSeatsWaste, calculateRenewalUplift } from "../lib/pricing.js";
import { VENDORS } from "../data/vendorsData.js";

const router = express.Router();

// POST /api/pricing/calculate
router.post("/calculate", (req, res) => {
  try {
    const { vendorId, planId, seats = 1, billingCycle = "annual", currency = "USD" } = req.body;

    const vendor = VENDORS.find((v) => v.id === vendorId);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    const plan = vendor.plans?.find((p) => p.id === planId) || vendor.plans?.[0];
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    const result = calculatePlanCost({
      vendor,
      plan,
      seats,
      billingCycle,
      currency,
    });

    return res.json({ success: true, calculation: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/pricing/toolkit/unused-seats
router.post("/toolkit/unused-seats", (req, res) => {
  try {
    const { costPerSeatMonthly, totalSeats, unusedSeats, currency = "USD" } = req.body;
    const waste = calculateUnusedSeatsWaste({
      costPerSeatMonthly,
      totalSeats,
      unusedSeats,
      currency,
    });
    return res.json({ success: true, result: waste });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/pricing/toolkit/renewal-uplift
router.post("/toolkit/renewal-uplift", (req, res) => {
  try {
    const { currentAnnualCost, annualUpliftPercent = 7, years = 3, currency = "USD" } = req.body;
    const uplift = calculateRenewalUplift({
      currentAnnualCost,
      annualUpliftPercent,
      years,
      currency,
    });
    return res.json({ success: true, result: uplift });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

