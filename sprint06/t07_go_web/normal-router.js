const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const start = new Date('1939-01-01');
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    res.render('normal', {
        yearn: years,
        monthn: months + 1,
        dayn: days
    });
});

module.exports = router;