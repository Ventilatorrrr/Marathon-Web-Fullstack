function loadLeaderboard() {
  fetch('/api/leaderboard')
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById('leaderboard-body');
      body.innerHTML = '';

      data.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="/image/ava/${player.avatar}" class="avatar"></td>
          <td>${player.login}</td>
          <td>${player.wins}</td>
          <td>${player.losses}</td>
          <td>${player.total_games}</td>
        `;

        // 🥇 Відзначення лідера
        if (index === 0) {
          row.style.backgroundColor = '#ffeaa7';
          row.style.fontWeight = 'bold';
        }

        body.appendChild(row);
      });
    });
}

// Автозавантаження + кнопка
document.addEventListener('DOMContentLoaded', () => {
  loadLeaderboard();
  const refresh = document.getElementById('refresh-button');
  const icon = refresh.querySelector('.icon');

  if (refresh && icon) {
    refresh.addEventListener('click', () => {
      console.log('🔁 Refresh clicked!');
      icon.classList.add('rotating');
      loadLeaderboard();

      setTimeout(() => {
        icon.classList.remove('rotating');
      }, 800); // збігається з анімацією
    });
  }
});

