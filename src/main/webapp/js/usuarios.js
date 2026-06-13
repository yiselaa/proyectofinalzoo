/* * Usuarios.js - Gestión de Usuarios con Paginación
 */

console.log("JS USUARIOS CARGADO");

// ===============================
// VARIABLES GLOBALES
// ===============================
let usuarios = [];
let paginaActual = 1;
const size = 5;

// ===============================
// INICIALIZACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    buscarUsuarios();

    // Evento Submit del Formulario
    document.getElementById("formUsuario").addEventListener("submit", function (event) {
        event.preventDefault();

        let id = document.getElementById("idUsuario").value;

        let usuario = {
            nombreUsuario: document.getElementById("nombreUsuario").value.trim(),
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
            paginaActual = 1; // Reinicia a la primera página tras guardar
            buscarUsuarios();

            alert(data.mensaje);
        })
        .catch(error => {
            document.getElementById("mensajeError").innerHTML = `
                <div style="color:white; background:#d62828; padding:10px; border-radius:8px; margin-bottom:15px;">
                    ${error.message}
                </div>
            `;
            console.error(error);
        });
    });
});

// ===============================
// LISTAR USUARIOS (FETCH)
// ===============================
function buscarUsuarios() {
    fetch("UssuarioServlet")
        .then(res => res.json())
        .then(data => {
            usuarios = data;     // Guarda los datos en la variable global
            mostrarUsuarios();   // Renderiza las filas de la tabla
            renderPaginacion();  // Muestra los controles de paginación
        })
        .catch(error => console.error(error));
}

// ===============================
// MOSTRAR TABLA (CON RECORTE)
// ===============================
function mostrarUsuarios() {
    if (!Array.isArray(usuarios)) {
        console.error("Respuesta inválida:", usuarios);
        return;
    }

    let html = "";

    // Cálculo del rango de registros a mostrar
    let inicio = (paginaActual - 1) * size;
    let fin = inicio + size;
    let usuariosPagina = usuarios.slice(inicio, fin);

    if (usuariosPagina.length === 0) {
        html = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No se encontraron usuarios registrados
                </td>
            </tr>
        `;
        document.querySelector("#tablaUsuarios tbody").innerHTML = html;
        return;
    }

    usuariosPagina.forEach(u => {
        let idUsr = u.id ?? "—";
        let nombreUsr = u.nombreUsuario ?? "—";
        let nombreEmp = (u.empleado && u.empleado.nombre) ? u.empleado.nombre : "No asignado";

        html += `
            <tr>
                <td>${idUsr}</td>
                <td>${nombreUsr}</td>
                <td>***</td>
                <td>${nombreEmp}</td>
                <td>
                    <button class="btnEditar" onclick="editar(${idUsr})">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btnEliminar" onclick="deshabilitarUsuario(${idUsr})">
                        <i class="ti ti-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelector("#tablaUsuarios tbody").innerHTML = html;
}

// ===============================
// EDITAR REGISTRO
// ===============================
function editar(id) {
    fetch(`UssuarioServlet?id=${id}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById("idUsuario").value = usuario.id;
            document.getElementById("nombreUsuario").value = usuario.nombreUsuario;
            
            // Tratamiento de contraseña en edición
            document.getElementById("contrasena").value = "";
            document.getElementById("contrasena").placeholder = "Dejar vacío para conservar la contraseña actual";

            if (usuario.empleado) {
                document.getElementById("idEmpleado").value = usuario.empleado.id;
            }

            document.getElementById("btnGuardar").textContent = "Actualizar Usuario";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => console.error(error));
}

// ===============================
// DESHABILITAR / ELIMINAR
// ===============================
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
        paginaActual = 1; 
        buscarUsuarios();
    })
    .catch(error => console.error("Error:", error));
}

// ===============================
// COMPONENTE PAGINACIÓN
// ===============================
function renderPaginacion() {
    // Evita romper si el elemento contenedor no se encuentra listo en el DOM
    const pagContenedor = document.getElementById("paginacion");
    if (!pagContenedor) return;

    pagContenedor.innerHTML = `
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
    let totalPaginas = Math.ceil(usuarios.length / size);

    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarUsuarios();
        renderPaginacion();
    }
}

function anterior() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarUsuarios();
        renderPaginacion();
    }
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormulario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("idUsuario").value = "";
    document.getElementById("mensajeError").innerHTML = "";
    document.getElementById("btnGuardar").textContent = "Guardar Usuario";
    document.getElementById("contrasena").placeholder = "Ingrese contraseña";
}