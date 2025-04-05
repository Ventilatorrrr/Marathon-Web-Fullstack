function transformation()
{
    const background = document.getElementById("lab");
    const text = document.getElementById("hero");

    if (text.innerText === "Bruce Banner")
    {
        background.style.backgroundColor = "#70964b";
        text.innerText = "Hulk";
        text.style.fontSize = "130px";
        text.style.letterSpacing = "6px";
    }
    else
    {
        background.style.backgroundColor = "#ffb300";
        text.innerText = "Bruce Banner";
        text.style.fontSize = "60px";
        text.style.letterSpacing = "2px";
    }
}
