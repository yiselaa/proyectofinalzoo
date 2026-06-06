// console.log("JS USUARIOS CARGADO");

document.addEventListener("DOMContentLoaded", function () {

    buscarUsuarios();

    document.getElementById("formUsuario")
            .addEventListener("submit", function (event) {

                event.preventDefault();

                let id = document.getElementById("idUsuario").value;

                let usuario = {
                    nombreUsuario: document.getElementById("nombreUsuario").value,
                    contrasena: document.getElementById("contrasena").value,
                    empleado: {
                        id: parseInt(document.getElementById("idEmpleado").value)
                    }
                };

                if (id) {
                    usuario.id = parseInt(id);
                }

                let metodo = id ? "PUT" : "POST";

                fetch("/ProyectoFinalZoo/UssuarioServlet", {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                })
                        .then(async response => {

                            const data = await response.json();

                            if (!response.ok) {
                                throw new Error(data.error || "Error en la operación");
                            }

                            return data;
                        })
                        .then(data => {

                            document.getElementById("mensajeError").innerHTML = "";

                            console.log(data);

                            limpiarFormulario();
                            buscarUsuarios();

                            alert(data.mensaje);

                        })
                        .catch(error => {

                            document.getElementById("mensajeError").innerHTML =
                                    `<div style="
                        color:white;
                        background:#d62828;
                        padding:10px;
                        border-radius:8px;
                        margin-bottom:15px;
                    ">
                        ${error.message}
                    </div>`;

                            console.error(error);
                        });

            });

});

// ===============================
// LISTAR
// ===============================
function buscarUsuarios() {

    fetch("UssuarioServlet")
            .then(res => res.json())
            .then(data => mostrarUsuarios(data))
            .catch(error => console.error(error));
}

// ===============================
// MOSTRAR TABLA
// ===============================
function mostrarUsuarios(lista) {

    if (!Array.isArray(lista)) {
        console.error("Respuesta inválida:", lista);
        return;
    }

    let html = "";


    lista.forEach(u => {

        let idUsr = u.id ?? "—";
        let nombreUsr = u.nombreUsuario ?? "—";

        let nombreEmp =
                (u.empleado && u.empleado.nombre)
                ? u.empleado.nombre
                : "No asignado";

        html += `
            <tr>
                <td>${idUsr}</td>
                <td>${nombreUsr}</td>
                <td>***</td>
                <td>${nombreEmp}</td>
                <td>
                    <button class="btnEditar"
                        onclick="editar(${idUsr})">
                        <i class="ti ti-edit"></i>
                    </button>

                    <button class="btnEliminar"
                        onclick="eliminarUsuario(${idUsr})">
                          <i class="ti ti-trash"></i>

                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelector("#tablaUsuarios tbody").innerHTML = html;
}

// ===============================
// EDITAR
// ===============================
function editar(id) {

    fetch(`UssuarioServlet?id=${id}`)
            .then(response => response.json())
            .then(usuario => {

                document.getElementById("idUsuario").value =
                        usuario.id;

                document.getElementById("nombreUsuario").value =
                        usuario.nombreUsuario;

                // dejar vacía la contraseña
                document.getElementById("contrasena").value = "";

                // mensaje para el usuario
                document.getElementById("contrasena").placeholder =
                        "Dejar vacío para conservar la contraseña actual";

                if (usuario.empleado) {
                    document.getElementById("idEmpleado").value =
                            usuario.empleado.id;
                }

                // cambiar texto del botón
                document.getElementById("btnGuardar").textContent =
                        "Actualizar Usuario";

                // subir al formulario
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            })
            .catch(error => console.error(error));
}
// ===============================
// ELIMINAR
// ===============================
//function eliminarUsuario(id) {
//
//    if (!confirm("¿Desea eliminar este usuario?")) {
//        return;
//    }
//
//    fetch(`UssuarioServlet?id=${id}`, {
//        method: "DELETE"
//    })
//    .then(response => response.json())
//    .then(data => {
//
//        console.log(data);
//
//        buscarUsuarios();
//
//        alert(data.mensaje);
//
//    })
//    .catch(error => console.error(error));
//}

//function eliminarUsuario(id) {
//
//    Swal.fire({
//        title: "¿Eliminar usuario?",
//        text: "Esta acción no se puede deshacer",
//        icon: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#b05d4d",
//        cancelButtonColor: "#3f5b4b",
//        confirmButtonText: "Sí, eliminar",
//        cancelButtonText: "Cancelar"
//    }).then((result) => {
//
//        if (!result.isConfirmed) {
//            return;
//        }
//
//        fetch(`UssuarioServlet?id=${id}`, {
//            method: "DELETE"
//        })
//                .then(async response => {
//
//                    const texto = await response.text();
//
//                    console.log("STATUS:", response.status);
//                    console.log("RESPUESTA:", texto);
//
//                    if (!response.ok) {
//                        throw new Error(texto);
//                    }
//
//                    return JSON.parse(texto);
//                })
//                .then(data => {
//
//                    Swal.fire({
//                        icon: "success",
//                        title: "Eliminado",
//                        text: data.mensaje,
//                        confirmButtonColor: "#3f5b4b"
//                    });
//                    paginaActual = 1; // agregar esto
//                    buscarUsuarios()();
//                })
//                .catch(error => {
//
//                    Swal.fire({
//                        icon: "warning",
//                        title: "No se puede eliminar",
//                        text: error.message,
//                        confirmButtonColor: "#b05d4d"
//                    });
//                });
//    });
//}


function deshabilitarUsuario(id) {

    if (!confirm("¿Desea Deshabilitar este usuario?")) {
        return;
    }

    fetch("/ProyectoFinalZoo/UssuarioServlet?id=" + id, {
        method: "DELETE"
    })
            .then(response => response.text())
            .then(data => {

                alert(data);
                buscarUsuarios();

            })
            .catch(error => console.error("Error:", error));
}

function renderPaginacion() {
    document.getElementById("paginacion").innerHTML = `
        <button onclick="anterior()">
            <i class="ti ti-chevron-left"></i>
        </button>

        Página ${paginaActual}

        <button onclick="siguiente()">
            <i class="ti ti-chevron-right"></i>
        </button>
    `;
}
function siguiente() {

    let totalPaginas = Math.ceil(empleados.length / size);

    if (paginaActual < totalPaginas) {

        paginaActual++;

        buscarUsuarios();
        renderPaginacion();
    }
}
function anterior() {

    if (paginaActual > 1) {

        paginaActual--;

        buscarUsuarios();
        renderPaginacion();
    }
}
// ===============================
// LIMPIAR
// ===============================
function limpiarFormulario() {

    document.getElementById("formUsuario").reset();

    document.getElementById("idUsuario").value = "";

    document.getElementById("mensajeError").innerHTML = "";

    document.getElementById("btnGuardar").textContent =
            "Guardar Usuario";

    document.getElementById("contrasena").placeholder =
            "Ingrese contraseña";
}
