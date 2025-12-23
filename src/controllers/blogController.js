const Blog = require('../models/Blog');

// Fetch all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

// Fetch single blog
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// Increment likes
const likeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.likes += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// Increment shares
const shareBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.shares += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// Add comment
const commentBlog = async (req, res, next) => {
  try {
    const { name, comment } = req.body;
    if (!name || !comment) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.comments.push({ name, comment });
    await blog.save();

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBlogs, getBlogById, likeBlog, shareBlog, commentBlog };
