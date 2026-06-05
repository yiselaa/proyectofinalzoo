/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


/* 
 * HistorialMedico.js
 */

/* 
 * HistorialMedico.js
 */

console.log("JS HISTORIAL MÉDICO CARGADO");

let paginaActual = 1;
const size = 5;

// ===============================
// CARGAR ANIMALES
// ===============================
function cargarAnimales() {

    fetch("AnimalServlet")
        .then(response => response.json())
        .then(data => {

            let select = document.getElementById("idAnimal");

            select.innerHTML =
                    '<option value="">Seleccione un animal</option>';

            data.forEach(animal => {

                select.innerHTML += `
                    <option value="${animal.id}">
                        ${animal.nombre}
                    </option>
                `;
            });
        })
        .catch(error => {
            console.error("Error cargando animales:", error);
        });
}

// ===============================
// CARGAR VETERINARIOS
// ===============================
function cargarVeterinarios() {

    fetch("VeterinarioServlet")
        .then(response => response.json())
        .then(data => {

            let select = document.getElementById("idVeterinario");

            select.innerHTML =
                    '<option value="">Seleccione un veterinario</option>';

            data.forEach(veterinario => {

                select.innerHTML += `
                    <option value="${veterinario.id}">
                        ${veterinario.nombre}
                    </option>
                `;
            });
        })
        .catch(error => {
            console.error("Error cargando veterinarios:", error);
        });
}

// ===============================
// BUSCAR HISTORIALES
// ===============================
function buscarHistoriales(pagina = 1) {

    paginaActual = pagina;

    fetch("HistorialMedicoServlet")
        .then(response => response.json())
        .then(data => {

            console.log(data);

            mostrarHistoriales(data);
        })
        .catch(error => {

            console.error("Error:", error);
        });
}

// ===============================
// MOSTRAR HISTORIALES EN TABLA
// ===============================
function mostrarHistoriales(lista) {

    let html = "";

    lista.forEach(h => {

        let fechaFormateada = "";

        if (h.fecha) {
            fechaFormateada = h.fecha.split("T")[0];
        }

        html += `
            <tr>
                <td>${h.id}</td>
                <td>${fechaFormateada}</td>
                <td>${h.diagnostico}</td>
                <td>${h.tratamiento}</td>
                <td>${h.animal ? h.animal.nombre : "Sin animal"}</td>
                <td>${h.veterinario ? h.veterinario.nombre : "Sin veterinario"}</td>
                <td class="acciones">

                    <button class="btnEditar"
                            onclick="editarHistorial(${h.id})">
                        Editar
                    </button>

                    <button class="btnEliminar"
                            onclick="eliminarHistorial(${h.id})">
                        Eliminar
                    </button>

                </td>
            </tr>
        `;
    });

    document.getElementById("tbodyHistoriales").innerHTML = html;
}

// ===============================
// EDITAR HISTORIAL
// ===============================
function editarHistorial(id) {

    fetch(`HistorialMedicoServlet?id=${id}`)
        .then(response => response.json())
        .then(h => {

            document.getElementById("idHistorial").value = h.id;

            document.getElementById("fecha").value =
                    h.fecha ? h.fecha.split("T")[0] : "";

            document.getElementById("diagnostico").value =
                    h.diagnostico;

            document.getElementById("tratamiento").value =
                    h.tratamiento;

            document.getElementById("idAnimal").value =
                    h.animal ? h.animal.id : "";

            document.getElementById("idVeterinario").value =
                    h.veterinario ? h.veterinario.id : "";
        })
        .catch(error => {

            console.error("Error:", error);
        });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formHistorial")
        .addEventListener("submit", function (event) {

    event.preventDefault();

    let id = document.getElementById("idHistorial").value;

    let historial = {

        fecha: document.getElementById("fecha").value,

        diagnostico:
                document.getElementById("diagnostico").value,

        tratamiento:
                document.getElementById("tratamiento").value,

        animal: {
            id: parseInt(
                    document.getElementById("idAnimal").value)
        },

        veterinario: {
            id: parseInt(
                    document.getElementById("idVeterinario").value)
        }
    };

    if (id) {
        historial.id = parseInt(id);
    }

    let metodo = id ? "PUT" : "POST";

    fetch("HistorialMedicoServlet", {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(historial)

    })
    .then(async response => {

        let data = await response.json();

        if (!response.ok) {

            alert(data.error || "Error al guardar");
            return;
        }

        console.log(data);

        limpiarFormularioHistorial();

        buscarHistoriales();
    })
    .catch(error => {

        console.error("Error:", error);
    });
});

// ===============================
// ELIMINAR HISTORIAL
// ===============================
function eliminarHistorial(id) {

    if (!confirm("¿Desea eliminar este historial médico?")) {
        return;
    }

    fetch(`HistorialMedicoServlet?id=${id}`, {

        method: "DELETE"

    })
    .then(response => response.text())
    .then(data => {

        console.log(data);

        buscarHistoriales();
    })
    .catch(error => {

        console.error("Error:", error);
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHistorial() {

    document.getElementById("formHistorial").reset();

    document.getElementById("idHistorial").value = "";
}

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    cargarAnimales();

    cargarVeterinarios();

    buscarHistoriales();

});