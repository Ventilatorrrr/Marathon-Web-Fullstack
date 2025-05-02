const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;

const publicKey = '62712c64892a18ce0ff87c30264f851c';
const privateKey = 'b824087f848f068baa6b31759807d350263400e3';

app.use(express.static(__dirname));

app.get('/api/characters', async (req, res) => {
    const ts = Date.now().toString();
    const stringToHash = ts + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex');

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`;

    console.log('Запит до Marvel URL:', url);
    try
    {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Marvel відповів:', data);
        res.json(data);
    }
    catch (err)
    {
        console.error('Помилка при запиті:', err);
        res.status(500).json({ error: 'Error fetching Marvel data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

