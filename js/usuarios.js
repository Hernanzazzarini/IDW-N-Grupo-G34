import { requireAuth } from './auth.js';
requireAuth();

const container = document.getElementById('usersContainer');

async function loadUsers() {
  container.textContent = 'Cargando usuarios...';
  try {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json();
    renderUsers(data.users);
  } catch (err) {
    container.textContent = 'Error: ' + err.message;
  }
}

function renderUsers(users) {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th></tr>
    </thead>
  `;
  const tbody = document.createElement('tbody');

  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.firstName} ${u.lastName}</td>
      <td>${u.email}</td>
      <td>${u.phone}</td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}

loadUsers();
