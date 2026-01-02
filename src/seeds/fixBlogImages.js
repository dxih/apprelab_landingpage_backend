require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

// ⚠️ MAP BLOG ORDER → IMAGE URL
const imageMap = [
  "https://res.cloudinary.com/dtfgxixse/image/upload/v1767289101/blog_images/tom4jkhahm4pycc0v6js.png",
  "https://res.cloudinary.com/dtfgxixse/image/upload/v1767289105/blog_images/s77wsfs1hyr4n8m40xqd.png",
  "https://res.cloudinary.com/dtfgxixse/image/upload/v1767289110/blog_images/alulda2hvw5hjcyvnrn7.png",
  "https://res.cloudinary.com/dtfgxixse/image/upload/v1767289112/blog_images/kr9k5i0s7nsi13f5flfs.png",
];

async function fixBlogImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected\n");

    const blogs = await Blog.find().sort({ createdAt: 1 });

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];
      const imageUrl = imageMap[i];

      if (!blog.content || blog.content.length === 0) {
        console.log(`⚠️ ${blog.title} has no content`);
        continue;
      }

      // 🔥 THIS IS THE FIX
      blog.content[0].image = imageUrl;

      await blog.save();

      console.log(`✅ Image linked to: ${blog.title}`);
    }

    console.log("\n🎉 ALL BLOG IMAGES FIXED CORRECTLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error fixing images:", err);
    process.exit(1);
  }
}

fixBlogImages();
