const express = require('express');
const router = express.Router();
const { getWaitlistEntries } = require('../controllers/waitlistController');
const { protect } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(protect);

router.get('/', getWaitlistEntries);

module.exports = router;
