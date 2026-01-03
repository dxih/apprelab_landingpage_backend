const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/adminBlog.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', getBlogs);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
