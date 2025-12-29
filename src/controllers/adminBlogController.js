const Blog = require('../models/Blog');

// Create a new blog
const createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const newBlog = await Blog.create({ title, content, author });
    res.status(201).json({ success: true, message: 'Blog created', data: newBlog });
  } catch (error) {
    next(error);
  }
};

// Update existing blog
const updateBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    await blog.save();
    res.status(200).json({ success: true, message: 'Blog updated', data: blog });
  } catch (error) {
    next(error);
  }
};

// Delete blog
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    await blog.remove();
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, updateBlog, deleteBlog };
