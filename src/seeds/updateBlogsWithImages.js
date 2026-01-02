require('dotenv').config(); // load your .env
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog'); // replace with your actual Blog model path

// -------------------
// Configure Cloudinary
// -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------
// Connect to MongoDB
// -------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// -------------------
// Path to local images folder
// -------------------
const IMAGES_FOLDER = path.join(__dirname, 'images'); // adjust if your folder is elsewhere

// -------------------
// Main function
// -------------------
async function updateBlogsWithImages() {
  try {
    // Get all blogs from MongoDB sorted by _id (to match array order)
    const blogs = await Blog.find().sort({ _id: 1 });

    // Read all image files in folder (jpg, jpeg, png, webp)
    const images = fs.readdirSync(IMAGES_FOLDER)
                     .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
                     .sort(); // sort alphabetically

    if (images.length === 0) {
      console.log('❌ No images found in folder!');
      return;
    }

    // Loop through blogs and assign images
    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];
      const imageFile = images[i % images.length]; // loops if fewer images than blogs

      const imagePath = path.join(IMAGES_FOLDER, imageFile);

      try {
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: 'blog_images',
        });

        blog.image = result.secure_url;
        await blog.save();

        console.log(`✅ Blog ${blog._id} updated with image: ${result.secure_url}`);
      } catch (uploadErr) {
        console.error(`❌ Failed to upload image for blog ${blog._id}:`, uploadErr);
      }
    }

    console.log('🎉 All blogs updated with images!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error updating blogs:', err);
    mongoose.disconnect();
  }
}

// -------------------
// Run the function
// -------------------
updateBlogsWithImages();
