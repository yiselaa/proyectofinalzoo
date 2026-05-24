console.log("JS USUARIOS CARGADO");

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
        .then(res => res.json())
        .then(data => {

            console.log(data);

            limpiarFormulario();
            buscarUsuarios();

        })
        .catch(error => console.error(error));
    });
});

// ===============================
function buscarUsuarios() {

    fetch("/ProyectoFinalZoo/UssuarioServlet")
        .then(res => res.json())
        .then(data => mostrarUsuarios(data))
        .catch(error => console.error(error));
}

// ===============================
function mostrarUsuarios(lista) {

    if (!Array.isArray(lista)) {
        console.error("Respuesta inválida:", lista);
        return;
    }

    let html = "";

    lista.forEach(u => {

        html += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nombreUsuario}</td>
                <td>${u.empleado ? u.empleado.nombre : ""}</td>
                <td>${u.contrasena ? "••••••" : ""}</td>

                <td>
                    <button onclick="editar(${u.id})">Editar</button>
                    <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.querySelector("#tablaUsuarios tbody").innerHTML = html;
    
    
}

function limpiarFormulario() {
    document.getElementById("formUsuario").reset();
    document.getElementById("idUsuario").value = "";
}