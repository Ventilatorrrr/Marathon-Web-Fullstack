const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const authMiddleware = require('./auth');

const LoginController = require('./LoginController');
const RegisterController = require('./RegisterController');
const ReminderController = require('./ReminderController');
const MainController = require('./MainController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/main');
    } else {
        res.redirect('/login');
    }
});

// Логін
app.get('/login', LoginController.get);
app.post('/login', LoginController.post);

// Реєстрація
app.get('/register', RegisterController.get);
app.post('/register', RegisterController.post);

// Нагадування пароля
app.get('/reminder', ReminderController.get);
app.post('/reminder', ReminderController.post);

// Головна сторінка
app.get('/main', authMiddleware, MainController.get);

app.post('/update-profile', authMiddleware, MainController.post);


// Маршрут для користувача
app.get('/user', authMiddleware, (req, res) => {
    if (req.session.user.status === 'user')
    {
        res.sendFile(path.join(__dirname, 'views', 'user.html'));
    }
    else
    {
        res.redirect('/main');
    }
});

// Маршрут для адмінa
app.get('/admin', authMiddleware, (req, res) => {
    if (req.session.user.status === 'admin')
    {
        res.sendFile(path.join(__dirname, 'views', 'admin.html'));
    }
    else
    {
        res.redirect('/main');
    }
});

app.get('/session-data', (req, res) => {
    if (req.session.user)
    {
        const { login, status } = req.session.user;
        res.json({ login, status });
    }
    else
    {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
        {
            return res.status(500).send("Failed to log out.");
        }
        res.redirect('/login');
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

