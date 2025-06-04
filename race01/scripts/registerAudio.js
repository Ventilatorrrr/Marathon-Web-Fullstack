document.addEventListener('DOMContentLoaded', () => {
  let audio = document.getElementById('global-audio');

  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'global-audio';
    audio.loop = true;
    audio.preload = 'auto';

    const source = document.createElement('source');
    source.src = '/sounds/register.mp3';
    source.type = 'audio/mpeg';

    audio.appendChild(source);
    document.body.appendChild(audio);
  }

  // Встановлюємо позицію
  const savedTime = parseFloat(localStorage.getItem('music-time'));
  if (!isNaN(savedTime)) audio.currentTime = savedTime;

  // Якщо в локальному сховищі нічого немає — стартуємо з вимкненим звуком
  const savedMuted = localStorage.getItem('music-muted');
  audio.muted = savedMuted === 'true' || savedMuted === null;

  // Зберігати позицію кожні 2 сек
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem('music-time', audio.currentTime.toString());
    }
  }, 2000);

  // Запускаємо музику
  audio.play().catch(() => {
    window.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(err => console.warn('Audio play failed:', err));
      }
    }, { once: true });
  });

  // Створюємо кнопку вмикання/вимикання
  if (!document.getElementById('toggle-audio-btn')) {
    const btn = document.createElement('button');
    btn.id = 'toggle-audio-btn';
    btn.className = 'audio-toggle-btn';
    btn.textContent = audio.muted ? '🔇 Sound Off' : '🔊 Sound On';

    btn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      localStorage.setItem('music-muted', audio.muted);
      btn.textContent = audio.muted ? '🔇 Sound Off' : '🔊 Sound On';
    });

    document.body.appendChild(btn);
  }
});
