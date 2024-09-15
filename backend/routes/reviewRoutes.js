const express = require('express');
const router = express.Router();
const { addResumeReview, getResumeReviews } = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleware');

router.post('/add', protect, addResumeReview);
router.get('/:resume_id', protect, getResumeReviews);

module.exports = router;