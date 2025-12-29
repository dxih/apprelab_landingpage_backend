const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog } = require('../controllers/adminBlogController');

// Admin CRUD routes
router.post('/create', createBlog);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;
