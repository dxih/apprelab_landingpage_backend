const Blog = require('../models/Blog');

// Admin CRUD
const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
};

const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
