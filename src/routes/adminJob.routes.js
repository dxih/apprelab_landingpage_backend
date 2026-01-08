const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

// ✅ CRITICAL: Put authentication AFTER route definitions
// Or you'll get issues with route matching

// GET all jobs
router.get('/', protect, getAllJobs);

// POST create job
router.post('/', protect, createJob);

// GET single job by ID - THIS IS THE ROUTE THAT'S FAILING
router.get('/:id', protect, getJobById);

// PUT update job
router.put('/:id', protect, updateJob);

// DELETE job
router.delete('/:id', protect, deleteJob);

module.exports = router;