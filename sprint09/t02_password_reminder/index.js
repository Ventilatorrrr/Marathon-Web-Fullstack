const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const userModel = require('./models/user');
const config = require('./config.json');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/remind', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Please enter your email' });

    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: 'Email not found' });

    const transporter = nodemailer.createTransport(config.smtp);

    try
    {
        await transporter.sendMail({
            from: `"S.W.O.R.D." <${config.smtp.auth.user}>`,
            to: user.email,
            subject: "Password Reminder",
            text: `Your password is: ${user.password}`,
        });

        res.json({ success: true, message: 'Password has been sent to your email' });
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
