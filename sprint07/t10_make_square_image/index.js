const express = require('express');
const Jimp = require('jimp');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/process', async (req, res) => {
    const { url } = req.body;

    try
    {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const image = await Jimp.read(response.data);

        const size = Math.min(image.bitmap.width, image.bitmap.height);
        const x = (image.bitmap.width - size) / 2;
        const y = (image.bitmap.height - size) / 2;

        image.crop(x, y, size, size);

        const original = await image.clone().getBase64Async(Jimp.MIME_PNG);
        const red = await image.clone().color([{ apply: 'red', params: [100] }, { apply: 'green', params: [-100] }, { apply: 'blue', params: [-100] }]).getBase64Async(Jimp.MIME_PNG);
        const green = await image.clone().color([{ apply: 'red', params: [-100] }, { apply: 'green', params: [100] }, { apply: 'blue', params: [-100] }]).getBase64Async(Jimp.MIME_PNG);
        const blue = await image.clone().color([{ apply: 'red', params: [-100] }, { apply: 'green', params: [-100] }, { apply: 'blue', params: [100] }]).getBase64Async(Jimp.MIME_PNG);

        res.json({ original, red, green, blue });

    }
    catch (err)
    {
        console.error("Image error:", err);
        res.status(500).json({ error: 'Image processing failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
