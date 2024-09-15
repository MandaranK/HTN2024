const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review_date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const ResumeReview = mongoose.model('ResumeReview', reviewSchema);
module.exports = ResumeReview;