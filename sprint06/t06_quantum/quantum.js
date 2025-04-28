const normal = require('./normal');

function calculateTime()
{
    const real = normal.calculateTime();

    const totalYears = real.years();
    const totalMonths = real.months();
    const totalDays = real.days();

    const quantumYears = Math.floor(totalYears / 7);
    const remainingYears = totalYears % 7;

    const quantumMonthsTotal = Math.floor((remainingYears * 12 + totalMonths) / 7);
    const quantumMonths = quantumMonthsTotal % 12;

    const quantumDays = totalDays;

    return [quantumYears, quantumMonths, quantumDays];
}

module.exports = { calculateTime };
