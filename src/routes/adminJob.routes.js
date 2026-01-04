const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', getAllJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
