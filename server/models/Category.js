import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  verified: { type: String, required: true },
}, { _id: false });

const chapterSchema = new mongoose.Schema({
  time: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, default: "3:30" },
  src: { type: String, required: true },
  chapters: [chapterSchema],
}, { _id: false });

const followUpSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  keywords: [{ type: String, index: true }],
  description: { type: String, required: true },
  summaryTemplate: { type: String, required: true },
  heroQuestion: { type: String },
  sources: [sourceSchema],
  subTypes: [{ type: String }],
  searchPlaceholder: { type: String },
  video: videoSchema,
  followUps: [followUpSchema],
}, {
  timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

