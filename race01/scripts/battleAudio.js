document.addEventListener('DOMContentLoaded', () => {
  // Зупинимо фонову музику
  const globalAudio = document.getElementById('global-audio');
  if (globalAudio && !globalAudio.paused) {
    globalAudio.pause();
  }

  // Якщо вже є — не створюємо повторно
  if (document.getElementById('battle-audio')) return;

  // Створюємо бойову музику
  const audio = document.createElement('audio');
  audio.id = 'battle-audio';
  audio.loop = true;
  audio.preload = 'auto';

  const source = document.createElement('source');
  source.src = '/sounds/battle.mp3';
  source.type = 'audio/mpeg';
  audio.appendChild(source);
  document.body.appendChild(audio);

  // Створюємо посилання на кнопку
  const toggleBtn = document.getElementById('toggle-audio-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          toggleBtn.textContent = '🔊 Sound On';
        }).catch(err => {
          console.warn('Play error:', err);
        });
      } else {
        audio.pause();
        toggleBtn.textContent = '🔇 Sound Off';
      }
    });
  }

  // Автоматичне відтворення або fallback на клік
  audio.play().then(() => {
    if (toggleBtn) toggleBtn.textContent = '🔊 Sound On';
  }).catch(() => {
    if (toggleBtn) toggleBtn.textContent = '🔇 Sound Off';
    window.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          if (toggleBtn) toggleBtn.textContent = '🔊 Sound On';
        }).catch(err => console.warn('Audio failed after click:', err));
      }
    }, { once: true });
  });
});
