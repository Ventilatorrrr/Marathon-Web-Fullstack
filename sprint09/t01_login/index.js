const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { userModel } = require('./model');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    if (req.session.user)
    {
        return res.redirect('/dashboard');
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password)
    {
        return res.status(400).json({ success: false, message: 'Missing login or password' });
    }

    try
    {
        const user = await userModel.getUserByCredentials(login, password);
        if (user)
        {
            req.session.user = {
                login: user.login,
                status: user.status
            };
            return res.json({ success: true, message: 'Login successful!' });
        }
        else
        {
            res.status(400).json({ success: false, message: 'Invalid login or password' });
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user)
    {
        return res.redirect('/');
    }

    const { login, status } = req.session.user;

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/style.css">
        <title>S.W.O.R.D. - Dashboard</title>
    </head>
    <body>
        <h1>Welcome, ${login}!</h1>
        <p>Status: ${status}</p>
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    </body>
    </html>
    `);
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
        {
            return res.status(500).send('Could not log out');
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
