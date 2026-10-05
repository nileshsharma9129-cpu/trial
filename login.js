const form = document.getElementById('login-form');
const message = document.getElementById('form-message');

function setError(field, text) {
  document.getElementById(`${field}-error`).textContent = text;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;
  message.textContent = '';
  message.className = 'form-message';

  setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.');
  setError('password', password.length >= 8 ? '' : 'Password must be at least 8 characters.');
  if (!form.checkValidity() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) return;

  const button = form.querySelector('button');
  button.disabled = true;
  try {
    // TODO: point this at your backend's login endpoint.
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember: form.remember.checked }),
    });
    if (!res.ok) throw new Error('Invalid email or password.');
    message.textContent = 'Signed in! Redirecting…';
    message.classList.add('ok');
    window.location.href = '/';
  } catch (err) {
    message.textContent = err.message || 'Something went wrong. Try again.';
    message.classList.add('fail');
  } finally {
    button.disabled = false;
  }
});
