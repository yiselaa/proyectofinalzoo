/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* 
 * Habitats.js
 */

console.log("JS HABITATS CARGADO");

let paginaActual = 1;
const size = 5;

// ===============================
// BUSCAR HABITATS
// ===============================
function buscarHabitats(pagina = 1) {

    paginaActual = pagina;

    fetch("HabitatServlet")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarHabitats(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// ===============================
// MOSTRAR HABITATS EN TABLA
// ===============================
function mostrarHabitats(lista) {

    let html = "";

    lista.forEach(h => {
        html += `
            <tr>
                <td>${h.id}</td>
                <td>${h.tipoTerreno}</td>
                <td>${h.capacidad}</td>
                <td class="acciones">
                    <button class="btnEditar"
                            onclick="editarHabitat(${h.id})">
                        Editar
                    </button>
                    <button class="btnEliminar"
                            onclick="eliminarHabitat(${h.id})">
                        Eliminar
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
        .then(response => response.json())
        .then(h => {
            document.getElementById("idHabitat").value = h.id;
            document.getElementById("tipoTerreno").value = h.tipoTerreno;
            document.getElementById("capacidad").value = h.capacidad;
        })
        .catch(error => {
            console.error(error);
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

    // SOLO EN EDICIÓN
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
    .then(response => response.json())
    .then(data => {
        console.log(data);
        limpiarFormularioHabitat();
        buscarHabitats();
    })
    .catch(error => {
        console.error(error);
    });
});

// ===============================
// ELIMINAR HABITAT
// ===============================
function eliminarHabitat(id) {

    if (!confirm("¿Desea eliminar este hábitat?")) {
        return;
    }

    fetch(`HabitatServlet?id=${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        buscarHabitats();
    })
    .catch(error => {
        console.error(error);
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHabitat() {
    document.getElementById("formHabitat").reset();
    document.getElementById("idHabitat").value = "";
}

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    buscarHabitats();
});
