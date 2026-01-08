require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ============= MIDDLEWARE =============
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ============= ROUTES =============

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Import route files
const waitlistRoutes = require('./routes/waitlistRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminAuthRoutes = require('./routes/adminAuth.routes');
const adminBlogRoutes = require('./routes/adminBlog.routes');
const adminJobRoutes = require('./routes/adminJob.routes');
const uploadRoutes = require('./routes/uploadRoutes');

// Public routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/jobs', jobRoutes);

// Admin routes (protected)
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/admin/jobs', adminJobRoutes);  // ✅ THIS MUST BE HERE
app.use('/api/admin/upload', uploadRoutes);

// ============= ERROR HANDLING =============
const { errorHandler } = require('./middlewares/errorMiddleware');

// 404 handler (must be AFTER all routes)
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler (must be LAST)
app.use(errorHandler);

module.exports = app;
