const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'super_secret',
    resave: false,
    saveUninitialized: true,
}));

function hashPassword(password, salt)
{
    return crypto.createHash('sha256').update(password + salt).digest('hex');
}

app.get('/', (req, res) => {
    const hashedPassword = req.session.hashedPassword;
    const message = req.session.message || '';
    const hacked = req.session.hacked || false;

    if (!hashedPassword)
    {
        // 1 сторінка
        res.send(`
            <h1>Password</h1>
            <form method="POST" action="/save">
            <p>Password not saved at session.</p>
            <p>Password for saving to session</p>
            <input type="password" name="password" placeholder="Password to session" required><br>
            <p>Salt for saving to session</p>
            <input type="text" name="salt" placeholder="Salt to session" required><br>
            <button type="submit" style="margin-top: 20px">Save</button>
            </form>
        `);
    }
    else if (hacked)
    {
        // Пароль хакнуто
        res.send(`
            <h1>Password</h1>
            <p style="color:green;">Hacked!</p>
            <form method="POST" action="/save">
            <p>Password not saved at session.</p>
            <p>Password for saving to session</p>
            <input type="password" name="password" placeholder="Password to session" required><br>
            <p>Salt for saving to session</p>
            <input type="text" name="salt" placeholder="Salt to session" required><br>
            <button type="submit" style="margin-top: 20px">Save</button>
            </form>
        `);
    }
    else
    {
        // 2 сторінка
        res.send(`
            <h1>Password</h1>
            ${message ? `<p style="color:red;">${message}</p>` : ''}
            <p>Password saved at session.</p>
            <p>Hash is ${hashedPassword}.</p>
            <form method="POST" action="/guess">
                <p>Try to guess:</p>
                <input type="password" name="guess" placeholder="Password to session" required>
                <button type="submit">Check password</button>
            </form>
            <form method="POST" action="/clear" style="margin-top:10px;">
                <button type="submit">Clear</button>
            </form>
        `);
    }
});

app.post('/save', (req, res) => {
    const { password, salt } = req.body;
    req.session.salt = salt;
    req.session.password = password;
    req.session.hashedPassword = hashPassword(password, salt);
    req.session.hacked = false;
    req.session.message = '';
    res.redirect('/');
});

app.post('/guess', (req, res) => {
    const guess = req.body.guess;
    const hashedGuess = hashPassword(guess, req.session.salt);

    if (hashedGuess === req.session.hashedPassword)
    {
        req.session.hacked = true;
        res.redirect('/');
    }
    else
    {
        req.session.message = 'Access denied!';
        res.redirect('/');
    }
});

app.post('/clear', (req, res) => {
    req.session.destroy(err => {
        if (err)
        {
            return res.send('Error clearing session.');
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});