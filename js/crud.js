let entities = JSON.parse(localStorage.getItem('entities')) || [];
const form = document.getElementById('entityForm');
const container = document.getElementById('entitiesContainer');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const id = Date.now();
  entities.push({ id, name, description });
  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem('entities', JSON.stringify(entities));
  renderEntities();
}

function renderEntities() {
  container.innerHTML = '';
  const table = document.createElement('table');
  table.innerHTML = `
    <thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
  `;
  const tbody = document.createElement('tbody');

  entities.forEach(ent => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ent.id}</td>
      <td><input type="text" value="${ent.name}" data-id="${ent.id}" class="edit-name"></td>
      <td><input type="text" value="${ent.description}" data-id="${ent.id}" class="edit-desc"></td>
      <td>
        <button data-id="${ent.id}" class="delete-btn">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = +e.target.dataset.id;
      entities = entities.filter(ent => ent.id !== id);
      saveAndRender();
    });
  });

  container.querySelectorAll('.edit-name, .edit-desc').forEach(input => {
    input.addEventListener('change', e => {
      const id = +e.target.dataset.id;
      const field = e.target.classList.contains('edit-name') ? 'name' : 'description';
      const ent = entities.find(ent => ent.id === id);
      ent[field] = e.target.value;
      saveAndRender();
    });
  });
}

renderEntities();
