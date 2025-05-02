const express = require('express');
const cors = require('cors');
const iconv = require('iconv-lite');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/convert', (req, res) => {
    const { text, charsets } = req.body;
    const result = {};

    charsets.forEach(charset => {
        try
        {
            const encoded = iconv.encode(text, charset);
            const decoded = iconv.decode(encoded, charset);
            result[charset] = decoded;
        }
        catch (error)
        {
            result[charset] = '[Encoding Error]';
        }
    });

    res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// npm install iconv-lite