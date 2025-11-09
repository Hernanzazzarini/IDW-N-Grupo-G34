document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formreserva");
    const listaReservas = document.getElementById("lista_reservas");
    const medicoSelect = document.getElementById("seleccionarmedico");
    const obraSelect = document.getElementById("selec_obrasocial");
    const categoriaSelect = document.getElementById("categoria");
    const valorTotal = document.getElementById("valor_total");
  
    const valorMedicos = {
      "1-Lopez": 20000,
      "2-Reinozo": 15000,
      "3-Candido": 18000,
      "4-Etchegoyen": 22000
    };
  
    const multiplicadorObraSocial = {
      "1-IOMA": 1,
      "2-OSDE": 1.2,
      "3-UOM": 0.9,
      "4-Swiss Medical": 1.5
    };
  
    //actualiza el valor total
    medicoSelect.addEventListener("change", actualizarValor);
    obraSelect.addEventListener("change", actualizarValor);
  
    function actualizarValor() {
      const medico = medicoSelect.value;
      const obra = obraSelect.value;
      if (valorMedicos[medico] && multiplicadorObraSocial[obra]) {
        const total = valorMedicos[medico] * multiplicadorObraSocial[obra];
        valorTotal.textContent = `Valor total: $${total}`;
      } else {
        valorTotal.textContent = "Valor total: $0";
      }
    }
  
    //mostrar reservas
    function mostrarReservas() {
      const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
      if (!Array.isArray(reservas) || reservas.length === 0) {
        listaReservas.innerHTML = "<p>No tienes reservas registradas.</p>";
        return;
      }
  
      listaReservas.innerHTML = reservas.map(r => `
        <div class="reserva-item">
          <p><strong>Médico:</strong> ${r.medico}</p>
          <p><strong>Categoría:</strong> ${r.categoria}</p>
          <p><strong>Obra social:</strong> ${r.obraSocial}</p>
          <p><strong>Fecha:</strong> ${r.fecha}</p>
          <p><strong>Hora:</strong> ${r.hora}</p>
          <p><strong>Valor total:</strong> $${r.valorTotal}</p>
          <button class="eliminar" data-id="${r.id}">Eliminar</button>
        </div>
      `).join("");
  
      document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", e => eliminarReserva(e.target.dataset.id));
      });
    }
  
    function eliminarReserva(id) {
      let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
      reservas = reservas.filter(r => r.id != id);
      localStorage.setItem("reservas", JSON.stringify(reservas));
      mostrarReservas();
    }
  
    form.addEventListener("submit", e => {
      e.preventDefault();
  
      const medico = medicoSelect.options[medicoSelect.selectedIndex];
      const medicoId = medico.value;
      const medicoTexto = medico.text;
      const categoriaMedico = medico.dataset.categoria;
      const categoriaSeleccionada = categoriaSelect.value;
      const obraSocial = obraSelect.options[obraSelect.selectedIndex].text;
      const obraId = obraSelect.value;
      const fecha = document.getElementById("fecha_turno").value;
      const hora = document.getElementById("hora_turno").value;
  
      if (!medicoId || !obraId || !fecha || !hora || !categoriaSeleccionada) {
        alert("Por favor completa todos los campos.");
        return;
      }
  
      //verifica categoria correcta
      if (categoriaSeleccionada !== categoriaMedico) {
        alert("La categoría seleccionada no corresponde al médico elegido.");
        return;
      }
  
      let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  
      //evita duplicados
      const existe = reservas.some(r => r.medicoId === medicoId && r.fecha === fecha && r.hora === hora);
      if (existe) {
        alert("Este turno ya está reservado para ese médico en esa fecha y hora.");
        return;
      }
  
      const valor = valorMedicos[medicoId] * multiplicadorObraSocial[obraId];
  
      const nuevaReserva = {
        id: Date.now(),
        medico: medicoTexto,
        medicoId,
        categoria: categoriaSeleccionada,
        obraSocial,
        obraId,
        fecha,
        hora,
        valorTotal: valor
      };
  
      reservas.push(nuevaReserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));
  
      alert("Reserva registrada con éxito.");
      form.reset();
      valorTotal.textContent = "Valor total: $0";
      mostrarReservas();
    });
  
    mostrarReservas();
  });
  