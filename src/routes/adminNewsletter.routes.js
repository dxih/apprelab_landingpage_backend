const express = require('express');
const router = express.Router();
const { getNewsletterSubscribers } = require('../controllers/adminNewsletter.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(protect);

router.get('/', getNewsletterSubscribers);

module.exports = router;
