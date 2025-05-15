const mysql = require('mysql2/promise');
const config = require('./config.json');

async function createUser({ login, password, fullName, email })
{
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });

    try
    {
        const [rows] = await connection.execute(
                'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)',
                [login, password, fullName, email]
        );

    }
    catch (err)
    {
        console.error('Database error:', err.message); // Логування помилки БД
        throw err;
    }
    finally
    {

        await connection.end();
    }
}

module.exports = { createUser };
