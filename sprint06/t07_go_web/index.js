const express = require('express');
const app = express();
const normalRouter = require('./normal-router');
const quantumRouter = require('./quantum-router');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/normal', normalRouter);
app.use('/quantum', quantumRouter);

app.listen(3000, () => {
    console.log('🌐 http://localhost:3000');
});