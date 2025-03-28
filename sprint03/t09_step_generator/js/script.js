function* generator()
{
    let previousResult = 1;

    while (true)
    {
        const userInput = prompt(`Previous result: ${previousResult}. Enter a new number:`);

        if (userInput === null)
        {
            console.log("Generator stopped by user.");
            return;
        }

        const newNumber = Number(userInput);

        if (isNaN(newNumber))
        {
            console.error("Invalid number!");
            continue;
        }

        previousResult += newNumber;

        if (previousResult > 10000)
        {
            previousResult = 1;
        }

        yield previousResult;
    }
}