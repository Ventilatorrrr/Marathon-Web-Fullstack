function addWords(obj, wrds)
{
    let arrStr1 = obj.words.trim().split(' ');
    let newWords = wrds.trim().split(' ');

    arrStr1.splice(arrStr1.length, 0, ...newWords);

    for (let i = 0; i < arrStr1.length; i++)
    {
        if (arrStr1.indexOf(arrStr1[i]) !== i)
        {
            arrStr1.splice(i, 1);
            i--;
        }
    }

    obj.words = arrStr1.join(' ');
}

function removeWords(obj, wrds)
{
    let arrStr2 = obj.words.trim().split(' ');
    let wordsToRemove  = wrds.trim().split(' ');

    for (let i = 0; i < arrStr2.length; i++)
    {
        if (wordsToRemove.includes(arrStr2[i]))
        {
            arrStr2.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < arrStr2.length; i++)
    {
        if (arrStr2.indexOf(arrStr2[i]) !== i)
        {
            arrStr2.splice(i, 1);
            i--;
        }
    }

    obj.words = arrStr2.join(' ');
}

function changeWords(obj, oldWrds, newWrds)
{
    let arrStr3 = obj.words.trim().split(' ');
    let oldWords  = oldWrds.trim().split(' ');
    let newWords  = newWrds.trim().split(' ');

    for (let i = 0; i < oldWords.length; i++)
    {
        let index = arrStr3.indexOf(oldWords[i]);
        while (index !== -1)
        {
            arrStr3.splice(index, 1);
            index = arrStr3.indexOf(oldWords[i]);
        }
    }

    arrStr3.push(...newWords);

    for (let i = 0; i < arrStr3.length; i++)
    {
        if (arrStr3.indexOf(arrStr3[i]) !== i)
        {
            arrStr3.splice(i, 1);
            i--;
        }
    }

    obj.words = arrStr3.join(' ');
}