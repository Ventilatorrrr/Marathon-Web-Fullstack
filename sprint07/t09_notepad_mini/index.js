const express = require('express');
const bodyParser = require('body-parser');
const Note = require('./Note');
const NotePad = require('./NotePad');
const app = express();
const pad = new NotePad();

app.use(bodyParser.urlencoded({ extended: false }));

function renderPage(selectedNote = null)
{
    const notesList = pad.all().map(note => `
    <li>
      <a href="/?detail=${note.date}">${note.date} > ${note.name}</a>
      <a href="/delete?date=${note.date}">DELETE</a>
    </li>
  `).join('');

    let detail = '';
    if (selectedNote)
    {
        detail = `
      <h2>Detail of "${selectedNote.name}"</h2>
      <ul>
        <li><b>date:</b> ${selectedNote.date}</li>
        <li><b>name:</b> ${selectedNote.name}</li>
        <li><b>importance:</b> ${selectedNote.importance}</li>
        <li><b>text:</b> ${selectedNote.text}</li>
      </ul>
    `;
    }

    return `
    <!DOCTYPE html>
    <html>
    <head><title>Notepad mini</title></head>
    <body>
      <h1>Notepad mini</h1>
      <form action="/create" method="POST">
        <input name="name" placeholder="Name" required /> <br />
        <select name="importance">
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select><br />
        <textarea name="text" placeholder="Text of note..." required></textarea><br />
        <button type="submit">Create</button>
      </form>
      <h2>List of notes</h2>
      <ul>${notesList}</ul>
      ${detail}
    </body>
    </html>
  `;
}

app.get('/', (req, res) => {
    const note = req.query.detail ? pad.find(req.query.detail) : null;
    res.send(renderPage(note));
});

app.post('/create', (req, res) => {
    const { name, importance, text } = req.body;
    pad.add(new Note(name, importance, text));
    res.redirect('/');
});

app.get('/delete', (req, res) => {
    pad.delete(req.query.date);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Notepad mini: http://localhost:${PORT}`));
