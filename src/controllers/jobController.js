const Job = require('../models/Job');

/**
 * GET all jobs
 */
const getAllJobs = async (req, res, next) => {
  try {
    console.log('📋 getAllJobs called');
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${jobs.length} jobs`);
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error('❌ Error in getAllJobs:', error);
    next(error);
  }
};

/**
 * GET single job by ID
 */
const getJobById = async (req, res, next) => {
  try {
    console.log('🔍 getJobById called with ID:', req.params.id);
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      console.log('❌ Job not found:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    console.log('✅ Job found:', job.title);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error('❌ Error in getJobById:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid job ID format' 
      });
    }
    
    next(error);
  }
};

/**
 * CREATE job
 */
const createJob = async (req, res, next) => {
  try {
    console.log('➕ createJob called');
    console.log('Request body:', req.body);
    
    const {
      title,
      type,
      location,
      shortDescription,
      description,
      responsibilities,
      requirements,
      niceToHave,
      offer,
      applicationLink,
      companyLogo,
      status
    } = req.body;

    if (!title || !type || !location) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Title, type, and location are required fields'
      });
    }

    const job = await Job.create({
      title,
      type,
      location,
      shortDescription,
      description,
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      niceToHave: niceToHave || [],
      offer: offer || [],
      applicationLink,
      companyLogo,
      status: status || 'active'
    });

    console.log('✅ Job created:', job._id);
    res.status(201).json({ 
      success: true, 
      data: job,
      message: 'Job created successfully'
    });
  } catch (error) {
    console.error('❌ Error in createJob:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    next(error);
  }
};

/**
 * UPDATE job
 */
const updateJob = async (req, res, next) => {
  try {
    console.log('✏️ updateJob called with ID:', req.params.id);
    console.log('Request body:', req.body);
    
    const existingJob = await Job.findById(req.params.id);
    
    if (!existingJob) {
      console.log('❌ Job not found for update:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    console.log('✅ Job updated:', job._id);
    res.status(200).json({ 
      success: true, 
      data: job,
      message: 'Job updated successfully'
    });
  } catch (error) {
    console.error('❌ Error in updateJob:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid job ID format' 
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    next(error);
  }
};

/**
 * DELETE job
 */
const deleteJob = async (req, res, next) => {
  try {
    console.log('🗑️ deleteJob called with ID:', req.params.id);
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      console.log('❌ Job not found for deletion:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    await Job.findByIdAndDelete(req.params.id);
    
    console.log('✅ Job deleted:', req.params.id);
    res.status(200).json({ 
      success: true, 
      message: 'Job deleted successfully' 
    });
  } catch (error) {
    console.error('❌ Error in deleteJob:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid job ID format' 
      });
    }
    
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};