import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/saas_pricing";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at ${uri}.`);
    console.warn(`[MongoDB] Server will run with in-memory fallback datasets. Start MongoDB daemon to enable persistent document storage.`);
    return false;
  }
}

export function getDBStatus() {
  return isConnected;
}

