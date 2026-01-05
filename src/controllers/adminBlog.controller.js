const Blog = require('../models/Blog');

// Get all blogs (admin)
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(`Found ${blogs.length} blogs`);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get single blog by ID (admin)
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('=== GET BLOG BY ID ===');
    console.log('Requested blog ID:', id);
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      console.log('Blog not found');
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    console.log('Blog found:', {
      id: blog._id,
      title: blog.title,
      contentSections: blog.content?.length || 0
    });
    
    // Return the blog directly (not wrapped in data object)
    // This matches what the frontend expects
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid blog ID format',
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Error fetching blog', 
      error: error.message 
    });
  }
};

// Create new blog
const createBlog = async (req, res) => {
  try {
    console.log('Creating blog with data:', req.body);
    
    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    if (!req.body.content || !Array.isArray(req.body.content) || req.body.content.length === 0) {
      return res.status(400).json({ message: 'Content is required and must be an array' });
    }
    
    const blog = new Blog(req.body);
    await blog.save();
    
    console.log('Blog created successfully:', blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ message: 'Error creating blog', error: error.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('=== UPDATE BLOG ===');
    console.log('Blog ID:', id);
    console.log('Update data:', req.body);
    
    // Validate required fields
    if (req.body.title !== undefined && !req.body.title) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    
    if (req.body.content !== undefined) {
      if (!Array.isArray(req.body.content) || req.body.content.length === 0) {
        return res.status(400).json({ message: 'Content must be a non-empty array' });
      }
    }
    
    const blog = await Blog.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true,           // Return updated document
        runValidators: true  // Run schema validations
      }
    );
    
    if (!blog) {
      console.log('Blog not found for update');
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    console.log('Blog updated successfully');
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid blog ID format',
        error: error.message 
      });
    }
    
    res.status(400).json({ message: 'Error updating blog', error: error.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting blog:', id);
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      console.log('Blog not found for deletion');
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    console.log('Blog deleted successfully');
    res.json({ message: 'Blog deleted successfully', deletedBlog: blog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid blog ID format',
        error: error.message 
      });
    }
    
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};

module.exports = { 
  getBlogs, 
  getBlogById,
  createBlog, 
  updateBlog, 
  deleteBlog 
};