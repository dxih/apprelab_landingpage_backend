const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../controllers/upload.controller');

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), uploadImage);

module.exports = router;
