import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  pricingModel: { type: String, enum: ["per_user", "flat"], default: "per_user" },
  minSeats: { type: Number, default: 1 },
  monthlyPricePerUser: { type: Number, default: 0 },
  annualPricePerUser: { type: Number, default: 0 },
  baseFeeMonthly: { type: Number, default: 0 },
  baseFeeAnnualPerMonth: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  features: [{ type: String }],
  limitations: { type: String },
}, { _id: false });

const vendorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  categoryId: { type: String, required: true, index: true },
  subTypes: [{ type: String, index: true }],
  badge: { type: String },
  logoText: { type: String },
  accentColor: { type: String, default: "#3B82F6" },
  description: { type: String, required: true },
  cheapestPaidPlanSummary: { type: String, required: true },
  hasFreePlan: { type: Boolean, default: false },
  freePlanDetails: { type: String },
  pricingSource: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  verifiedDate: { type: String, required: true },
  currency: { type: String, enum: ["USD", "INR"], default: "USD" },
  inrSupported: { type: Boolean, default: true },
  plans: [planSchema],
  features: [{ type: String }],
  contractInfo: { type: String },
  hiddenCosts: [{ type: String }],
}, {
  timestamps: true,
});

export const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

