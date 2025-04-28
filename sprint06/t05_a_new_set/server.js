const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(__dirname));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/apply', upload.single('photo'), (req, res) => {
    const { name, email, age, description } = req.body;
    const photo = req.file;

    if (!name || !email || !age || !description || !photo)
    {
        return res.status(400).send('All fields are required.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        return res.status(400).send('Invalid email format.');
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
        return res.status(400).send('Invalid age.');
    }

    if (description.trim() === '')
    {
        return res.status(400).send('Please provide some information about yourself.');
    }

    console.log('Application received:', { name, email, age, description, photo });

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Application Received</title>
        </head>
        <body>
            <h1>Thank you for your application, ${name}!</h1>
            <p>We will review your qualifications and be in touch soon.</p>
            <p>Here's a summary of your application:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>E-mail:</strong> ${email}</li>
                <li><strong>Age:</strong> ${age}</li>
                <li><strong>About Yourself:</strong> ${description}</li>
                <li><strong>Photo Filename:</strong> ${photo.originalname}</li>
            </ul>
            <a href="/">Back to Application Form</a>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});