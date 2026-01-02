import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI environment variable is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("🟢 MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });

const deleteBlogs = async () => {
  try {
    const result = await Blog.deleteMany({});
    console.log(`🧹 Deleted ${result.deletedCount} blog(s)`);
    process.exit();
  } catch (err) {
    console.error("❌ Failed to delete blogs", err);
    process.exit(1);
  }
};

deleteBlogs();

