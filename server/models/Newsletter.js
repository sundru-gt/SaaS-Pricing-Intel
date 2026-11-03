import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"],
  },
  consent: {
    type: Boolean,
    required: true,
    default: false,
  },
  ipAddress: { type: String },
  userAgent: { type: String },
}, {
  timestamps: true,
});

export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);

