// routes/uploadRoutes.js - FIXED VERSION
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middlewares/auth.middleware');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// ✅ Verify Cloudinary config on server start
console.log('=== CLOUDINARY CONFIG CHECK ===');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Missing');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/admin/upload - Upload image to Cloudinary
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    console.log('=== UPLOAD REQUEST RECEIVED ===');
    console.log('User authenticated:', !!req.user);
    console.log('File present:', !!req.file);
    
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({ 
        success: false, 
        message: 'No file provided' 
      });
    }

    console.log('File details:');
    console.log('- Original name:', req.file.originalname);
    console.log('- Size:', req.file.size, 'bytes');
    console.log('- Mimetype:', req.file.mimetype);
    console.log('- Buffer length:', req.file.buffer.length);

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.error('❌ Cloudinary not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Cloudinary configuration missing. Please check server environment variables.' 
      });
    }

    console.log('Uploading to Cloudinary...');

    // Upload to Cloudinary using upload_stream with Promise wrapper
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'blog_uploads',
          resource_type: 'auto',
          // Optional: Add transformations
          transformation: [
            { width: 1200, height: 800, crop: 'limit' }, // Limit max dimensions
            { quality: 'auto' }, // Auto quality optimization
            { fetch_format: 'auto' } // Auto format selection
          ]
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Upload successful');
            console.log('- Secure URL:', result.secure_url);
            console.log('- Public ID:', result.public_id);
            console.log('- Format:', result.format);
            resolve(result);
          }
        }
      );

      // Write the buffer to the stream
      uploadStream.end(req.file.buffer);
    });

    const result = await uploadPromise;

    res.status(200).json({ 
      success: true, 
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      message: 'File uploaded successfully'
    });

  } catch (err) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error type:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', err);
    
    // Handle specific error types
    let statusCode = 500;
    let errorMessage = 'Upload failed';
    
    if (err.message === 'Only image files are allowed!') {
      statusCode = 400;
      errorMessage = 'Only image files are allowed';
    } else if (err.http_code === 401) {
      statusCode = 401;
      errorMessage = 'Invalid Cloudinary credentials';
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    res.status(statusCode).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// ✅ Optional: Add endpoint to delete image from Cloudinary
router.delete('/:publicId', protect, async (req, res) => {
  try {
    const { publicId } = req.params;
    console.log('Deleting image with public_id:', publicId);
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      res.json({ 
        success: true, 
        message: 'Image deleted successfully' 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Image not found or already deleted' 
      });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete image',
      error: err.message 
    });
  }
});

module.exports = router;