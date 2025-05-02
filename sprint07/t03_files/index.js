const express = require('express');
const fs = require('fs');
const path = require('path');
const File = require('./File');
const FileList = require('./FileList');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/file-list', (req, res) => {
    const fileList = new FileList();
    res.json(fileList.getList());
});

app.post('/create', (req, res) => {
    const { filename, content } = req.body;
    const file = new File(filename);
    file.write(content);
    res.sendStatus(200);
});

app.get('/select-file', (req, res) => {
    const filename = req.query.file;
    const file = new File(filename);
    const content = file.read();
    res.json({ filename, content });
});

app.post('/delete-file', (req, res) => {
    const { filename } = req.body;
    const file = new File(filename);
    file.delete();
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
