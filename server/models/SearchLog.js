import mongoose from "mongoose";

const searchLogSchema = new mongoose.Schema({
  query: { type: String, required: true, trim: true },
  matchedCategoryId: { type: String, default: "all" },
  resultsCount: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const SearchLog = mongoose.models.SearchLog || mongoose.model("SearchLog", searchLogSchema);

