// routes/admin/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middlewares/auth.middleware'); // Changed from verifyAdmin

// Configure multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/admin/upload
router.post('/', protect, upload.single('file'), async (req, res) => { // Changed from verifyAdmin
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'admin_uploads' },
      (error, result) => {
        if (error) return res.status(500).json({ success: false, message: error.message });
        res.status(200).json({ success: true, url: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;