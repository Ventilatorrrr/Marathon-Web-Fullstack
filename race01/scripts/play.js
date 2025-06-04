const socket = io();
const params = new URLSearchParams(window.location.search);
const roomId = params.get('room');
if (!roomId) {
  alert('❌ Missing room ID!');
  window.location.href = '/room';
}

let playerNumber = null;
let isMyTurn = false;
let gameEnded = false;
socket.on('error', (msg) => {
  alert(msg);
  window.location.href = '/home'; // або інша дія
});
socket.on('updateGraveyard', ({ cards }) => {
  renderGraveyard(cards);
});

window.battleState = {
  myCard: null,
  opponentCard: null,
  resolved: false
};
window.opponentLeft = false;

fetch('/me')
  .then(res => res.json())
  .then(user => {
    document.querySelector('#user-login').textContent = user.login;
    document.querySelector('#user-avatar').src = '/image/ava/' + user.avatar;

    socket.emit('joinGame', {
      roomId,
      login: user.login,
      avatar: user.avatar,
      id: user.id
    });
  });

window.timerControl.setupTimerSyncListener(socket);

document.getElementById('cancel-button').addEventListener('click', () => {
  window.location.href = '/home';
});

let waitSeconds = 0;
let waitInterval = null;

socket.on('waiting', ({ msg }) => {
  const overlay = document.getElementById('wait-overlay');
  const message = document.getElementById('wait-message');
  const timer = document.getElementById('wait-timer');

  message.textContent = msg;
  overlay.classList.add('show');

  waitSeconds = 0;
  timer.textContent = `Elapsed: ${waitSeconds}s`;

  waitInterval = setInterval(() => {
    waitSeconds++;
    timer.textContent = `Elapsed: ${waitSeconds}s`;
  }, 1000);
});

socket.on('init', ({ playerNumber: num, cards, opponent, hp }) => {
  playerNumber = num;
  window.initialCards = cards;

  if (opponent) {
    document.querySelector('#opponent-login').textContent = opponent.login;
    document.querySelector('#opponent-avatar').src = '/image/ava/' + opponent.avatar;
  }
if (hp && hp.length === 2) {
    document.querySelector('#user-hp').textContent = `HP: ${hp[playerNumber]}`;
    document.querySelector('#opponent-hp').textContent = `HP: ${hp[1 - playerNumber]}`;
  }

  document.getElementById('my-timer').textContent = '00:30';
  document.getElementById('opponent-timer').textContent = '00:30';

  const overlay = document.getElementById('wait-overlay');
  if (overlay) overlay.classList.remove('show');
  if (waitInterval) clearInterval(waitInterval);
});

socket.on('startGame', ({ msg }) => {
  console.log(msg);
  gameEnded = false;
document.getElementById('graveyard').innerHTML = '';
document.getElementById('my-timer').style.display = 'block';
document.getElementById('opponent-timer').style.display = 'block';
document.getElementById('player-hand').style.pointerEvents = 'auto';
document.getElementById('turn-indicator').style.display = 'block';
document.getElementById('battle-board').innerHTML = '';
document.getElementById('battle-board').classList.remove('disabled');

  const rematchBtn = document.getElementById('rematch-btn');
  rematchBtn.style.display = 'none';
  rematchBtn.disabled = false;

  setTimeout(() => {
    renderPlayerCards(window.initialCards); 
    renderOpponentBacks(window.initialCards.length);
  }, 300);
});

socket.on('yourTurn', () => {
  isMyTurn = true;
  window.timerControl.stopTurnTimer();
  window.timerControl.startTurnTimer(socket, roomId, playerNumber, true);
  updateTurnIndicator(true);
});

socket.on('opponentTurn', () => {
  isMyTurn = false;
  window.timerControl.stopTurnTimer();
  window.timerControl.startTurnTimer(socket, roomId, playerNumber, false);
  updateTurnIndicator(false);
});

socket.on('updateOpponentHand', ({ count }) => {
  renderOpponentBacks(count);
});

socket.on('opponentAttacked', ({ damage }) => {
  const userHp = document.querySelector('#user-hp');
  let hp = parseInt(userHp.textContent.replace('HP: ', ''));
  hp = Math.max(0, hp - damage);
  userHp.textContent = `HP: ${hp}`;

  const opponentContainer = document.getElementById('opponent-hand');
  if (opponentContainer && opponentContainer.firstChild) {
    opponentContainer.removeChild(opponentContainer.firstChild);
  }
});
function renderGraveyard(cards) {
  const container = document.getElementById('graveyard');
  if (!container) return;

  container.innerHTML = '';

  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.style.backgroundImage = `url(${card.image})`;

    const offsetX = Math.random() * 30 - 15;
    const offsetY = Math.random() * 30 - 15;
    const rotate = Math.random() * 20 - 10;

    cardDiv.style.left = `50%`;
    cardDiv.style.top = `50%`;
    cardDiv.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;

    // 🧾 Вміст картки
    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = card.name;
    cardDiv.appendChild(nameDiv);

    const stats = document.createElement('div');
    stats.className = 'card-stats';
    stats.innerHTML = `
      <p>ATK: ${card.attack}</p>
      <p>DEF: ${card.defense}</p>
      <p>Cost: ${card.cost}</p>
    `;
    cardDiv.appendChild(stats);

    if (card.shield) {
      const badge = document.createElement('div');
      badge.className = 'shield-icon';
      badge.textContent = '🛡';
      cardDiv.appendChild(badge);
    }

    container.appendChild(cardDiv);
  });
}

socket.on('opponentPlayed', ({ card }) => {
  window.battleState.opponentCard = card;
document.getElementById('battle-board')?.classList.add('battle-prepare');

  // Показати карту з затримкою (анімація)
  setTimeout(() => {
    placeCardOnBoard(card, 'opponent');
  }, 500); 

  // Можна показати loader або «🤜 Битва…»
  const indicator = document.getElementById('turn-indicator');
  if (indicator) {
    indicator.textContent = '⚔️ Битва починається...';
    indicator.style.background = '#ffc107';
  }
});
socket.on('battleResult', ({ message, hp, usedCards }) => {
  const board = document.getElementById('battle-board');
  if (board) board.classList.add('battle-animate');

  // ⚔️ Показати результат бою через 1 сек
  setTimeout(() => {
    // Зняти анімацію
    board.classList.remove('battle-animate');
    board.classList.remove('battle-prepare');

    // Оновити HP
    document.querySelector('#user-hp').textContent = `HP: ${hp[playerNumber]}`;
    document.querySelector('#opponent-hp').textContent = `HP: ${hp[1 - playerNumber]}`;

    // 🧹 Прибрати карти з поля бою
    document.getElementById('battle-board').innerHTML = '';
    window.battleState = { myCard: null, opponentCard: null, resolved: false };

    // 💀 Показати відбій через 300 мс (після очищення поля)
    setTimeout(() => {
      if (usedCards) {
        renderGraveyard([...usedCards.my, ...usedCards.opponent]);
      }

      alert(message);
    }, 300);
  }, 1000);
});

socket.on('resetBattlefield', () => {
  // 🛑 Зупинка таймера після бою
  window.timerControl.stopTurnTimer();

  document.getElementById('battle-board').innerHTML = '';
  window.battleState = { myCard: null, opponentCard: null, resolved: false };
});

socket.on('gameOver', ({ win, msg, usedCards, draw }) => {
  gameEnded = true;
  isMyTurn = false;
  window.timerControl.stopTurnTimer();

  document.getElementById('my-timer').style.display = 'none';
  document.getElementById('opponent-timer').style.display = 'none';

  const indicator = document.getElementById('turn-indicator');
  if (indicator) {
    indicator.textContent = '🏁 Game over';
    indicator.style.background = '#6c757d';
  }

  const board = document.getElementById('battle-board');
  if (board) board.classList.add('disabled');

  document.getElementById('player-hand').style.pointerEvents = 'none';
  document.getElementById('battle-board').innerHTML = '';

  const isOpponentLeft = msg?.toLowerCase().includes('opponent left');
  window.opponentLeft = isOpponentLeft;

  if (draw) {
  if (usedCards) {
    renderGraveyard([...usedCards.my, ...usedCards.opponent]);
  }
  showDrawEffect(msg || '🤝 Draw!');
} else if (win) {
  showVictoryEffect(msg || '🎉 You Won!');
  if (isOpponentLeft) {
    setTimeout(() => {
      window.location.href = '/home';
    }, 4000);
    return;
  }
} else {
  showDefeatEffect(msg || '💀 You Lost');
}

  if (!isOpponentLeft) {
    const rematchBtn = document.getElementById('rematch-btn');
    rematchBtn.style.display = 'block';
    rematchBtn.disabled = false;
    rematchBtn.textContent = '🔁 Rematch';
    rematchBtn.onclick = () => {
      socket.emit('requestRematch', { roomId });
      rematchBtn.disabled = true;
      rematchBtn.textContent = '⏳ Waiting for opponent...';
    };
  }
});


socket.on('updateHP', ({ hp }) => {
  document.querySelector('#user-hp').textContent = `HP: ${hp[playerNumber]}`;
});

socket.on('drawCard', ({ card }) => {
  renderPlayerCards([...document.querySelectorAll('#player-hand .card')]
    .map(div => ({
      name: div.querySelector('.card-name').textContent,
      attack: parseInt(div.dataset.attack),
      defense: parseInt(div.dataset.defense),
      cost: parseInt(div.dataset.cost),
      image: div.style.backgroundImage.slice(5, -2).split('/').pop(),
      shield: div.dataset.shield === 'true'
    })).concat([card])
  );
});

socket.on('resetTimers', () => {
  console.log('[RESET TIMERS]');
  window.timerControl.stopTurnTimer();
 
  document.getElementById('my-timer').textContent = '00:30';
  document.getElementById('opponent-timer').textContent = '00:30';
 
});
socket.on('opponentLeft', ({ msg }) => {
  window.opponentLeft = true;

  const rematchBtn = document.getElementById('rematch-btn');
  if (rematchBtn) rematchBtn.style.display = 'none';

  if (!document.getElementById('opponent-left-message')) {
    const leftNote = document.createElement('div');
    leftNote.id = 'opponent-left-message';
    leftNote.textContent = msg || 'Opponent left the game.';
    leftNote.style.marginTop = '20px';
    leftNote.style.fontSize = '1.2rem';
    leftNote.style.color = '#dc3545';
    leftNote.style.textAlign = 'center';
    document.body.appendChild(leftNote);
  }

  // 🕒 Якщо гра завершена — автоматичний вихід через 4с
  if (gameEnded) {
    setTimeout(() => {
      window.location.href = '/home';
    }, 4000);
  }
});


function updateTurnIndicator(myTurn) {
  const indicator = document.getElementById('turn-indicator');
  if (!indicator) return;
  indicator.textContent = myTurn ? '🟢 Your Turn' : '⏳ Opponent\'s Turn';
  indicator.style.background = myTurn ? '#28a745' : '#888';
  indicator.style.display = 'block';
}

function renderPlayerCards(cards) {
  const container = document.getElementById('player-hand');
  container.innerHTML = '';

  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.backgroundImage = `url('/cards/${card.image}')`;
    cardDiv.dataset.attack = card.attack;
    cardDiv.dataset.defense = card.defense;
    cardDiv.dataset.cost = card.cost;
    cardDiv.dataset.shield = card.shield ? 'true' : 'false';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = card.name;
    cardDiv.appendChild(nameDiv);

    const stats = document.createElement('div');
    stats.className = 'card-stats';
    stats.innerHTML = `
      <p>ATK: ${card.attack}</p>
      <p>DEF: ${card.defense}</p>
      <p>Cost: ${card.cost}</p>
    `;
    cardDiv.appendChild(stats);

    cardDiv.addEventListener('click', () => {
        if (!isMyTurn || gameEnded || cardDiv.classList.contains('used')) return;
      isMyTurn = false;
      container.removeChild(cardDiv);
      window.timerControl.stopTurnTimer();

      const selectedCard = {
  attack: parseInt(cardDiv.dataset.attack),
  defense: parseInt(cardDiv.dataset.defense),
  cost: parseInt(cardDiv.dataset.cost),
  image: `/cards/${card.image}`,
  name: card.name,
  shield: cardDiv.dataset.shield === 'true'
};

      socket.emit('playCard', { roomId, card: selectedCard });
      //socket.emit('battlePlayed', { roomId, card: selectedCard });

      placeCardOnBoard(selectedCard, 'player');
      window.battleState.myCard = selectedCard;

      if (!window.battleState.opponentCard) {
        socket.emit('endTurn', { roomId });
      }
    });
 if (card.shield === true || card.shield === 'true') {
  const badge = document.createElement('div');
  badge.className = 'shield-icon';
  badge.textContent = '🛡';
  cardDiv.appendChild(badge);
}
    container.appendChild(cardDiv);
  });
}

function renderOpponentBacks(count) {
  const container = document.getElementById('opponent-hand');
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const back = document.createElement('img');
    Object.assign(back.style, {
      width: '150px',
      height: '205px',
      borderRadius: '8px',
      boxShadow: '0 0 8px rgba(0,0,0,0.6)'
    });
    back.src = '/image/card_back.jpg';
    container.appendChild(back);
  }
}

function placeCardOnBoard(card, who) {
  const board = document.getElementById('battle-board');
  const cardEl = document.createElement('div');
  cardEl.className = 'card on-board';
  cardEl.style.backgroundImage = `url(${card.image})`;
  cardEl.innerHTML = `
  <div class="card-name">${card.name}</div>
  <div class="card-stats">
    <p>ATK: ${card.attack}</p>
    <p>DEF: ${card.defense}</p>
    <p>Cost: ${card.cost}</p>
  </div>
`;
  board.appendChild(cardEl);
setTimeout(() => {
  cardEl.classList.add('show');
}, 30);   

  if (who === 'player') {
    window.battleState.myCard = card;
  } else {
    window.battleState.opponentCard = card;
  }
  if (card.shield === true || card.shield === 'true') {
  const shieldEl = document.createElement('div');
  shieldEl.className = 'shield-icon';
  shieldEl.textContent = '🛡';
  cardEl.appendChild(shieldEl);
}
}
function showVictoryEffect(message = '🎉 You Won!') {
  const overlay = document.createElement('div');
  overlay.className = 'victory-overlay';

  const victoryText = document.createElement('div');
  victoryText.className = 'victory-text';
  victoryText.textContent = message;

  overlay.appendChild(victoryText);
  document.body.appendChild(overlay);

  // Звук перемоги
  const winSound = document.getElementById('win-sound');
  if (winSound) winSound.play().catch(() => {});

  // Конфетті
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }

  // Спалахи
  for (let i = 0; i < 10; i++) {
    const flash = document.createElement('div');
    flash.className = 'star-flash';
    flash.style.left = `${Math.random() * 100}vw`;
    flash.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 1000);
  }

  // Текстовий спалах
  const firework = document.createElement('div');
  firework.className = 'victory-firework';
  firework.textContent = '✨ Victory!';
  document.body.appendChild(firework);

  // Прибрати все через 3 сек
  setTimeout(() => {
    overlay.remove();
    firework.remove();
  }, 3000);
}
function showDefeatEffect(message = '💀 You Lost') {
  const overlay = document.createElement('div');
  overlay.className = 'defeat-overlay';

  const defeatText = document.createElement('div');
  defeatText.className = 'defeat-text';
  defeatText.textContent = message;

  overlay.appendChild(defeatText);
  document.body.appendChild(overlay);

  // Димовий ефект
  const smoke = document.createElement('div');
  smoke.className = 'smoke';
  document.body.appendChild(smoke);

  // Програшний звук
  const loseSound = new Audio('/sounds/lose.mp3');
  loseSound.play().catch(() => {});

  setTimeout(() => {
    overlay.remove();
    smoke.remove();
  }, 4000);
}
function showDrawEffect(message = '🤝 Draw!') {
  const overlay = document.createElement('div');
  overlay.className = 'draw-overlay';

  const drawText = document.createElement('div');
  drawText.className = 'draw-text';
  drawText.textContent = message;

  overlay.appendChild(drawText);
  document.body.appendChild(overlay);

  // Світлий туман
  const fog = document.createElement('div');
  fog.className = 'fog-overlay';
  document.body.appendChild(fog);

  // Звук
  const drawSound = new Audio('/sounds/draw.mp3');
  drawSound.play().catch(() => {});

  // Блискітки
  const sparkles = [];
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(sparkle);
    sparkles.push(sparkle);
  }

  // Прибрати все
  setTimeout(() => {
    overlay.remove();
    fog.remove();
    sparkles.forEach(s => s.remove());
  }, 4000);
}
