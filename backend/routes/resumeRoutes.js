const express = require('express');
const router = express.Router();
const { uploadResume, getUserResumes } = require('../controllers/resumeController');
const protect = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadResume);
router.get('/', protect, getUserResumes);

module.exports = router;