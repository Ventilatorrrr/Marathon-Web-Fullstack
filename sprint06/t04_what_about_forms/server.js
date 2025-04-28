const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.post('/check-answer', (req, res) => {
    try {
        const { answer } = req.body;

        if (!answer)
        {
            return res.status(400).json({ correct: false, message: 'No answer selected!' });
        }

        if (answer === 'correct')
        {
            res.json({ correct: true, message: 'Correct!' });
        }
        else if (answer === 'wrong')
        {
            res.json({ correct: false, message: 'Ty sho z hluzdu z\'yikhav?' });
        }
    } catch (error) {
        console.error('Error while checking answer:', error);
        res.status(500).json({ correct: false, message: 'Internal server error' });
    }
});

app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
