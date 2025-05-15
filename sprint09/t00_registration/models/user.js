const db = require('../db');

module.exports = {
    isUserExists: async (login, email) => {
        if (!login || !email) {
            throw new Error('Login and email are required for user existence check');
        }

        const [rows] = await db.query(
                'SELECT * FROM users WHERE login = ? OR email = ?',
                [login, email]
        );
        return rows.length > 0;
    },

    createUser: async (login, password, fullName, email) => {
        return db.query(
                'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)',
                [login, password, fullName, email]
        );
    },
};
