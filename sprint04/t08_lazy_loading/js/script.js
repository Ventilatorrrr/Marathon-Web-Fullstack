const images = document.querySelectorAll('img[data-src]');
const counter = document.getElementById('counter');
let loadedCount = 0;

const checkInterval = setInterval(() => {
    for (let i = 0; i < images.length; i++)
    {
        const img = images[i];

        if (img.getAttribute('data-src') === null)
        {
            continue;
        }

        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');

            loadedCount += 1;
            counter.innerHTML = 'Loaded: ' + loadedCount + ' / 20';

            if (loadedCount === 20)
            {
                counter.classList.add('loaded');
                setTimeout(function ()
                {
                    counter.style.display = 'none';
                }, 3000);
                clearInterval(checkInterval);
            }
        }
    }
}, 300);
