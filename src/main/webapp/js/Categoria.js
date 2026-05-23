/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

document.addEventListener("DOMContentLoaded", function () {

    console.log("JS CATEGORIAS CARGADO");

    buscar();

    document.getElementById("formCategoria")
            .addEventListener("submit", function (event) {

        event.preventDefault();

        let id =
                document.getElementById("idCategoria").value;

        let categoria = {

            nombre:
                    document.getElementById("nombreCategoria").value,

            descripcion:
                    document.getElementById("descripcion").value
        };

        if (id) {

            categoria.id = parseInt(id);
        }

        let metodo = id ? "PUT" : "POST";

        fetch("CategoriaServlet", {

            method: metodo,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(categoria)

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

});

function buscar() {

    fetch("CategoriaServlet")
        .then(response => response.json())
        .then(data => {

            console.log(data);

            mostrarCategorias(data);

        })
        .catch(error => {

    console.error("Error:", error);

});
}

function mostrarCategorias(lista) {

    let html = "";

    lista.forEach(c => {

        html += `
            <tr>

                <td>${c.id}</td>

                <td>${c.nombre}</td>

                <td>${c.descripcion}</td>

                <td class="acciones">

                    <button class="btnEditar"
                            onclick="editar(${c.id})">
                        Editar
                    </button>

                    <button class="btnEliminar"
                            onclick="eliminarCategoria(${c.id})">
                        Eliminar
                    </button>

                </td>

            </tr>
        `;
    });

    document.getElementById("tbodyCategorias").innerHTML = html;
}

function editar(id) {

    fetch(`CategoriaServlet?id=${id}`)
        .then(response => response.json())
        .then(c => {

            document.getElementById("idCategoria").value = c.id;

            document.getElementById("nombreCategoria").value =
                    c.nombre;

            document.getElementById("descripcion").value =
                    c.descripcion;
        });
}

function eliminarCategoria(id) {

    if (!confirm("¿Desea eliminar esta categoría?")) {

        return;
    }

    fetch(`CategoriaServlet?id=${id}`, {

        method: "DELETE"

    })
    .then(() => {

        buscar();
    });
}

function limpiarFormulario() {

    document.getElementById("formCategoria").reset();

    document.getElementById("idCategoria").value = "";
}