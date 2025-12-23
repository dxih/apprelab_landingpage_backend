const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  likeBlog,
  shareBlog,
  commentBlog
} = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/:id/like', likeBlog);
router.post('/:id/share', shareBlog);
router.post('/:id/comment', commentBlog);

module.exports = router;
