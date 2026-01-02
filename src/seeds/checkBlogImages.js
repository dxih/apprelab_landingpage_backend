require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

async function checkBlogImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected\n");

    const blogs = await Blog.find();

    blogs.forEach((blog, index) => {
      const imageFromContent = blog.content?.find(
        (section) => section.image
      )?.image;

      console.log(`📝 Blog ${index + 1}`);
      console.log("ID:", blog._id.toString());
      console.log("Title:", blog.title);
      console.log("Image:", imageFromContent || "❌ NO IMAGE");
      console.log("------------------------------------------------\n");
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

checkBlogImages();
