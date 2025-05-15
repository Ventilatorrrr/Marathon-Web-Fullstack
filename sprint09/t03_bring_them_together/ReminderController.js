const path = require('path');
const User = require('./models/user');
const nodemailer = require('nodemailer');
const config = require('./config.json');

const transporter = nodemailer.createTransport({
    service: config.smtp.service,
    auth: config.smtp.auth
});

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, 'views/reminder.html'));
    },

    post: async (req, res) => {
        const { email } = req.body;
        const password = await User.getPasswordByEmail(email);

        if (!password) {
            return res.redirect('/reminder?error=Email not found');
        }

        try {
            await transporter.sendMail({
                from: `"S.W.O.R.D." <${config.smtp.auth.user}>`,
                to: email,
                subject: 'Password Reminder',
                text: `Your password is: ${password}`
            });
            res.redirect('/reminder?success=Password sent to your email');
        } catch (err) {
            console.error(err);
            res.redirect('/reminder?error=Failed to send email');
        }
    }
};
