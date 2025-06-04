document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('create-btn');
  const joinBtn = document.getElementById('join-btn');
  const roomInput = document.getElementById('room-input');

  function isValidRoomId(roomId) {
    return /^[a-zA-Z0-9]{6,}$/.test(roomId); // тільки латиниця + цифри, мінімум 6
  }

  createBtn?.addEventListener('click', async () => {
    const roomId = roomInput.value.trim();
    if (!isValidRoomId(roomId)) return alert('❗ Room ID must be at least 6 characters and contain only letters and numbers');

    try {
      const res = await fetch('/api/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`✅ Room "${roomId}" created! Share the ID to let someone join.`);
      } else {
        alert(`⚠️ ${data.error || 'Room creation failed'}`);
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Server error during room creation');
    }
  });

  joinBtn?.addEventListener('click', async () => {
    const roomId = roomInput.value.trim();
    if (!isValidRoomId(roomId)) return alert('❗ Room ID must be at least 6 characters and contain only letters and numbers');

    try {
      const res = await fetch(`/api/check-room?roomId=${roomId}`);
      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = `/loading?room=${roomId}`;
      } else {
        alert(`⛔ ${data.error || 'Cannot join room'}`);
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Server unavailable');
    }
  });
});
