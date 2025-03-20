function checkBrackets(str)
{

    if (typeof str !== 'string' || (!str.includes('(') && !str.includes(')')))
    {
        return -1;
    }

    let balance = 0;
    let missing = 0;

    for (let char of str)
    {
        if (char === '(')
        {
            balance++;
        } else if (char === ')')
        {
            if (balance > 0)
            {
                balance--;
            } else
            {
                missing++;
            }
        }
    }

    return missing + balance;
}