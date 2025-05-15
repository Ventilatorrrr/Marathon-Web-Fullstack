const path = require('path');
const User = require('./models/user');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, 'views/register.html'));
    },

    post: async (req, res) => {
        const { login, password, confirm_password, full_name, email } = req.body;

        if (password !== confirm_password) {
            return res.redirect('/register?error=Passwords do not match');
        }

        const existingUser = await User.findByLogin(login);
        if (existingUser) {
            return res.redirect('/register?error=Login already exists');
        }

        await User.create(login, password, email, full_name);
        res.redirect('/login');
    }
};
