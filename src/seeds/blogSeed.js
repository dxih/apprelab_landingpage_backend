import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { blogPosts } from "./blog.data.js";
 // your existing data

 dotenv.config(); 

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI environment variable is not defined");
  process.exit(1);
}

mongoose.connect(mongoUri);

const seedBlogs = async () => {
  try {
    await Blog.deleteMany();
    await Blog.insertMany(
      blogPosts.map(({ id, ...rest }) => rest)
    );

    console.log("✅ Blogs seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
};

seedBlogs();
