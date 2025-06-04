const express = require('express');
const router = express.Router();
const db = require('../db');

// Рендер сторінки
router.get('/leaderboard', (req, res) => {
  res.sendFile('leaderboard.html', { root: './views' });
});

// API для отримання даних
router.get('/api/leaderboard', (req, res) => {
  db.query(
    'SELECT login, avatar, wins, losses, total_games FROM users ORDER BY wins DESC LIMIT 10',
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json(results);
    }
  );
});

module.exports = router;
