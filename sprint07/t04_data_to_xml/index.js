import { AvengerQuote } from './AvengerQuote.js';
import { Comment } from './Comment.js';
import { ListAvengerQuotes } from './ListAvengerQuotes.js';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

const initialQuotes = [
    new AvengerQuote(
            'Tony Stark',
            "If you're nothing without this suit, then you shouldn't have it.",
            ['https://example.com/tony.jpg'],
            new Date().toISOString(),
            [new Comment(new Date().toISOString(), "Legendary words!")]
    ),
    new AvengerQuote(
            'Steve Rogers',
            "I can do this all day.",
            ['https://example.com/steve.jpg'],
            new Date().toISOString(),
            [new Comment(new Date().toISOString(), "Classic Cap!")]
    ),
    new AvengerQuote(
            'Thor',
            "Bring me Thanos!",
            ['https://example.com/thor.jpg'],
            new Date().toISOString(),
            [new Comment(new Date().toISOString(), "Epic moment!")]
    ),
    new AvengerQuote(
            'Natasha Romanoff',
            "At some point, we all have to choose between what the world wants you to be and who you are.",
            ['https://example.com/natasha.jpg'],
            new Date().toISOString(),
            [new Comment(new Date().toISOString(), "So powerful.")]
    )
];

const listAvengerQuotes = new ListAvengerQuotes(initialQuotes);

if (isBrowser)
{
    const beforeContainer = document.getElementById('before');
    const afterContainer = document.getElementById('after');

    function displayQuotes(container, list)
    {
        container.innerHTML = '';
        list.forEach(q => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${q.author}</strong>: "${q.quote}"<br>Photos: ${q.photo.join(', ')}<br>Published: ${q.publishDate}<br>Comments: ${q.comments.map(c => c.comment).join(' | ')}`;
            div.style.marginBottom = '1rem';
            container.appendChild(div);
        });
    }

    displayQuotes(beforeContainer, listAvengerQuotes.quotes);

    const xmlStr = listAvengerQuotes.toXML();
    const parsedList = ListAvengerQuotes.fromXML(xmlStr);

    displayQuotes(afterContainer, parsedList.quotes);
}

if (isNode)
{
    import('fs').then(fs => {
        const xmlStr = listAvengerQuotes.toXML();
        const dirPath = './';

        fs.writeFileSync(`${dirPath}/avenger_quote.xml`, xmlStr, 'utf-8');
        console.log('XML файл створено: avenger_quote.xml');

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Avenger Quotes</title>
  <style>
    body { display: flex; gap: 2rem; padding: 2rem; font-family: Arial, sans-serif; }
    .column { flex: 1; border: 1px solid #ccc; padding: 1rem; }
    h2 { text-align: center; }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <div class="column">
    <h2>XML Data</h2>
    <pre>${xmlStr}</pre>
  </div>
</body>
</html>`;

        fs.writeFileSync(`${dirPath}/quotes.html`, htmlContent.trim(), 'utf-8');
        console.log('HTML файл створено: quotes.html');
    });
}
