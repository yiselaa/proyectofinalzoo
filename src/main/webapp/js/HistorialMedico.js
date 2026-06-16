/* * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* * HistorialMedico.js
 */

console.log("JS HISTORIAL MÉDICO CARGADO - CORREGIDO PARA TU JSP REAL");

let mapaAnimalesEspecies = {};

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    cargarVeterinarios();
    cargarAnimales();
});

// ===================================================
//  FORMATEAR FECHA 
// ===================================================
function formatearFecha(fecha) {
    if (!fecha) return "";
    const solo = fecha.substring(0, 10);
    const partes = solo.split("-"); // El servlet corregido responde con guiones (yyyy-MM-dd)
    if (partes.length < 3) return fecha;
    return `${parseInt(partes[2])}/${parseInt(partes[1])}/${partes[0]}`;
}

// ===============================
// CARGAR ANIMALES
// ===============================
function cargarAnimales() {
    fetch("/ProyectoFinalZoo/AnimalServlet")
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener catálogo de animales.");
            return response.json();
        })
        .then(data => {
            let select = document.getElementById("idAnimal");
            select.innerHTML = '<option value="">Seleccione un animal...</option>';
            mapaAnimalesEspecies = {};

            data.forEach(animal => {
                let nombreEspecie = (animal.especie && typeof animal.especie === 'object') ? animal.especie.nombre : animal.especie;
                if (animal.nombre) {
                    mapaAnimalesEspecies[animal.nombre.trim().toLowerCase()] = nombreEspecie || "Sin especie";
                }
                select.innerHTML += `<option value="${animal.id}">${animal.nombre}</option>`;
            });

            buscarHistoriales();
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("No se pudieron cargar los animales.");
            buscarHistoriales();
        });
}

// ===============================
// CARGAR VETERINARIOS
// ===============================
function cargarVeterinarios() {
    fetch("/ProyectoFinalZoo/EmpleadoServlet")
        .then(response => response.json())
        .then(data => {
            let select = document.getElementById("idVeterinario");
            select.innerHTML = '<option value="">Seleccione un veterinario...</option>';
            data.forEach(emp => {
                if (emp.rol === 'Veterinario') {
                    select.innerHTML += `<option value="${emp.id}">${emp.nombre} ${emp.apellido}</option>`;
                }
            });
        })
        .catch(error => console.error("Error cargando veterinarios:", error));
}

// ===============================
// BUSCAR HISTORIALES
// ===============================
function buscarHistoriales() {
    fetch(`/ProyectoFinalZoo/HistorialMedicoServlet?_=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => mostrarHistoriales(data))
        .catch(error => {
            console.error(error);
            mostrarAlertaError("No se pudo cargar la lista de historiales médicos.");
        });
}

// ===============================
// MOSTRAR HISTORIALES EN TABLA
// ===============================
function mostrarHistoriales(lista) {
    if (!Array.isArray(lista)) return;
    let html = "";
    lista.forEach(h => {
        let nombreAnimal = h.animal ? h.animal.nombre : null;
        let especieReal = nombreAnimal ? (mapaAnimalesEspecies[nombreAnimal.trim().toLowerCase()] || "Sin especie") : "Sin especie";

        html += `
            <tr>
                <td>${h.id ?? "—"}</td>
                <td>${formatearFecha(h.fecha)}</td> 
                <td>${h.diagnostico ?? "—"}</td>
                <td>${h.treatment || h.tratamiento || "—"}</td>
                <td>${nombreAnimal || "Sin animal"}</td>
                <td>${especieReal}</td>
                <td>${h.veterinario ? h.veterinario.nombre + ' ' + h.veterinario.apellido : "Sin veterinario"}</td>
                <td class="acciones">
                    <button class="btnEditar" onclick="editarHistorial(${h.id})">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btnEliminar" onclick="eliminarHistorial(${h.id})">
                        <i class="ti ti-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tbodyHistoriales").innerHTML = html;
}

// ===========================================
// EDITAR HISTORIAL (Sincronizado con tus IDs)
// ===========================================
function editarHistorial(id) {
    fetch(`/ProyectoFinalZoo/HistorialMedicoServlet?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo obtener el registro.");
            return response.json();
        })
        .then(h => {
            // Mapeo exacto basado en el HTML de tu JSP
            document.getElementById("idHistorial").value = h.id;
            document.getElementById("fecha").value = h.fecha ? h.fecha.substring(0, 10) : "";
            document.getElementById("diagnostico").value = h.diagnostico ?? "";
            document.getElementById("tratamiento").value = h.tratamiento || h.treatment || "";
            document.getElementById("idAnimal").value = h.animal ? h.animal.id : "";
            document.getElementById("idVeterinario").value = h.veterinario ? h.veterinario.id : "";

            // Cambiar texto de tu botón real id="btnGuardar"
            let btnGuardar = document.getElementById("btnGuardar");
            if (btnGuardar) {
                btnGuardar.textContent = "Actualizar Historial";
            }

            // Subir la pantalla suavemente hacia el formulario
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("Error al cargar los datos en el formulario.");
        });
}

// ===========================================
// GUARDAR O ACTUALIZAR
// ===========================================
document.getElementById("formHistorial").addEventListener("submit", function (event) {
    event.preventDefault();

    let id = document.getElementById("idHistorial").value;
    let idAnimalRaw = document.getElementById("idAnimal").value;
    let idVeterinarioRaw = document.getElementById("idVeterinario").value;

    let historial = {
        fecha: document.getElementById("fecha").value,
        diagnostico: document.getElementById("diagnostico").value,
        tratamiento: document.getElementById("tratamiento").value,
        animal: idAnimalRaw ? { id: parseInt(idAnimalRaw) } : null,
        veterinario: idVeterinarioRaw ? { id: parseInt(idVeterinarioRaw) } : null
    };

    if (id) {
        historial.id = parseInt(id);
    }
    
    let metodo = id ? "PUT" : "POST";

    fetch("/ProyectoFinalZoo/HistorialMedicoServlet", {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historial)
    })
    .then(async response => {
        const text = await response.text();
        let data;
        try { data = JSON.parse(text); } catch (e) { throw new Error("Error en la respuesta del servidor."); }
        if (!response.ok) throw new Error(data.error || "Error al procesar la solicitud.");
        return data;
    })
    .then(data => {
        // Limpiamos tu div real id="mensajeError"
        let msgError = document.getElementById("mensajeError");
        if (msgError) msgError.innerHTML = "";

        limpiarFormularioHistorial();
        buscarHistoriales();

        Swal.fire({
            icon: "success",
            title: id ? "Historial Actualizado" : "Historial Registrado",
            text: data.mensaje || "Operación clínica realizada con éxito.",
            confirmButtonColor: "#3f5b4b"
        });
    })
    .catch(error => {
        console.error(error);
        mostrarAlertaError(error.message);
    });
});

// ===============================
// ELIMINAR HISTORIAL
// ===============================
function eliminarHistorial(id) {
    Swal.fire({
        title: "¿Eliminar historial clínico?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b05d4d",
        cancelButtonColor: "#3f5b4b",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) return;

        fetch(`/ProyectoFinalZoo/HistorialMedicoServlet?id=${id}`, { method: "DELETE" })
        .then(async response => {
            if (!response.ok) throw new Error("No se pudo eliminar el registro clínico.");
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: data.mensaje || "El reporte ha sido borrado.",
                confirmButtonColor: "#3f5b4b"
            });
            buscarHistoriales();
        })
        .catch(error => {
            mostrarAlertaError(error.message);
        });
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHistorial() {
    document.getElementById("formHistorial").reset();
    document.getElementById("idHistorial").value = "";
    
    let btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Historial";
    }
}

function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error Clínico",
        text: mensaje,
        confirmButtonColor: "#b05d4d"
    });
}