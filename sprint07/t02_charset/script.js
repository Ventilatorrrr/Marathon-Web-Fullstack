const inputString = document.getElementById('inputString');
const charsetSelect = document.getElementById('charsetSelect');
const changeBtn = document.getElementById('changeBtn');
const clearBtn = document.getElementById('clearBtn');
const outputs = document.getElementById('outputs');

changeBtn.addEventListener('click', async () => {
    const text = inputString.value;
    const selectedCharsets = Array.from(charsetSelect.selectedOptions).map(opt => opt.value);

    if (selectedCharsets.length === 0 || text.trim() === '')
    {
        outputs.innerHTML = '<p style="color: red;">Please enter a string and select at least one charset.</p>';
        return;
    }

    const response = await fetch('/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, charsets: selectedCharsets })
    });

    const data = await response.json();

    outputs.innerHTML = '';

    for (const charset in data)
    {
        const label = document.createElement('label');
        label.textContent = charset + ':';

        const textarea = document.createElement('textarea');
        textarea.disabled = true;
        textarea.value = data[charset];

        outputs.appendChild(label);
        outputs.appendChild(document.createElement('br'));
        outputs.appendChild(textarea);
        outputs.appendChild(document.createElement('br'));
    }
});

clearBtn.addEventListener('click', () => {
    inputString.value = '';
    charsetSelect.selectedIndex = -1;
    outputs.innerHTML = '';
});
