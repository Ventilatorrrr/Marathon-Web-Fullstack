const cardsData = require('../data/cards.json');
const db = require('../db');

const rooms = {};

function resolveBattle(card1, card2) {
  const power1 = card1.attack + card1.cost - card2.defense;
  const power2 = card2.attack + card2.cost - card1.defense;

  let result = {
    playerDamage: 0,
    opponentDamage: 0,
    messageP0: '',
    messageP1: ''
  };

  if (power1 > power2) {
    result.opponentDamage = power1;
    result.messageP0 = `You dealt ${power1} damage to your opponent!`;
    result.messageP1 = `Opponent dealt ${power1} damage to you!`;
  } else if (power2 > power1) {
    result.playerDamage = power2;
    result.messageP0 = `Opponent dealt ${power2} damage to you!`;
    result.messageP1 = `You dealt ${power2} damage to your opponent!`;
  } else {
    result.messageP0 = result.messageP1 = 'Draw. No damage dealt.';
  }

  return result;
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Новий гравець:', socket.id);

    socket.on('joinGame', ({ roomId, login, avatar, id }) => {
  socket.join(roomId);
  socket.roomId = roomId;

  // Якщо кімната ще не існує — створюємо
  if (!rooms[roomId]) {
    const shuffledDeck = [...cardsData].sort(() => 0.5 - Math.random());
    rooms[roomId] = {
      players: [],
      sessions: [],
      turn: 0,
      hp: [30, 30],
      hands: [[], []],
      playedCards: [null, null],
      deck: shuffledDeck,
      activeShields: [false, false],
      usedCards: [[], []],
      rematchRequests: [],
      disconnected: [false, false],
      finished: false
    };
  }

  const room = rooms[roomId];

  // ❗ Перевірка: якщо гра завершена
  if (room.finished) {
    socket.emit('error', 'This game has already finished.');
    return;
  }

  // ❗ Перевірка: гравець вже у кімнаті
  if (room.players.some(p => p.socket.id === socket.id)) {
    return;
  }

  // ❗ Перевірка: кімната заповнена
  if (room.players.length >= 2) {
    socket.emit('error', 'Room is full');
    return;
  }

  const playerNumber = room.players.length;
  const hand = room.deck.splice(0, 5);

  room.players.push({ socket, id: socket.id });
  room.sessions.push({ login, avatar, id });
  room.hands[playerNumber] = hand;

  if (room.players.length === 1) {
    socket.emit('init', {
      playerNumber,
      cards: hand,
      opponent: null
    });
    socket.emit('waiting', { msg: '⏳ Waiting for opponent to join...' });
    return;
  }

  if (room.players.length === 2) {
    const [p1, p2] = room.players;
    const [s1, s2] = room.sessions;

    p1.socket.emit('init', {
      playerNumber: 0,
      cards: room.hands[0],
      opponent: s2,
      hp: room.hp
    });

    p2.socket.emit('init', {
      playerNumber: 1,
      cards: room.hands[1],
      opponent: s1,
      hp: room.hp
    });

    io.to(roomId).emit('startGame', { msg: '🎮 Game started!' });

    room.players[room.turn].socket.emit('yourTurn');
    room.players[1 - room.turn].socket.emit('opponentTurn');
  }
});

    socket.on('syncTimer', ({ roomId, time }) => {
      const room = rooms[roomId];
      if (!room) return;

      const senderIndex = room.players.findIndex(p => p.socket.id === socket.id);
      const opponentIndex = 1 - senderIndex;

      if (room.players[opponentIndex]) {
        room.players[opponentIndex].socket.emit('syncTimer', { time });
      }
    });

    socket.on('requestNextTurn', () => {
  const roomId = socket.roomId;
  const room = rooms[roomId];

      room.players.forEach(p => p.socket.emit('resetTimers'));
      room.players[room.turn].socket.emit('yourTurn');
      room.players[1 - room.turn].socket.emit('opponentTurn');
    });

    socket.on('attack', ({ damage }) => {
  const roomId = socket.roomId;
  const room = rooms[roomId];
      if (!room) return;

      const playerIndex = room.players.findIndex(p => p.socket.id === socket.id);
      if (playerIndex !== room.turn) return;

      const opponentIndex = 1 - playerIndex;
      room.hp[opponentIndex] -= damage;
      if (room.hp[opponentIndex] < 0) room.hp[opponentIndex] = 0;

      room.players[opponentIndex].socket.emit('opponentAttacked', { damage });

      if (room.hp[opponentIndex] <= 0) {
        room.players[playerIndex].socket.emit('gameOver', { win: true });
        room.players[opponentIndex].socket.emit('gameOver', { win: false });

        const winner = room.sessions[playerIndex];
        const loser = room.sessions[opponentIndex];

        db.query('UPDATE users SET wins = wins + 1, total_games = total_games + 1 WHERE id = ?', [winner.id]);
        db.query('UPDATE users SET losses = losses + 1, total_games = total_games + 1 WHERE id = ?', [loser.id]);

        db.query(
          'INSERT INTO games (player1_id, player2_id, winner_id, ended_at) VALUES (?, ?, ?, NOW())',
          [winner.id, loser.id, winner.id],
          (err) => {
            if (err) console.error('❌ DB insert game error:', err);
          }
        );

       room.finished = true;
      } else {
        room.turn = opponentIndex;
        room.players.forEach(p => p.socket.emit('resetTimers'));
        room.players[room.turn].socket.emit('yourTurn');
        room.players[1 - room.turn].socket.emit('opponentTurn');
      }
    });

socket.on('playCard', ({ card }) => {
  const roomId = socket.roomId;
  const room = rooms[roomId];
  if (!room) return;
if (room.players.length < 2) return;

  const playerIndex = room.players.findIndex(p => p.socket.id === socket.id);
  if (playerIndex === -1) return;

  const opponentIndex = 1 - playerIndex;
  console.log(`🎮 Player ${playerIndex} played a card: ${card.name}`);

  if (card.shield) {
    room.activeShields[playerIndex] = true;
    room.players[playerIndex].socket.emit('shieldActivated', { msg: '🛡 Shield activated!' });
  }

  room.playedCards[playerIndex] = card;
  room.hands[playerIndex] = room.hands[playerIndex].filter(c => c.name !== card.name);

  room.players[opponentIndex].socket.emit('updateOpponentHand', {
    count: room.hands[playerIndex].length
  });

  const bothPlayed = typeof room.playedCards[0]?.name === 'string' &&
                     typeof room.playedCards[1]?.name === 'string';

  if (!bothPlayed) return;

  // ⏳ Надсилаємо карти суперників після того як обидва зіграли
  room.players[0].socket.emit('opponentPlayed', { card: room.playedCards[1] });
  room.players[1].socket.emit('opponentPlayed', { card: room.playedCards[0] });

  console.log('⚔️ Обидва зіграли — очікуємо перед боєм...');

  setTimeout(() => {
    const result = resolveBattle(room.playedCards[0], room.playedCards[1]);

    if (room.activeShields[0] && result.playerDamage > 0) {
      result.messageP0 += ' 🛡 Your shield absorbed the damage!';
      result.playerDamage = 0;
      room.activeShields[0] = false;
    }

    if (room.activeShields[1] && result.opponentDamage > 0) {
      result.messageP1 += ' 🛡 Your shield absorbed the damage!';
      result.opponentDamage = 0;
      room.activeShields[1] = false;
    }

    room.hp[0] -= result.playerDamage || 0;
    room.hp[1] -= result.opponentDamage || 0;
    room.hp = room.hp.map(h => Math.max(0, h));

  room.usedCards[0].push(room.playedCards[0]);
room.usedCards[1].push(room.playedCards[1]);

io.to(roomId).emit('updateGraveyard', {
  cards: [...room.usedCards[0], ...room.usedCards[1]]
});

room.players[0].socket.emit('battleResult', {
  message: result.messageP0,
  hp: room.hp,
  usedCards: {
    my: room.usedCards[0],
    opponent: room.usedCards[1]
  }
});
room.players[1].socket.emit('battleResult', {
  message: result.messageP1,
  hp: room.hp,
  usedCards: {
    my: room.usedCards[1],
    opponent: room.usedCards[0]
  }
});

room.playedCards = [null, null];

// Спроба витягнути нову карту, якщо в руці < 5
[0, 1].forEach(i => {
  if (room.hands[i].length < 5) {
    const usedNames = [...room.usedCards[0], ...room.usedCards[1]].map(c => c.name);

    const available = cardsData.filter(card =>
      !room.hands[0].some(c => c.name === card.name) &&
      !room.hands[1].some(c => c.name === card.name) &&
      !usedNames.includes(card.name)
    );

    if (available.length === 0) return;

    const newCard = JSON.parse(JSON.stringify(
      available[Math.floor(Math.random() * available.length)]
    ));

    room.hands[i].push(newCard);
    room.players[i].socket.emit('drawCard', { card: newCard });

    const otherIndex = 1 - i;
    room.players[otherIndex].socket.emit('updateOpponentHand', {
      count: room.hands[i].length
    });
  }
});
// Перевірка на нічию (обидва живі, але без карт)
const bothHandsEmpty = room.hands[0].length === 0 && room.hands[1].length === 0;
const bothAlive = room.hp[0] > 0 && room.hp[1] > 0;

if (bothHandsEmpty && bothAlive) {
  room.players[0].socket.emit('gameOver', {
  win: null,
  draw: true,
  msg: '🤝 Draw! No cards left and both players are alive.',
  usedCards: {
    my: room.usedCards[0],
    opponent: room.usedCards[1]
  }
});
room.players[1].socket.emit('gameOver', {
  win: null,
  draw: true,
  msg: '🤝 Draw! No cards left and both players are alive.',
  usedCards: {
    my: room.usedCards[1],
    opponent: room.usedCards[0]
  }
});

  room.finished = true;
  return;
}

// Перевірка на завершення гри
if (room.hp.some(h => h <= 0)) {
  const winnerIndex = room.hp[0] > room.hp[1] ? 0 : 1;
  const loserIndex = 1 - winnerIndex;
  const winner = room.sessions[winnerIndex];
  const loser = room.sessions[loserIndex];

  room.players[winnerIndex].socket.emit('gameOver', {
    win: true,
    msg: `🎉 You won ${loser.login}!`
  });
  room.players[loserIndex].socket.emit('gameOver', {
    win: false,
    msg: `😢 You lost ${winner.login}`
  });

  db.query('UPDATE users SET wins = wins + 1, total_games = total_games + 1 WHERE id = ?', [winner.id]);
  db.query('UPDATE users SET losses = losses + 1, total_games = total_games + 1 WHERE id = ?', [loser.id]);

  db.query(
    'INSERT INTO games (player1_id, player2_id, winner_id, ended_at) VALUES (?, ?, ?, NOW())',
    [winner.id, loser.id, winner.id],
    (err) => err && console.error('❌ DB insert game error:', err)
  );

  room.finished = true;  
  return;
}

// Переходимо до наступного ходу
room.turn = 1 - room.turn;
room.players.forEach(p => p.socket.emit('resetTimers'));
room.players[room.turn].socket.emit('yourTurn');
room.players[1 - room.turn].socket.emit('opponentTurn');
  }, 2500); 
});

    socket.on('endTurn', () => {
      const roomId = socket.roomId;
  const room = rooms[roomId];
      if (!room) return;

      room.turn = 1 - room.turn;

      room.players.forEach(p => p.socket.emit('resetTimers'));
      room.players[room.turn].socket.emit('yourTurn');
      room.players[1 - room.turn].socket.emit('opponentTurn');
    });

  socket.on('disconnect', () => {
  const roomId = socket.roomId;
  const room = rooms[roomId];
  if (!room) return;

  const playerIndex = room.players.findIndex(p => p.socket.id === socket.id);
  if (playerIndex === -1) return;

  const opponentIndex = 1 - playerIndex;
  const opponent = room.players[opponentIndex];

  room.disconnected = room.disconnected || [false, false];
  room.disconnected[playerIndex] = true;

  // Якщо гра завершена: видаляємо кімнату лише якщо обидва гравці вийшли
  if (room.finished) {
    if (room.disconnected[0] && room.disconnected[1]) {
      delete rooms[roomId];
      db.query('DELETE FROM rooms WHERE id = ?', [roomId], () => {});
    }
    return;
  }

  // Якщо гра ще триває і гравець вийшов — перемога суперника
  if (opponent) {
    const winner = room.sessions[opponentIndex];
    const loser = room.sessions[playerIndex];

    // 🟢 Повідомлення супернику
    opponent.socket.emit('opponentLeft', {
      msg: '🚪 Opponent has left the game.'
    });

    opponent.socket.emit('gameOver', {
      win: true,
      msg: '🎉 You won! Opponent left the game.',
      usedCards: {
        my: room.usedCards[opponentIndex],
        opponent: room.usedCards[playerIndex]
      }
    });

    db.query('UPDATE users SET wins = wins + 1, total_games = total_games + 1 WHERE id = ?', [winner.id]);
    db.query('UPDATE users SET losses = losses + 1, total_games = total_games + 1 WHERE id = ?', [loser.id]);

    db.query(
      'INSERT INTO games (player1_id, player2_id, winner_id, ended_at) VALUES (?, ?, ?, NOW())',
      [winner.id, loser.id, winner.id],
      (err) => {
        if (err) console.error('❌ DB insert game error:', err);
      }
    );
  }

  room.finished = true;

  // Якщо обидва гравці вже вийшли — повністю прибираємо кімнату через 60 сек
  setTimeout(() => {
    if (room.disconnected[0] && room.disconnected[1]) {
      delete rooms[roomId];
      db.query('DELETE FROM rooms WHERE id = ?', [roomId], () => {});
    }
  }, 60000); // 60 секунд
});

    socket.on('requestRematch', () => {
       const roomId = socket.roomId;
  const room = rooms[roomId];
      if (!room) return;

      room.rematchRequests = room.rematchRequests || [];
      const playerIndex = room.players.findIndex(p => p.socket.id === socket.id);

      if (!room.rematchRequests.includes(playerIndex)) {
        room.rematchRequests.push(playerIndex);
      }

      if (room.rematchRequests.length === 2) {
        // Обнулити стан гри
        const shuffledDeck = [...cardsData].sort(() => 0.5 - Math.random());
        room.turn = 0;
        room.hp = [30, 30];
        room.hands = [shuffledDeck.splice(0, 5), shuffledDeck.splice(0, 5)];
        room.playedCards = [null, null];
        io.to(roomId).emit('resetBattlefield');
        room.deck = shuffledDeck;
        room.usedCards = [[], []]; 
        room.activeShields = [false, false];
        room.rematchRequests = [];
      room.finished = false;
        // Надіслати новий старт
        room.players.forEach((player, i) => {
          player.socket.emit('init', {
            playerNumber: i,
            cards: room.hands[i],
            opponent: room.sessions[1 - i],
            hp: room.hp
          });
        });
        io.to(roomId).emit('updateGraveyard', { cards: [] });
        io.to(roomId).emit('startGame', { msg: '🎮 Rematch started!' });
        room.players[room.turn].socket.emit('yourTurn');
        room.players[1 - room.turn].socket.emit('opponentTurn');
      }
    });

  }); 
};    
