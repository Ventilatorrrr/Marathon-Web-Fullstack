class StrFrequency
{
    constructor(str)
    {
        this.str = str;
    }

    letterFrequencies()
    {
        const freq = {};
        for (const ch of this.str.toUpperCase())
        {
            if (/[A-Z]/.test(ch))
            {
                freq[ch] = (freq[ch] || 0) + 1;
            }
        }
        return freq;
    }

    wordFrequencies()
    {
        const freq = {};
        const words = this.str
            .toUpperCase()
            .replace(/[^A-Z\s]/g, '')
            .trim()
            .split(/\s+/);

        for (const word of words)
        {
            if (word === '') continue;
            freq[word] = (freq[word] || 0) + 1;
        }

        return Object.keys(freq).length > 0 ? freq : { '': 1 };
    }

    reverseString()
    {
        return this.str.split('').reverse().join('');
    }
}

module.exports = StrFrequency;