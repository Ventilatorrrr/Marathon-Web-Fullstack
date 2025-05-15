const db = require('../db');

class User
{
    static async create(login, password, email, full_name)
    {
        const sql = 'INSERT INTO users (login, password, email, full_name) VALUES (?, ?, ?, ?)';
        await db.query(sql, [login, password, email, full_name]);
    }

    static async findByLogin(login)
    {
        const [rows] = await db.query('SELECT * FROM users WHERE login = ?', [login]);
        return rows[0];
    }

    static async getPasswordByEmail(email)
    {
        const [rows] = await db.query('SELECT password FROM users WHERE email = ?', [email]);
        return rows[0]?.password || null;
    }

    static async updateById(id, { full_name, email, password })
    {
        const sql = 'UPDATE users SET full_name = ?, email = ?, password = ? WHERE id = ?';
        await db.query(sql, [full_name, email, password, id]);
    }

}

module.exports = User;
