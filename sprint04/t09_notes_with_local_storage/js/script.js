function addToLocalStorage()
{
    const textarea = document.getElementById("textInput");
    const text = textarea.value.trim();

    if (!text)
    {
        alert("It's empty. Try to input something in 'Text input'");
        return;
    }

    const now = new Date();
    const timestamp = now.toLocaleString();
    const fullNote = `${text} (${timestamp})`;

    let notes = localStorage.getItem("notesArchive");
    let notesArray = notes ? JSON.parse(notes) : [];

    notesArray.push(fullNote);
    localStorage.setItem("notesArchive", JSON.stringify(notesArray));

    updateOutput();
    textarea.value = "";
}

function clearLocalStorage()
{
    if (confirm("Are you sure?"))
    {
        localStorage.removeItem("notesArchive");
        updateOutput();
    }
}

function updateOutput()
{
    const output = document.getElementById("output");
    let notes = localStorage.getItem("notesArchive");

    if (!notes)
    {
        output.value = "[Empty]";
    }
    else
    {
        const notesArray = JSON.parse(notes);
        output.value = notesArray.join(" | ");
    }
}

document.addEventListener("DOMContentLoaded", updateOutput);
