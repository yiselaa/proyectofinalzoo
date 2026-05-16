/* 
 * Empleados.js
 */

console.log("JS EMPLEADOS CARGADO");

let paginaActual = 1;
const size = 5;

// ===============================
// BUSCAR EMPLEADOS
// ===============================
function buscar(pagina = 1) {

    paginaActual = pagina;

    fetch("EmpleadoServlet")
        .then(response => response.json())
        .then(data => {

            console.log(data);

            mostrarEmpleados(data);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// ===============================
// MOSTRAR EMPLEADOS EN TABLA
// ===============================
function mostrarEmpleados(lista) {

    let html = "";

    lista.forEach(e => {

        html += `
            <tr>

                <td>${e.id}</td>

                <td>${e.nombre}</td>

                <td>${e.apellido}</td>

                <td>${e.dui}</td>

                <td>${e.rol}</td>

                <td class="acciones">

                    <button class="btnEditar"
                            onclick="editar(${e.id})">
                        Editar
                    </button>

                    <button class="btnEliminar"
                            onclick="eliminarEmpleado(${e.id})">
                        Eliminar
                    </button>

                </td>

            </tr>
        `;
    });

    document.getElementById("tbodyEmpleados").innerHTML = html;
}

// ===============================
// EDITAR EMPLEADO
// ===============================
function editar(id) {

    fetch(`EmpleadoServlet?id=${id}`)
        .then(response => response.json())
        .then(e => {

            document.getElementById("idEmpleado").value = e.id;

            document.getElementById("nombreEmpleado").value = e.nombre;

            document.getElementById("apellido").value = e.apellido;

            document.getElementById("numeroDui").value = e.dui;

            document.getElementById("rol").value = e.rol;
        })
        .catch(error => {
            console.error(error);
        });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formEmpleado")
        .addEventListener("submit", function (event) {

    event.preventDefault();

    let id = document.getElementById("idEmpleado").value;

    let empleado = {

        nombre: document.getElementById("nombreEmpleado").value,

        apellido: document.getElementById("apellido").value,

        dui: document.getElementById("numeroDui").value,

        rol: document.getElementById("rol").value
    };

    // SOLO EN EDICIÓN
    if (id) {
        empleado.id = parseInt(id);
    }

    let metodo = id ? "PUT" : "POST";

    fetch("EmpleadoServlet", {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(empleado)

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
// ELIMINAR EMPLEADO
// ===============================
function eliminarEmpleado(id) {

    if (!confirm("¿Desea eliminar este empleado?")) {
        return;
    }

    fetch(`EmpleadoServlet?id=${id}`, {

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

    document.getElementById("formEmpleado").reset();

    document.getElementById("idEmpleado").value = "";
}

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    buscar();

});