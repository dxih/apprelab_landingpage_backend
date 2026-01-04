require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const waitlistRoutes = require('./routes/waitlistRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const jobRoutes = require('./routes/jobRoutes');
// Admin routes
const adminAuthRoutes = require('./routes/adminAuth.routes');
const adminBlogRoutes = require('./routes/adminBlog.routes');
const adminJobRoutes = require('./routes/adminJob.routes');
const uploadRoutes = require('./routes/uploadRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');


const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ HEALTH ROUTE
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/jobs', jobRoutes);

app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/admin/jobs', adminJobRoutes);
app.use('/api/admin/upload', uploadRoutes);
// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
