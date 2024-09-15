require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const pdfParse = require('pdf-parse');
const multer = require('multer');
const upload = multer();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { CohereClient } = require('cohere-ai');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/reviews', reviewRoutes);

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            error: "No file uploaded or invalid file uploaded",
        });
    }

    try {
        const pdfData = await pdfParse(file.buffer); 
        const resumeText = pdfData.text; 

        const response = await cohere.chat({
            message: 'Hi there, here is this person\'s resume: \n\n' + resumeText + ' \n\n. They are trying to apply for ' + req.body.role + ' roles, at ' + req.body.level + ' level. Please give them advice to improve upon their resume. Please format and space your response out well for readability.',
        });

        const feedback = response.text;

        res.json({ feedback });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error while parsing Resume",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});