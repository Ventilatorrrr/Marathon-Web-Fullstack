let beginRange = prompt('Enter a start number', '1');
let endRange = prompt('Enter an end number', '100');

function checkDivision(beginRange, endRange)
{
    if(beginRange > endRange || !/^[1-9]*$/.test(beginRange) || !/^[1-9]*$/.test(endRange))
    {
        console.log('Invalid input');
    }
    else
    {
        for (let i = beginRange; i <= endRange; i++)
        {
            if(i % 2 === 0 && i % 10 === 0 && i % 3 === 0)
            {
                console.log(i + " is even, multiple of 3, multiple of 10");
            }
            else if(i % 2 === 0 && i % 10 === 0)
            {
                console.log(i + " is even,  multiple of 10");
            }
            else if(i % 3 === 0 && i % 10 === 0)
            {
                console.log(i + " ,  multiple of 10");
            }
            else if (i % 2 === 0 && i % 3 === 0)
            {
                console.log(i + " is even, multiple of 3");
            }
            else  if(i % 2 === 0)
            {
                console.log(i + " is even");
            }
            else if(i % 3 === 0)
            {
                console.log(i + " is multiple of 3");
            }
            else if(i % 10 === 0)
            {
                console.log(i + " is multiple of 10");
            }
            else
            {
                console.log(i + " -");
            }
        }
    }
}

checkDivision(beginRange, endRange);