function calculateTime()
{
    const start = new Date('1939-01-01');
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0)
    {
        months -= 1;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0)
    {
        years -= 1;
        months += 12;
    }

    return{
        years: () => years,
        months: () => months,
        days: () => days
    };
}

module.exports = { calculateTime };
