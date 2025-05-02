const form = document.getElementById('urlForm');
const input = document.getElementById('urlInput');
const resultDiv = document.getElementById('result');
const urlDisplay = document.getElementById('urlDisplay');
const backLink = document.getElementById('backLink');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = input.value;
    const response = await fetch('/fetch-body', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.body)
    {
        const contentWithBody = `<body>\n${data.body}\n</body>`;
        resultDiv.innerHTML = contentWithBody
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }
    else
    {
        resultDiv.textContent = data.error || 'No body content found.';
    }

    urlDisplay.textContent = `url: ${url}`;
    backLink.style.display = 'inline';
});

backLink.addEventListener('click', () => {
    input.value = '';
    resultDiv.textContent = '';
    urlDisplay.textContent = '';
    backLink.style.display = 'none';
});
