const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/api/characters', async (req, res) => {
    const publicKey = '88a00559e33f5fa8ce206800b8e313e8';
    const privateKey = '67feff7c8b3665e7cf072ecd8e2a6c6584ae30e6';
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Запит до Marvel API не вдався:', error.message);
        res.status(500).json({ error: 'Request failed', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


