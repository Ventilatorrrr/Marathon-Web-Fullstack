function getCookie(name)
{
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++)
    {
        let [key, value] = cookies[i].split("=");
        if (key === name)
        {
            return value;
        }
    }
    return "";
}

function setCookie(name, value, days)
{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

function addCookies()
{
    const textarea = document.getElementById("textInput");
    let text = textarea.value.trim();

    if (!text)
    {
        alert("It's empty. Try to input something in 'Text input'");
        return;
    }

    let existingNotes = getCookie("notesArchive");
    let notesArray = existingNotes ? existingNotes.split("|") : [];
    notesArray.push(text.replace(/;/g, "%3B").replace(/,/g, "%2C").replace(/=/g, "%3D"));

    setCookie("notesArchive", notesArray.join("|"), 30);

    updateOutput();
    textarea.value = "";
}

function clearCookies()
{
    if (confirm("Are you sure?"))
    {
        setCookie("notesArchive", "", -1);
        updateOutput();
    }
}

function updateOutput()
{
    const output = document.getElementById("output");
    let notes = getCookie("notesArchive");

    if (!notes)
    {
        output.value = "[Empty]";
    }
    else
    {
        output.value = notes.replace(/%3B/g, ";").replace(/%2C/g, ",").replace(/%3D/g, "=").split("|").join(" | ");
    }
}

document.addEventListener("DOMContentLoaded", updateOutput);
