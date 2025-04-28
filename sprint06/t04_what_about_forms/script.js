document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const result = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const answer = formData.get('answer');

        const res = await fetch('/check-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer })
        });

        const data = await res.json();
        result.textContent = data.message;
        result.style.color = data.correct ? 'green' : 'red';
    });
});

