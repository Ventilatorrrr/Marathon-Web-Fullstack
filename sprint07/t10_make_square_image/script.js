document.getElementById('goButton').addEventListener('click', async () => {
    const url = document.getElementById('imageUrl').value;
    const res = await fetch('/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    const data = await res.json();
    console.log("Response from server:", data);
    showImages(data);
});

function showImages(data)
{
    const result = document.getElementById('result');
    result.innerHTML = '';
    for (const key in data)
    {
        const img = document.createElement('img');
        img.src = data[key];
        img.width = 200;
        result.appendChild(img);
    }
}
