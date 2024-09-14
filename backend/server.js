require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const pdfParse = require('pdf-parse');
const { CohereClient } = require('cohere-ai');
const multer = require('multer');
const upload = multer();

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

const app = express();
const PORT = 5000; 

app.use(cors());

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
            message: 'Hi there, here is this person\'s resume: \n\n' + resumeText + ' \n\n. They are trying to apply for ' + req.body.role + ' roles, at ' + req.body.level + 'level. Please give them advice to improve upon their resume. Please format and space your response out well for readability.',
        });

        console.log(response);

        const feedback = response.text;

        res.json({ feedback });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error while parsing Resume",
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});