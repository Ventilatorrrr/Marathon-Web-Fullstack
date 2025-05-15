const path = require('path');
const User = require('./models/user');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, 'views/login.html'));
    },

    post: async (req, res) => {
        const { login, password } = req.body;
        const user = await User.findByLogin(login);

        if (user && user.password === password) {
            req.session.user = user;
            res.redirect('/main');
        } else {
            res.redirect('/login?error=Invalid credentials');
        }
    }
};
