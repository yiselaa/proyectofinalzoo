/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* 
 * Alimentacion.js
 */

console.log("JS ALIMENTACION CARGADO");

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
            console.error("Error:", error);
        });
}

// ===============================
// BUSCAR ALIMENTACIONES
// ===============================
function buscar(pagina = 1) {

    paginaActual = pagina;

    fetch("AlimentacionServlet")
        .then(response => response.json())
        .then(data => {

            console.log(data);

            mostrarAlimentaciones(data);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// ===============================
// MOSTRAR ALIMENTACIONES
// ===============================
function mostrarAlimentaciones(lista) {

    let html = "";

    lista.forEach(a => {

        html += `
            <tr>

                <td>${a.id}</td>

                <td>${a.tipoAlimento}</td>

                <td>${a.horario}</td>

                <td>${a.cantidad}</td>

                <td>${a.animal ? a.animal.nombre : "Sin animal"}</td>

                <td class="acciones">

                    <button class="btnEditar"
                            onclick="editar(${a.id})">
                        Editar
                    </button>

                    <button class="btnEliminar"
                            onclick="eliminarAlimentacion(${a.id})">
                        Eliminar
                    </button>

                </td>

            </tr>
        `;
    });

    document.getElementById("tbodyAlimentacion").innerHTML = html;
}

// ===============================
// EDITAR
// ===============================
function editar(id) {

    fetch(`AlimentacionServlet?id=${id}`)
        .then(response => response.json())
        .then(a => {

            document.getElementById("idAlimentacion").value = a.id;

            document.getElementById("tipoAlimento").value =
                    a.tipoAlimento;

            document.getElementById("horario").value =
                    a.horario;

            document.getElementById("cantidad").value =
                    a.cantidad;

            document.getElementById("idAnimal").value =
                    a.animal ? a.animal.id : "";

        })
        .catch(error => {
            console.error(error);
        });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formAlimentacion")
        .addEventListener("submit", function (event) {

    event.preventDefault();

    let id =
            document.getElementById("idAlimentacion").value;

    let alimentacion = {

        tipoAlimento:
                document.getElementById("tipoAlimento").value,

        horario:
                document.getElementById("horario").value,

        cantidad:
                parseFloat(
                        document.getElementById("cantidad").value
                ),

        animal: {
            id: parseInt(
                    document.getElementById("idAnimal").value
            )
        }
    };

    // SOLO EN EDICIÓN
    if (id) {
        alimentacion.id = parseInt(id);
    }

    let metodo = id ? "PUT" : "POST";

    fetch("AlimentacionServlet", {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(alimentacion)

    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        limpiarFormulario();

        buscar();
    })
    .catch(error => {

        console.error(error);
    });

});

// ===============================
// ELIMINAR
// ===============================
function eliminarAlimentacion(id) {

    if (!confirm("¿Desea eliminar este registro?")) {
        return;
    }

    fetch(`AlimentacionServlet?id=${id}`, {

        method: "DELETE"

    })
    .then(response => response.text())
    .then(data => {

        console.log(data);

        buscar();
    })
    .catch(error => {

        console.error(error);
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormulario() {

    document.getElementById("formAlimentacion").reset();

    document.getElementById("idAlimentacion").value = "";
}

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    cargarAnimales();

    buscar();

});
