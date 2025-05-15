const db = require('../db');

module.exports = {
    async getUserByCredentials(login, password) {
        const [rows] = await db.query(
                'SELECT login, status FROM users WHERE login = ? AND password = ?',
                [login, password]
        );
        return rows[0];
    }
};