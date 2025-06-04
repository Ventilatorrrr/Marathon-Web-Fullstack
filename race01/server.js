const db = require('./db'); // ⬅️ Обов’язково імпортуй

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // <== для socket.io
const io = socketIo(server);

const PORT = 3000;

// Helmet із CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
      scriptSrcElem: ["'self'", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "ws://localhost:3000"], // <-- дозволяємо WebSocket
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      mediaSrc: ["'self'"],
      workerSrc: ["'self'", "blob:"],
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/cards', express.static(path.join(__dirname, 'image/cards')));
app.use('/sounds', express.static(path.join(__dirname, 'sounds')));
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
app.use('/', authRoutes);
app.use('/', settingsRoutes);
const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/', leaderboardRoutes);

// Додаткові маршрути
app.get('/loading', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'loading.html'));
});

app.get('/me', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
  res.json(req.session.user);
});

// ⬇️ Додано вручну маршрут до play.html з папки views
app.get('/play.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'play.html'));
});
app.get('/room', (req, res) => {
  res.sendFile(__dirname + '/views/room.html');
});
const roomsRouter = require('./routes/rooms');
app.use('/api', roomsRouter);

const gameSocket = require('./scripts/gameSocket');
gameSocket(io);

server.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
