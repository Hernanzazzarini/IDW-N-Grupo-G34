const MEDICOS_KEY = 'medicos';

// Se Inicializa LocalStorage  si no existe
if (!localStorage.getItem(MEDICOS_KEY)) {
    localStorage.setItem(MEDICOS_KEY, JSON.stringify([]));
}

// carga los médicos desde LocalStorage
function cargarMedicos() {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    const tbody = document.getElementById('medicosTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    medicos.forEach((medico, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = medico.nombre_y_apellido;
        row.insertCell(1).innerText = medico.Telefono;
        row.insertCell(2).innerText = medico.especialidad;
        row.insertCell(3).innerText = medico.Obra_Social;
        ;
        const accionesCell = row.insertCell(4);
        accionesCell.innerHTML = `
            <button class="btn btn-primary btn-sm" onclick="editarMedico(${index})">Modificar</button>
            <button class="btn btn-danger btn-sm"   onclick="eliminarMedico(${index})">Eliminar</button>
        `;
    });
}

// Agrega o modifica un medico
document.getElementById('medicoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre_y_apellido = document.getElementById('nombre y apellido').value;
    const Telefono = document.getElementById('Telefono').value;
    const especialidad = document.getElementById('especialidad').value;
    const Obra_Social = document.getElementById('Obra Social').value;
    const index = document.getElementById('medicoIndex').value;

    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));

    if (index === '-1') {
        // Para Agregar un nuevo médico
        medicos.push({ nombre_y_apellido,Telefono,especialidad,Obra_Social });
    } else {
        // Para Modificar un médico que ya existe
        medicos[index] = { nombre_y_apellido,Telefono,especialidad,Obra_Social  };
        document.getElementById('medicoIndex').value = '-1'; // 
    }

    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
    this.reset(); // Limpiar el formulario
    cargarMedicos(); // Actualizar tabla
});

// Para eliminar un médico
function eliminarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    medicos.splice(index, 1);
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
    cargarMedicos(); 
}

//  editar un médico
function editarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    document.getElementById('nombre y apellido').value = medicos[index].nombre_y_apellido;
    document.getElementById('Telefono').value = medicos[index].Telefono;
    document.getElementById('especialidad').value = medicos[index].especialidad;
    document.getElementById('Obra Social').value = medicos[index].Obra_Social;
    document.getElementById('medicoIndex').value = index; 
}

// Cargar médicos al inicio
cargarMedicos();