/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* * Habitats.js
 */

console.log("JS HABITATS CARGADO");

let paginaActual = 1;
const size = 5;

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    buscarHabitats();
});

// ===============================
// BUSCAR HABITATS
// ===============================
function buscarHabitats(pagina = 1) {
    paginaActual = pagina;

    fetch("HabitatServlet")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar la lista de hábitats.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            mostrarHabitats(data);
        })
        .catch(error => {
            console.error("Error:", error);
            mostrarAlertaError("No se pudieron cargar los hábitats");
        });
}

// ===============================
// MOSTRAR HABITATS EN TABLA
// ===============================
function mostrarHabitats(lista) {
    if (!Array.isArray(lista)) {
        console.error("Respuesta inválida:", lista);
        return;
    }

    let html = "";

    lista.forEach(h => {
        html += `
            <tr>
                <td>${h.id ?? "—"}</td>
                <td>${h.tipoTerreno ?? "—"}</td>
                <td>${h.capacidad ?? "—"}</td>
                <td class="acciones">
                    <button class="btnEditar"
                        onclick="editarHabitat(${h.id})">
                        <i class="ti ti-edit"></i>
                    </button>

                    <button class="btnEliminar"
                        onclick="eliminarHabitat(${h.id})">
                          <i class="ti ti-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tbodyHabitats").innerHTML = html;
}

// ===============================
// EDITAR HABITAT
// ===============================
function editarHabitat(id) {
    fetch(`HabitatServlet?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo obtener el hábitat.");
            return response.json();
        })
        .then(h => {
            document.getElementById("idHabitat").value = h.id;
            document.getElementById("tipoTerreno").value = h.tipoTerreno;
            document.getElementById("capacidad").value = h.capacidad;

            // Cambiar texto del botón si existe
            let btnGuardar = document.getElementById("btnGuardarHabitat") || document.getElementById("btnGuardar");
            if (btnGuardar) {
                btnGuardar.textContent = "Actualizar Hábitat";
            }

            // Subir suavemente al formulario
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("Error al recuperar los datos del hábitat.");
        });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formHabitat")
        .addEventListener("submit", function (event) {

    event.preventDefault();

    let id = document.getElementById("idHabitat").value;

    let habitat = {
        tipoTerreno: document.getElementById("tipoTerreno").value,
        capacidad: parseInt(document.getElementById("capacidad").value)
    };

    if (id) {
        habitat.id = parseInt(id);
    }

    let metodo = id ? "PUT" : "POST";

    fetch("HabitatServlet", {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(habitat)
    })
    .then(async response => {
        const text = await response.text();
        let data;
        
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Si el servidor responde HTML (Error 500) lo atrapamos aquí
            throw new Error(text || "Error interno del servidor");
        }

        if (!response.ok) {
            throw new Error(data.error || "Error en la operación del hábitat");
        }
        return data;
    })
    .then(data => {
        console.log(data);
        
        // Limpiar el contenedor de errores visuales si tienes uno
        let msgError = document.getElementById("mensajeErrorHabitat") || document.getElementById("mensajeError");
        if (msgError) msgError.innerHTML = "";

        limpiarFormularioHabitat();
        buscarHabitats();

        // Alerta de éxito con SweetAlert2
        Swal.fire({
            icon: "success",
            title: id ? "Hábitat Actualizado" : "Hábitat Guardado",
            text: data.mensaje || "Operación realizada con éxito",
            confirmButtonColor: "#3f5b4b"
        });
    })
    .catch(error => {
        console.error(error);
        
        // Renderizar caja de error roja sobre el formulario (estilo usuarios)
        let msgError = document.getElementById("mensajeErrorHabitat") || document.getElementById("mensajeError");
        if (msgError) {
            msgError.innerHTML = `
                <div style="color:white; background:#d62828; padding:10px; border-radius:8px; margin-bottom:15px;">
                    ${error.message}
                </div>`;
        } else {
            mostrarAlertaError(error.message);
        }
    });
});

// ===============================
// ELIMINAR HABITAT
// ===============================
function eliminarHabitat(id) {
    Swal.fire({
        title: "¿Eliminar hábitat?",
        text: "Esta acción no se puede deshacer y podría afectar a los animales asignados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b05d4d",
        cancelButtonColor: "#3f5b4b",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        fetch(`HabitatServlet?id=${id}`, {
            method: "DELETE"
        })
        .then(async response => {
            const texto = await response.text();

            if (!response.ok) {
                throw new Error(texto || "No se pudo eliminar el hábitat");
            }

            try {
                return JSON.parse(texto);
            } catch (e) {
                return { mensaje: texto };
            }
        })
        .then(data => {
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: data.mensaje || "El hábitat ha sido removido.",
                confirmButtonColor: "#3f5b4b"
            });
            buscarHabitats();
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "No se puede eliminar",
                text: error.message,
                confirmButtonColor: "#b05d4d"
            });
        });
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHabitat() {
    document.getElementById("formHabitat").reset();
    document.getElementById("idHabitat").value = "";
    
    let btnGuardar = document.getElementById("btnGuardarHabitat") || document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Hábitat";
    }
}

// Helper para alertas rápidas de error
function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensaje,
        confirmButtonColor: "#b05d4d"
    });
}