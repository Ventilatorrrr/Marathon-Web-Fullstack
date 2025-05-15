const express = require('express');
const path = require('path');
const helmet = require('helmet');
const userModel = require('./models/user');
const app = express();
const PORT = 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            frameSrc: ["'none'"],
            mediaSrc: ["'self'"],
            workerSrc: ["'self'", "blob:"],
        }
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { login, password, full_name, email } = req.body;

    if (!login || !password || !full_name || !email)
    {
        return res.status(400).send('All fields are required');
    }

    try
    {
        const userExists = await userModel.isUserExists(login, email);

        if (userExists)
        {
            return res.status(400).send('Login or email is already taken');
        }

        await userModel.createUser(login, password, full_name, email);
        res.send('Registration successful!');
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).send('An error occurred during registration: ' + err.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
