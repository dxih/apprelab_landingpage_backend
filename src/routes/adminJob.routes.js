const express = require('express');
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/job.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
