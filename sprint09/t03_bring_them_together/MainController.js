const User = require('./models/user');
const path = require('path');

module.exports = {
    get: (req, res) => {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, './views/main.html'));
        } else {
            res.redirect('/login');
        }
    },

    post: async (req, res) => {
        const { full_name, email, password } = req.body;
        const userId = req.session.user.id;

        try {
            await User.updateById(userId, { full_name, email, password });

            req.session.user.full_name = full_name;
            req.session.user.email = email;

            res.redirect('/main');
        } catch (err) {
            console.error(err);
            res.status(500).send('Failed to update profile');
        }
    }
};
