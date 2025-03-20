function total(addCount, addPrice, currentTotal = 0)
{
    addCount = Number(addCount);
    addPrice = Number(addPrice);
    currentTotal = Number(currentTotal);

    if (addCount < 0 || addPrice < 0)
    {
        console.log("Number of items or Price < 0");
        return currentTotal;
    }

    let newTotal;
    newTotal = addPrice * addCount + currentTotal;
    return newTotal;
}