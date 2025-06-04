const params = new URLSearchParams(window.location.search);
const roomId = params.get('room');

if (roomId) {
  setTimeout(() => {
    window.location.href = `/play.html?room=${roomId}`;
  }, 8000);
} else {
  alert('❌ Room ID is missing. Returning to menu.');
  window.location.href = '/home';
}
