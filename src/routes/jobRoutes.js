const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById } = require('../controllers/jobController');

// Public routes (no authentication required)
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;