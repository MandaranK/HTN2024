const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  try {
    const { resume_content } = req.body;

    const newResume = new Resume({
      user_id: req.user._id, 
      resume_content,
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading resume' });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user_id: req.user._id });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resumes' });
  }
};