document.addEventListener('DOMContentLoaded', async () => {
  const message = document.getElementById('message');

  // Повідомлення про успіх/помилку
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  const success = params.get('success');
  if (error) {
    message.textContent = decodeURIComponent(error.replace(/\+/g, ' '));
    message.style.color = 'firebrick';
    message.style.display = 'block';
  } else if (success) {
    message.textContent = decodeURIComponent(success.replace(/\+/g, ' '));
    message.style.color = 'green';
    message.style.display = 'block';
  }

  // Завантаження поточного користувача
  try {
    const res = await fetch('/me');
    const user = await res.json();
    const avatarOptions = document.getElementById('avatar-options');
    const avatars = ['ava1.jpeg', 'ava2.jpeg', 'ava3.jpeg', 'ava4.jpeg', 'ava5.jpeg'];

    avatars.forEach(ava => {
      const label = document.createElement('label');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'avatar';
      input.value = ava;
      if (user.avatar === ava) input.checked = true;

      const img = document.createElement('img');
      img.src = `/image/ava/${ava}`;
      img.alt = ava;
      img.className = 'avatar-img';

      label.appendChild(input);
      label.appendChild(img);
      avatarOptions.appendChild(label);
    });

    // Активне підсвічування при виборі
    document.querySelectorAll('.avatar-img').forEach(img => {
      img.addEventListener('click', () => {
        document.querySelectorAll('input[name="avatar"]').forEach(input => input.checked = false);
        img.previousElementSibling.checked = true;

        document.querySelectorAll('.avatar-img').forEach(i => i.style.borderColor = 'transparent');
        img.style.borderColor = 'white';
      });
    });
  } catch (err) {
    console.error('Unable to load user:', err);
  }
});
