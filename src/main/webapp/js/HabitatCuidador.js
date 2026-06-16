/* * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Asegurar que todo cargue al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarComponentes();
    listarAsignaciones(); 

    // Escuchar el evento del formulario para Guardar/Editar
    document.getElementById("formCategoriaCuidador").addEventListener("submit", guardarOEditar);
});

// ==========================================
// CARGAR SELECTORES DESDE LA BD
// ==========================================
function cargarComponentes() {
    fetch("EmpleadoServlet")
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
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
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
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
// TRAER DATOS DEL SERVLET Y PINTAR LA TABLA
// ==========================================
function listarAsignaciones() {
    fetch("HabitatCuidadorServlet")
        .then(res => {
            if (!res.ok) throw new Error("Error al consultar las asignaciones.");
            return res.json();
        })
        .then(data => {
            let html = "";
            if (Array.isArray(data)) {
                data.forEach(h => {
                    let nombresCuidadores = "Sin cuidadores asignados";
                    if (h.cuidadores && h.cuidadores.length > 0) {
                        nombresCuidadores = h.cuidadores
                                .map(c => `${c.nombre} ${c.apellido}`)
                                .join(", ");
                    }

                    html += `
                        <tr>
                            <td>${h.id}</td>
                            <td>${h.tipo_terreno || h.tipoTerreno || "—"} (Capacidad: ${h.capacidad ?? 0})</td>
                            <td>${nombresCuidadores}</td>
                            <td class="acciones">
                                <button class="btnEditar" onclick="cargarParaEditar(${h.id})">
                                    <i class="ti ti-edit"></i>
                                </button>
                                <button class="btnEliminar" onclick="eliminarAsignacion(${h.id})">
                                    <i class="ti ti-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });
            }
            document.getElementById("tbodyCategoriaCuidador").innerHTML = html;
        })
        .catch(err => {
            console.error("Error al listar la tabla:", err);
            mostrarAlertaError("No se pudo cargar la lista de asignaciones.");
        });
}

// ==========================================
// ACCIÓN: GUARDAR O MODIFICAR ASIGNACIÓN
// ==========================================
function guardarOEditar(e) {
    e.preventDefault();

    const idHabitat = document.getElementById("idHabitatSelect").value;
    const selectEmpleado = document.getElementById("idEmpleadoSelect");

    if (!idHabitat) {
        mostrarAlertaError("Por favor, seleccione un hábitat.");
        return;
    }

    // Obtener todos los IDs seleccionados
    const idsEmpleados = Array.from(selectEmpleado.selectedOptions)
            .map(option => parseInt(option.value))
            .filter(val => !isNaN(val));

    if (idsEmpleados.length === 0) {
        mostrarAlertaError("Por favor, seleccione al menos un cuidador.");
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
    .then(async res => {
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            throw new Error(text || "Error interno del servidor");
        }

        if (!res.ok) {
            throw new Error(data.error || "Error al procesar la asignación.");
        }
        return data;
    })
    .then(res => {
        limpiarFormulario();
        listarAsignaciones();

        Swal.fire({
            icon: "success",
            title: esEdicion ? "Asignación Actualizada" : "Asignación Exitosa",
            text: res.mensaje || "Operación realizada con éxito.",
            confirmButtonColor: "#3f5b4b"
        });
    })
    .catch(err => {
        console.error("Error al procesar asignación:", err);
        mostrarAlertaError(err.message);
    });
}

// ==========================================
// ACCIÓN: CARGAR DATOS EN EL FORMULARIO (EDITAR)
// ==========================================
function cargarParaEditar(idHabitat) {
    fetch(`HabitatCuidadorServlet?id=${idHabitat}`)
        .then(res => {
            if (!res.ok) throw new Error("No se pudo obtener la información de la asignación.");
            return res.json();
        })
        .then(habitat => {
            document.getElementById("idHabitatSelect").value = habitat.id;
            document.getElementById("idAsignacionOculta").value = habitat.id;

            // Seleccionar los cuidadores actuales en el select
            const selectEmpleado = document.getElementById("idEmpleadoSelect");
            const idsAsignados = habitat.cuidadores.map(c => c.id.toString());

            for (let i = 0; i < selectEmpleado.options.length; i++) {
                let option = selectEmpleado.options[i];
                option.selected = idsAsignados.includes(option.value);
            }

            // Cambiar el texto del botón de guardar de forma dinámica si existe
            let btnGuardar = document.getElementById("btnGuardarAsignacion") || document.getElementById("btnGuardar");
            if (btnGuardar) {
                btnGuardar.textContent = "Actualizar Asignación";
            }

            // Subir la pantalla suavemente al formulario
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(err => {
            console.error("Error al buscar asignación:", err);
            mostrarAlertaError("Error al recuperar los datos para edición.");
        });
}

// ==========================================
// ACCIÓN: ELIMINAR ASIGNACIÓN
// ==========================================
function eliminarAsignacion(idHabitat) {
    Swal.fire({
        title: "¿Está seguro de eliminar los cuidadores de este hábitat?",
        text: "El hábitat se quedará temporalmente sin personal asignado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b05d4d",
        cancelButtonColor: "#3f5b4b",
        confirmButtonText: "Sí, desasignar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        fetch(`HabitatCuidadorServlet?id=${idHabitat}`, {
            method: "DELETE"
        })
        .then(async res => {
            const text = await res.text();
            if (!res.ok) {
                throw new Error(text || "No se pudo remover la asignación.");
            }
            try {
                return JSON.parse(text);
            } catch (e) {
                return { mensaje: text };
            }
        })
        .then(res => {
            Swal.fire({
                icon: "success",
                title: "Asignación Eliminada",
                text: res.mensaje || "Los cuidadores fueron removidos de este hábitat.",
                confirmButtonColor: "#3f5b4b"
            });
            listarAsignaciones();
            limpiarFormulario();
        })
        .catch(err => {
            console.error("Error al eliminar:", err);
            Swal.fire({
                icon: "error",
                title: "Error al borrar",
                text: err.message,
                confirmButtonColor: "#b05d4d"
            });
        });
    });
}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================
function limpiarFormulario() {
    document.getElementById("formCategoriaCuidador").reset();
    document.getElementById("idAsignacionOculta").value = "";

    let btnGuardar = document.getElementById("btnGuardarAsignacion") || document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Asignación";
    }
}

// Helper para alertas rápidas de error
function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error detectado",
        text: mensaje,
        confirmButtonColor: "#b05d4d"
    });
}