window.socketRef = null;
window.roomIdRef = null;

let timerInterval;
let timerSeconds = 30;
let isCurrentPlayerTurn = false;

function startTurnTimer(socket, roomId, playerNumber, isMyTurnFlag) {
  console.log('[TIMER] Start timer for player', isMyTurnFlag ? 'YOU' : 'OPPONENT');

  window.socketRef = socket;
  window.roomIdRef = roomId;
  stopTurnTimer();

  isCurrentPlayerTurn = isMyTurnFlag;
  timerSeconds = 30;
  updateTimers(timerSeconds);

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimers(timerSeconds);

    if (isCurrentPlayerTurn) {
      socket.emit('syncTimer', { roomId, time: timerSeconds });

      if (timerSeconds <= 0) {
        stopTurnTimer();

        if (!window.battleState.myCard) {
          const passCard = {
            name: 'Pass',
            attack: 0,
            defense: 0,
            cost: 0,
            image: '/image/card_back.jpg'
          };

         // socket.emit('battlePlayed', { roomId, card: passCard });
          socket.emit('playCard', { roomId, card: passCard });
          placeCardOnBoard(passCard, 'player');
          window.battleState.myCard = passCard;
        }

        socket.emit('endTurn', { roomId });
      }
    }
  }, 1000);
}

function stopTurnTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimers(seconds) {
  const myTimerEl = document.getElementById('my-timer');
  const oppTimerEl = document.getElementById('opponent-timer');
  const display = `00:${seconds < 10 ? '0' : ''}${seconds}`;

  if (isCurrentPlayerTurn) {
    myTimerEl.textContent = display;
    oppTimerEl.textContent = '00:30';
  } else {
    myTimerEl.textContent = '00:30';
    oppTimerEl.textContent = display;
  }
}

function setupTimerSyncListener(socket) {
  socket.on('syncTimer', ({ time }) => {
    if (!isCurrentPlayerTurn) {
      const oppTimerEl = document.getElementById('opponent-timer');
      oppTimerEl.textContent = `00:${time < 10 ? '0' : ''}${time}`;
    }
  });
}
function resetTimersBeforeNewTurn(isMyTurnFlag) {
  stopTurnTimer(); // гарантія, що попередній таймер зупинено

  timerSeconds = 30;
  isCurrentPlayerTurn = isMyTurnFlag;

  const display = '00:30';
  document.getElementById('my-timer').textContent = display;
  document.getElementById('opponent-timer').textContent = display;

  // запускаємо таймер лише для гравця, чий хід
  if (isMyTurnFlag) {
    startTurnTimer(window.socketRef, window.roomIdRef, null, true);
  }
}
window.timerControl = {
  startTurnTimer,
  stopTurnTimer,
  setupTimerSyncListener,
  resetTimersBeforeNewTurn 
};
