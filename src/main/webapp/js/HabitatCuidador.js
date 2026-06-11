/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Asegurar que todo cargue al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarComponentes();
    listarAsignaciones(); // <--- Esta es la función clave que te faltaba llamar

    // Escuchar el evento del formulario para Guardar/Editar
    document.getElementById("formCategoriaCuidador").addEventListener("submit", guardarOEditar);
});

// ==========================================
// CARGAR SELECTORES DESDE LA BD (Ya lo tenías)
// ==========================================
function cargarComponentes() {
    fetch("EmpleadoServlet")
            .then(res => res.json())
            .then(empleados => {
                let html = `<option value="">Seleccione cuidador...</option>`;
                if (Array.isArray(empleados)) {
                    empleados.forEach(emp => {
                        if (emp.rol && emp.rol.toUpperCase() === "CUIDADOR") {
                            let nombre = emp.nombre_empleado || emp.nombre || "Sin nombre";
                            let apellido = emp.apellido || "";
                            html += `<option value="${emp.id}">${nombre} ${apellido}</option>`;
                        }
                    });
                }
                document.getElementById("idEmpleadoSelect").innerHTML = html;
            })
            .catch(err => console.error("Error cargando empleados:", err));

    fetch("HabitatServlet")
            .then(res => res.json())
            .then(habitats => {
                let html = `<option value="">Seleccione hábitat...</option>`;
                if (Array.isArray(habitats)) {
                    habitats.forEach(h => {
                        let terreno = h.tipo_terreno || h.tipoTerreno || "Hábitat";
                        let cap = h.capacidad !== undefined ? h.capacidad : 0;
                        html += `<option value="${h.id}">${terreno} (Capacidad: ${cap})</option>`;
                    });
                }
                document.getElementById("idHabitatSelect").innerHTML = html;
            })
            .catch(err => console.error("Error cargando hábitats:", err));
}

// ==========================================
// TRER DATOS DEL SERVLET Y PINTAR LA TABLA
// ==========================================
function listarAsignaciones() {
    fetch("HabitatCuidadorServlet")
            .then(res => res.json())
            .then(data => {
                let html = "";
                if (Array.isArray(data)) {
                    data.forEach(h => {
                        // Extraer los nombres de los cuidadores mapeados en tu Servlet
                        let nombresCuidadores = "Sin cuidadores asignados";
                        if (h.cuidadores && h.cuidadores.length > 0) {
                            nombresCuidadores = h.cuidadores
                                    .map(c => `${c.nombre} ${c.apellido}`)
                                    .join(", ");
                        }

                        html += `
                        <tr>
                            <td>${h.id}</td>
                            <td>${h.tipo_terreno} (Capacidad: ${h.capacidad})</td>
                            <td>${nombresCuidadores}</td>
                            <td class="acciones">
    <button class="btnEditar"
            onclick="cargarParaEditar(${h.id})">
        <i class="ti ti-edit"></i>
    </button>

    <button class="btnEliminar"
            onclick="eliminarAsignacion(${h.id})">
        <i class="ti ti-trash"></i>
    </button>
</td>
                        </tr>
                    `;
                    });
                }
                document.getElementById("tbodyCategoriaCuidador").innerHTML = html;
            })
            .catch(err => console.error("Error al listar la tabla:", err));
}

// ==========================================
// ACCIÓN: GUARDAR O MODIFICAR ASIGNACIÓN
// ==========================================
function guardarOEditar(e) {
    e.preventDefault();

    const idHabitat = document.getElementById("idHabitatSelect").value;
    const selectEmpleado = document.getElementById("idEmpleadoSelect");

    // Obtener todos los IDs seleccionados (por si usas selección múltiple)
    const idsEmpleados = Array.from(selectEmpleado.selectedOptions)
            .map(option => parseInt(option.value))
            .filter(val => !isNaN(val));

    if (idsEmpleados.length === 0) {
        alert("Por favor, seleccione al menos un cuidador.");
        return;
    }

    const esEdicion = document.getElementById("idAsignacionOculta").value !== "";
    const url = "HabitatCuidadorServlet";
    const metodo = esEdicion ? "PUT" : "POST";

    const payload = {
        idHabitat: parseInt(idHabitat),
        idsEmpleados: idsEmpleados
    };

    fetch(url, {
        method: metodo,
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify(payload)
    })
            .then(res => res.json())
            .then(res => {
                alert(res.mensaje || "Operación realizada con éxito");
                limpiarFormulario();
                listarAsignaciones();
            })
            .catch(err => console.error("Error al procesar asignación:", err));
}

// ==========================================
// ACCIÓN: CARGAR DATOS EN EL FORMULARIO (EDITAR)
// ==========================================
function cargarParaEditar(idHabitat) {
    fetch(`HabitatCuidadorServlet?id=${idHabitat}`)
            .then(res => res.json())
            .then(habitat => {
                // Bloqueamos o asignamos el ID del hábitat
                document.getElementById("idHabitatSelect").value = habitat.id;
                document.getElementById("idAsignacionOculta").value = habitat.id;

                // Seleccionar los cuidadores actuales en el select
                const selectEmpleado = document.getElementById("idEmpleadoSelect");
                const idsAsignados = habitat.cuidadores.map(c => c.id.toString());

                for (let i = 0; i < selectEmpleado.options.length; i++) {
                    let option = selectEmpleado.options[i];
                    option.selected = idsAsignados.includes(option.value);
                }
            })
            .catch(err => console.error("Error al buscar asignación:", err));
}

// ==========================================
// ACCIÓN: ELIMINAR ASIGNACIÓN
// ==========================================
function eliminarAsignacion(idHabitat) {
    if (confirm("¿Está seguro de eliminar los cuidadores de este hábitat?")) {
        fetch(`HabitatCuidadorServlet?id=${idHabitat}`, {
            method: "DELETE"
        })
                .then(res => res.json())
                .then(res => {
                    alert(res.mensaje);
                    listarAsignaciones();
                })
                .catch(err => console.error("Error al eliminar:", err));
    }
}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================
function limpiarFormulario() {
    document.getElementById("formCategoriaCuidador").reset();
    document.getElementById("idAsignacionOculta").value = "";
}