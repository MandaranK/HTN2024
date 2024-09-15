const ResumeReview = require('../models/ResumeReview');

exports.addResumeReview = async (req, res) => {
  try {
    const { resume_id, feedback, rating } = req.body;

    const newReview = new ResumeReview({
      user_id: req.user._id, 
      resume_id,
      feedback,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: 'Resume review added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding resume review' });
  }
};

exports.getResumeReviews = async (req, res) => {
  try {
    const { resume_id } = req.params;
    const reviews = await ResumeReview.find({ resume_id });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resume reviews' });
  }
};