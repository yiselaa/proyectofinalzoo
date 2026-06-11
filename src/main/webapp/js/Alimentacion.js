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
    fetch('AnimalServlet') // O la URL que uses para listar tus animales
            .then(response => response.json())
            .then(animales => {
                const selectAnimal = document.getElementById('idAnimal');

                selectAnimal.length = 1;

                animales.forEach(animal => {
                    const option = document.createElement('option');
                    option.value = animal.id;

                    option.textContent = animal.especie;

                    selectAnimal.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar animales:', error));
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
                console.error("Error buscando:", error);
            });
}

// ===============================
// MOSTRAR ALIMENTACIONES
// ===============================
function mostrarAlimentaciones(lista) {
    const tbody = document.getElementById('tbodyAlimentacion');
    tbody.innerHTML = ''; // Limpiar tabla

    lista.forEach(alimentacion => {
        const tr = document.createElement('tr');

        // Validamos que el objeto animal no venga nulo por seguridad
        const especieAnimal = alimentacion.animal ? alimentacion.animal.especie : 'Sin asignar';

        // 🛠️ CORREGIDO: Se cambió 'cargarParaEditar' por 'editar'
        tr.innerHTML = `
            <td>${alimentacion.id}</td>
            <td>${alimentacion.tipoAlimento}</td>
            <td>${alimentacion.horario}</td>
            <td>${alimentacion.cantidad}</td>
            <td>${especieAnimal}</td>
            <td class="acciones">
    <button class="btnEditar"
        onclick="editar(${alimentacion.id})">
        <i class="ti ti-edit"></i>
    </button>

    <button class="btnEliminar"
        onclick="eliminarAlimentacion(${alimentacion.id})">
        <i class="ti ti-trash"></i>
    </button>
</td>
            </td>
        `;
        tbody.appendChild(tr);
    });
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
                console.error("Error editando:", error);
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

            let idAnimal =
                    document.getElementById("idAnimal").value;

            let alimentacion = {

                tipoAlimento:
                        document.getElementById("tipoAlimento").value,

                horario:
                        document.getElementById("horario").value,

                cantidad:
                        parseFloat(
                                document.getElementById("cantidad").value
                                ),

                animal: idAnimal ? {
                    id: parseInt(idAnimal)
                } : null
            };

            // SOLO EN EDICIÓN
            if (id) {
                alimentacion.id = parseInt(id);
            }

            console.log("ENVIANDO:", alimentacion);

            let metodo = id ? "PUT" : "POST";

            fetch("AlimentacionServlet", {

                method: metodo,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(alimentacion)

            })
                    .then(async response => {

                        let texto = await response.text();

                        console.log("RESPUESTA SERVIDOR:", texto);

                        if (!response.ok) {
                            throw new Error(texto);
                        }

                        return JSON.parse(texto);
                    })
                    .then(data => {

                        console.log("GUARDADO:", data);

                        alert(data.mensaje);

                        limpiarFormulario();

                        buscar();
                    })
                    .catch(error => {

                        console.error("ERROR COMPLETO:", error);

                        alert("Error: " + error.message);
                    });

        });

// ===============================
// ELIMINAR
// ===============================
function eliminarAlimentacion(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        fetch(`AlimentacionServlet?id=${id}`, {
            method: 'DELETE'
        })
                .then(response => response.json())
                .then(data => {
                    console.log("ELIMINADO: ", data);
                    alert(data.mensaje);
                    // 🛠️ CORREGIDO: Se cambió 'listarAlimentaciones()' por 'buscar()' para refrescar la tabla
                    buscar();
                    limpiarFormulario();
                })
                .catch(error => console.error('Error al eliminar:', error));
    }
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