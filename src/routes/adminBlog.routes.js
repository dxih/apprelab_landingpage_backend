const express = require('express');
const router = express.Router();
const { 
  getBlogs, 
  getBlogById,  // ✅ Import new function
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/adminBlog.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.get('/', getBlogs);           // GET all blogs
router.get('/:id', getBlogById);     // ✅ GET single blog by ID
router.post('/', createBlog);        // CREATE new blog
router.put('/:id', updateBlog);      // UPDATE blog
router.delete('/:id', deleteBlog);   // DELETE blog

module.exports = router;