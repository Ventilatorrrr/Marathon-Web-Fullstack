const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;

    let visits = [];
    if (req.cookies.visits) {
        try
        {
            visits = JSON.parse(req.cookies.visits);
        }
        catch (e)
        {
            visits = [];
        }
    }

    visits.push(now);
    visits = visits.filter(ts => ts >= oneMinuteAgo);

    res.cookie('visits', JSON.stringify(visits), { maxAge: 24 * 60 * 60 * 1000 });

    res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Cookie counter</title></head>
      <body>
        <h1>Cookie counter</h1>
        <p>This page was loaded <strong>${visits.length}</strong> time(s) in last minute</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
