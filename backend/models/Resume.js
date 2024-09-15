const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume_content: {
    type: String,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;