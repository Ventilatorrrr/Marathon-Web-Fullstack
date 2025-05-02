import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));
app.use(express.json());

app.post('/fetch-body', async (req, res) => {
    const { url } = req.body;

    try
    {
        const response = await fetch(url);
        const html = await response.text();

        const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyContent = match ? match[1] : null;

        res.json({ body: bodyContent });
    }
    catch (err)
    {
        res.json({ error: 'Failed to fetch page: ' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
