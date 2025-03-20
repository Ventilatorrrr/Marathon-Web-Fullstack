function copyObj(obj)
{
    if (obj === null || typeof obj !== 'object')
    {
        return obj;
    }

    let copy = {};

    for (let value in obj) {
        if (obj.hasOwnProperty(value))
        {
            if (typeof obj[value] === 'object')
            {
                copy[value] = copyObj(obj[value]);
            } else {
                copy[value] = obj[value];
            }
        }
    }

    return copy;
}