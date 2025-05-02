function fetchData()
{
    const container = document.getElementById('results');
    container.innerHTML = '';

    fetch('/api/characters')
            .then(res => res.json())
            .then(data => {
                console.log('Marvel API response:', data);
                if (!data || !data.data || !data.data.results) {
                    container.innerText = "Помилка у відповіді API.";
                    console.error('Деталі помилки:', data);
                    return;
                }
                displayData(data);
                document.querySelector('h1').innerText = 'Marvel Characters';
            })
            .catch(error => {
                console.error('Error fetching data from Marvel API:', error);
                container.innerText = "Не вдалося отримати дані з API.";
            });
}

function displayData(data)
{
    const container = document.getElementById('results');

    data.data.results.forEach(character => {
        const div = document.createElement('div');
        div.className = 'character';

        let comicsList = '';
        if (character.comics && character.comics.items)
        {
            comicsList = '<ul>' + character.comics.items.slice(0, 3).map(comic => `<li>${comic.name}</li>`).join('') + '</ul>';
        }

        div.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" />
            <p><strong>ID:</strong> ${character.id}</p>
            <p><strong>Description:</strong> ${character.description || 'No description available.'}</p>
            <p><strong>Modified:</strong> ${character.modified}</p>
            <p><strong>Resource URI:</strong> <a href="${character.resourceURI}" target="_blank">Link</a></p>
            <p><strong>Comics Available:</strong> ${character.comics?.available || 0}</p>
            <p><strong>Comics:</strong> ${comicsList || 'No comics listed.'}</p>
        `;

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});