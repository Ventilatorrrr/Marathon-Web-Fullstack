const db = require('./db');

module.exports = {
    async getUserByEmail(email) {
        const [rows] = await db.query(
                'SELECT id, email, password FROM users WHERE email = ?',
                [email]
        );
        return rows[0];
    }
};
