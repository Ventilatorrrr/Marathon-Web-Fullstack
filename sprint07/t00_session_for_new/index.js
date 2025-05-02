const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if (req.session.hero) {
        const hero = req.session.hero;
        res.send(`
            <h1>Session for new</h1>
            <p><strong>name:</strong> ${hero.realName}</p>
            <p><strong>alias:</strong> ${hero.alias}</p>
            <p><strong>age:</strong> ${hero.age}</p>
            <p><strong>description:</strong> ${hero.description}</p>
            <p><strong>photo:</strong><br>${hero.photo ? `<img src="${hero.photo}" alt="Hero Photo" width="200">` : 'No photo'}</p>
            <p><strong>experience:</strong> ${hero.powersCount}</p>
            <p><strong>level:</strong> ${hero.level}</p>
            <p><strong>purpose:</strong> ${hero.publicity}</p>
            <form method="POST" action="/forget">
                <button type="submit">FORGET</button>
            </form>
        `);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.post('/', (req, res) => {
    const { realName, alias, age, description, levelofcntrl, photo } = req.body;

    const powers = [
        req.body.St,
        req.body.Sp,
        req.body.In,
        req.body.T,
        req.body.Im,
        req.body.A
    ].filter(Boolean);

    const powersCount = powers.length;

    let publicity = '0';
    if (req.body.ghost) publicity = '1';
    if (req.body.comics) publicity = '2';
    if (req.body.club) publicity = '3';
    if (req.body.star) publicity = '4';

    req.session.hero = {
        realName: realName || '',
        alias: alias || '',
        age: age || '',
        description: description || '',
        photo: photo || '', // збереження фото
        powersCount: powersCount,
        level: levelofcntrl || '',
        publicity: publicity
    };

    res.redirect('/');
});

app.get('/save', (req, res) => {
    req.session.hero = req.query;
    res.redirect('/');
});

app.post('/forget', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error clearing session.');
        }
        res.redirect('/');
    });
});

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
