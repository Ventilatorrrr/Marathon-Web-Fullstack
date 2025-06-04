const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

router.post('/settings', (req, res) => {
  const { avatar, 'new-login': newLogin, 'current-password': currentPassword, 'new-password': newPassword } = req.body;
  const user = req.session.user;

  if (!user) return res.redirect('/login');

  db.query('SELECT * FROM users WHERE id = ?', [user.id], async (err, results) => {
    if (err || results.length === 0) {
      console.error('User not found:', err);
      return res.redirect('/settings?error=' + encodeURIComponent('User not found'));
    }

    const dbUser = results[0];

    // 1. Перевіряємо поточний пароль
    const isPasswordCorrect = await bcrypt.compare(currentPassword, dbUser.password);
    if (!isPasswordCorrect) {
      return res.redirect('/settings?error=' + encodeURIComponent('Wrong current password'));
    }

    // 2. Хешуємо новий пароль, якщо він вказаний
    let updatedPassword = dbUser.password;
    if (newPassword && newPassword.trim() !== '') {
      updatedPassword = await bcrypt.hash(newPassword, 10);
    }

    // 3. Перевіряємо логін — чи новий логін заданий
    const updatedLogin = newLogin && newLogin.trim() !== '' ? newLogin.trim() : dbUser.login;

    // 4. Аватар (вже працює у тебе)
    const updatedAvatar = avatar || dbUser.avatar;

    // 5. Оновлюємо користувача в базі
    db.query(
      'UPDATE users SET login = ?, password = ?, avatar = ? WHERE id = ?',
      [updatedLogin, updatedPassword, updatedAvatar, user.id],
      (err2) => {
        if (err2) {
          console.error('Update error:', err2);
          return res.redirect('/settings?error=' + encodeURIComponent('Login already exists'));
        }

        // 6. Оновлюємо сесію
        req.session.user.login = updatedLogin;
        req.session.user.avatar = updatedAvatar;
        req.session.user.password = updatedPassword;

        return res.redirect('/settings?success=' + encodeURIComponent('Changes saved'));
      }
    );
  });
});

module.exports = router;
