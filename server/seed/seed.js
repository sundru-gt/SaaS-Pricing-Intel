import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Category } from "../models/Category.js";
import { Vendor } from "../models/Vendor.js";
import { CATEGORIES } from "../data/categoriesData.js";
import { VENDORS } from "../data/vendorsData.js";

async function seed() {
  console.log("Starting MongoDB database seed...");

  const connected = await connectDB();
  if (!connected) {
    console.error("Database connection failed. Ensure mongod daemon is running before seeding.");
    process.exit(1);
  }

  try {
    // 1. Clear existing
    await Category.deleteMany({});
    await Vendor.deleteMany({});
    console.log("✓ Cleared old collections");

    // 2. Insert categories
    await Category.insertMany(CATEGORIES);
    console.log(`✓ Seeded ${CATEGORIES.length} software categories`);

    // 3. Insert vendors
    await Vendor.insertMany(VENDORS);
    console.log(`✓ Seeded ${VENDORS.length} verified B2B SaaS vendors`);

    console.log("\nDATABASE SEEDING COMPLETED SUCCESSFULLY!\n");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();

