function concat(string1, string2)
{
    input.count = 0;
    function input()
    {
        input.count++;
        let secondString = prompt("Enter a phrase!").trim();
        return string1 + " " + secondString;
    }

    if (typeof string1 === "string" && typeof string2 === "string")
    {
        return string1 + " " + string2;
    }

    if (typeof string1 === "string" && string2 === undefined)
    {
        return input;
    }
}