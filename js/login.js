const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const username = form.username.value;
  const password = form.password.value;

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Usuario o contraseña incorrectos');

    const data = await res.json();

    // Guardar token en sessionStorage
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName
    }));

    window.location.href = './admin.html';
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});
