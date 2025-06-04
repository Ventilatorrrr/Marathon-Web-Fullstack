const express = require('express');
const db = require('../db');
const router = express.Router();

// Валідатор ID кімнати
function isValidRoomId(roomId) {
  return typeof roomId === 'string' && /^[a-zA-Z0-9]{6,}$/.test(roomId);
}

// 👉 Створення кімнати
router.post('/create-room', (req, res) => {
  const { roomId } = req.body;

  if (!isValidRoomId(roomId)) {
    return res.status(400).json({ error: 'Invalid Room ID format' });
  }

  db.query('SELECT * FROM rooms WHERE id = ?', [roomId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (rows.length > 0) return res.status(400).json({ error: 'Room already exists' });

    db.query('INSERT INTO rooms (id, players_count) VALUES (?, 1)', [roomId], (err2) => {
      if (err2) return res.status(500).json({ error: 'Insert error' });
      res.json({ success: true });
    });
  });
});

// 👉 Перевірка кімнати перед входом
router.get('/check-room', (req, res) => {
  const { roomId } = req.query;

  if (!isValidRoomId(roomId)) {
    return res.status(400).json({ error: 'Invalid Room ID format' });
  }

  db.query('SELECT * FROM rooms WHERE id = ?', [roomId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (rows.length === 0) return res.status(404).json({ error: 'Room not found' });
    if (rows[0].players_count >= 2) return res.status(403).json({ error: 'Room is full' });

    res.json({ success: true });
  });
});

module.exports = router;
