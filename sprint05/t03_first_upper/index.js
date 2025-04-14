function firstUpper(str)
{
    if (!str || typeof str !== 'string') return '';

    str = str.trim();

    if (str.length === 0) return '';

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = { firstUpper };
