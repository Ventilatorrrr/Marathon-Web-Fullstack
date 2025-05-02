const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Parsing CSV data</title>
    </head>
    <body>
      <h1>Parsing CSV data</h1>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <label>Upload file:
          <input type="file" name="csvfile" accept=".csv" />
        </label>
        <button type="submit">Upload</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/upload', upload.single('csvfile'), (req, res) => {
    const filePath = req.file.path;
    const results = [];

    fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                fs.unlinkSync(filePath); // видаляємо тимчасовий файл
                const headers = Object.keys(results[0] || {});
                res.send(generateHTML(headers, results));
            });
});

function generateHTML(headers, data)
{
    const filters = headers.map((h, i) => `
    <label>${h}:
      <select id="filter-${i}">
        <option value="">All</option>
        ${[...new Set(data.map(row => row[h]))]
            .map(val => `<option value="${val}">${val}</option>`).join('')}
      </select>
    </label>
  `).join(' ');

    const rows = data.map(row => `
    <tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>
  `).join('');

    const filterScript = `
    <script>
      function filterTable() 
      {
        const table = document.getElementById('csv-table');
        const rows = table.tBodies[0].rows;
        const filters = [${headers.map((_, i) => `document.getElementById('filter-${i}').value`).join(',')}];

        for (let row of rows) 
        {
          const cells = row.cells;
          let visible = true;
          filters.forEach((val, i) => {
            if (val && cells[i].innerText !== val) visible = false;
          });
          row.style.display = visible ? '' : 'none';
        }
      }

      ${headers.map((_, i) => `
        document.getElementById('filter-${i}').addEventListener('change', filterTable);
      `).join('')}
    </script>
  `;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>CSV Results</title>
      <style>
        table, th, td { border: 1px solid black; border-collapse: collapse; padding: 4px; }
        th { background: #eee; }
      </style>
    </head>
    <body>
      <h1>CSV Parsed Table</h1>
      ${filters}
      <table id="csv-table">
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      ${filterScript}
    </body>
    </html>
  `;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
