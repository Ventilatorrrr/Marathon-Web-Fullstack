const express = require('express');
const router = express.Router();
const normalTime = require('./normal-router');

router.get('/', (req, res) => {
    const start = new Date('1939-01-01');
    const now = new Date();

    let normalYears = now.getFullYear() - start.getFullYear();
    let normalMonths = now.getMonth() - start.getMonth();
    let normalDays = now.getDate() - start.getDate();

    if (normalDays < 0) {
        normalMonths--;
        normalDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (normalMonths < 0) {
        normalYears--;
        normalMonths += 12;
    }

    const totalNormalDays = normalYears * 365 + normalMonths * 30 + normalDays;
    const totalQuantumDays = Math.round(totalNormalDays / 7);

    const quantumYears = Math.floor(totalQuantumDays / 365);
    const remainingDaysAfterYears = totalQuantumDays % 365;

    const quantumMonths = Math.floor(remainingDaysAfterYears / 30);
    const quantumDays = remainingDaysAfterYears % 30;

    res.render('quantum', {
        yearn: quantumYears,
        monthn: quantumMonths,
        dayn: quantumDays
    });
});

module.exports = router;
