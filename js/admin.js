const MEDICOS_KEY = 'medicos';
const initialMedicos = [
  {
    nombre: "Mariana",
    Apellido: "Lopez",
    Telefono: "56385896332588",
    Matricula_medica: 7882,
    especialidad: "Cirujana", 
    Obra_Social: "O.S.P.I"
  },
  {
    nombre: "Matias", 
    Apellido: "Candido",
    Telefono: "9988776655",
    Matricula_medica: 56974, 
    especialidad: "Pediatría",
    Obra_Social: "Swiss Medical"
  }
];

if (!localStorage.getItem(MEDICOS_KEY)) {
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(initialMedicos)); 
}
function cargarMedicos() {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    const tbody = document.getElementById('medicosTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    medicos.forEach((medico, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = medico.nombre;
        row.insertCell(1).innerText = medico.Apellido;       
        row.insertCell(2).innerText = medico.Telefono;        
        row.insertCell(3).innerText = medico.Matricula_medica; 
        row.insertCell(4).innerText = medico.especialidad;    
        row.insertCell(5).innerText = medico.Obra_Social;     
        const accionesCell = row.insertCell(6);
        accionesCell.innerHTML = `
            <button onclick="editarMedico(${index})">Modificar</button>
            <button onclick="eliminarMedico(${index})">Eliminar</button>
        `;
    });
}

document.getElementById('medicoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const Telefono = document.getElementById('telefono').value;
    const Matricula_medica = document.getElementById('matricula medica').value; 
    const especialidad = document.getElementById('especialidad').value;
    const Obra_Social = document.getElementById('obraSocial').value;
    const index = document.getElementById('medicoIndex').value;
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));

    if (index === '-1') {
        medicos.push({ 
            nombre, 
            Apellido: apellido,  
            Telefono, 
            Matricula_medica,    
            especialidad, 
            Obra_Social 
        });
    } else {
        medicos[index] = { 
            nombre, 
            Apellido: apellido,  
            Telefono,  
            Matricula_medica, 
            especialidad, 
            Obra_Social 
        };
        document.getElementById('medicoIndex').value = '-1';
    }
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
    this.reset(); 
    cargarMedicos(); 
});


function eliminarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    medicos.splice(index, 1);
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
    cargarMedicos(); 
}


function editarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    document.getElementById('nombre').value = medicos[index].nombre;
    document.getElementById('apellido').value = medicos[index].Apellido; 
    document.getElementById('telefono').value = medicos[index].Telefono;
    document.getElementById('matricula medica').value = medicos[index].Matricula_medica; 
    document.getElementById('especialidad').value = medicos[index].especialidad;
    document.getElementById('obraSocial').value = medicos[index].Obra_Social; 
    document.getElementById('medicoIndex').value = index; 
}

cargarMedicos();