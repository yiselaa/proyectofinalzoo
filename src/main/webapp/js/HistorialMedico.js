/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* * HistorialMedico.js
 */

console.log("JS HISTORIAL MÉDICO CARGADO");

let paginaActual = 1;
const size = 5;

let mapaAnimalesEspecies = {};

// ===============================
// CARGAR ANIMALES
// ===============================
function cargarAnimales() {
    fetch("AnimalServlet")
            .then(response => response.json())
            .then(data => {
                let select = document.getElementById("idAnimal");
                select.innerHTML = '<option value="">Seleccione un animal</option>';

                mapaAnimalesEspecies = {};

                data.forEach(animal => {
                    
                    let nombreEspecie = (animal.especie && typeof animal.especie === 'object') ? animal.especie.nombre : animal.especie;

                    if (animal.nombre) {
                        mapaAnimalesEspecies[animal.nombre.trim().toLowerCase()] = nombreEspecie || "Sin especie";
                    }

                    select.innerHTML += `
                    <option value="${animal.id}" data-especie="${nombreEspecie || ''}">
                        ${animal.nombre}
                    </option>
                `;
                });

                // Mostrar especie automáticamente al cambiar en el select
                select.addEventListener("change", function () {
                    let especieInput = document.getElementById("especieAnimal");
                    let opcionSeleccionada = this.options[this.selectedIndex];
                    especieInput.value = opcionSeleccionada.dataset.especie || "";
                });

                // Al cargar la página por primera vez, buscamos los datos de la tabla
                buscarHistoriales();
            })
            .catch(error => {
                console.error("Error cargando animales:", error);
                buscarHistoriales();
            });
}

// ===============================
// CARGAR VETERINARIOS
// ===============================
function cargarVeterinarios() {
    fetch("EmpleadoServlet")
            .then(response => response.json())
            .then(data => {
                let select = document.getElementById("idVeterinario");
                select.innerHTML = '<option value="">Seleccione un veterinario</option>';

                data.forEach(empleado => {
                    if (empleado.rol === 'Veterinario') {
                        select.innerHTML += `
                        <option value="${empleado.id}">
                            ${empleado.nombre} ${empleado.apellido}
                        </option>
                    `;
                    }
                });
            })
            .catch(error => {
                console.error("Error al cargar los veterinarios:", error);
            });
}

// ===============================
// BUSCAR HISTORIALES (REFRESCO CON ANTI-CACHÉ)
// ===============================
function buscarHistoriales(pagina = 1) {
    paginaActual = pagina;

    fetch(`HistorialMedicoServlet?_=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            console.log("HISTORIALES RECIBIDOS:");
            console.log(data);

            mostrarHistoriales(data);
        })
        .catch(error => {
            console.error(error);
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

        let nombreAnimal = h.animal ? h.animal.nombre : null;
        let especieReal = "Sin especie";

        if (nombreAnimal) {
            let llave = nombreAnimal.trim().toLowerCase();
            if (mapaAnimalesEspecies[llave]) {
                especieReal = mapaAnimalesEspecies[llave];
            }
        }

        html += `
            <tr>
                <td>${h.id}</td>
                <td>${fechaFormateada}</td>
                <td>${h.diagnostico}</td>
                <td>${h.treatment || h.tratamiento}</td>
                <td>${nombreAnimal || "Sin animal"}</td>
                <td>${especieReal}</td>
                <td>${h.veterinario ? h.veterinario.nombre + ' ' + h.veterinario.apellido : "Sin veterinario"}</td>
                <td class="acciones">
    <button class="btnEditar"
        onclick="editarHistorial(${h.id})">
        <i class="ti ti-edit"></i>
    </button>

    <button class="btnEliminar"
        onclick="eliminarHistorial(${h.id})">
        <i class="ti ti-trash"></i>
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
    fetch(`HistorialMedicoServlet?id=${id}&_=${new Date().getTime()}`)
            .then(response => response.json())
            .then(h => {
                document.getElementById("idHistorial").value = h.id;
                document.getElementById("fecha").value = h.fecha ? h.fecha.split("T")[0] : "";
                document.getElementById("diagnostico").value = h.diagnostico;
                document.getElementById("tratamiento").value = h.tratamiento;
                document.getElementById("idAnimal").value = h.animal ? h.animal.id : "";

                // Buscamos la especie real para ponerla en el input al editar
                let nombreAnimal = h.animal ? h.animal.nombre : null;
                let especieReal = "";
                if (nombreAnimal) {
                    especieReal = mapaAnimalesEspecies[nombreAnimal.trim().toLowerCase()] || "";
                }
                document.getElementById("especieAnimal").value = especieReal;

                document.getElementById("idVeterinario").value = h.veterinario ? h.veterinario.id : "";
            })
            .catch(error => {
                console.error("Error al editar historial:", error);
            });
}

// ===============================
// GUARDAR O ACTUALIZAR (CON RETRASO DE PERSISTENCIA)
// ===============================
document.getElementById("formHistorial")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            let id = document.getElementById("idHistorial").value;

            let historial = {
                fecha: document.getElementById("fecha").value,
                diagnostico: document.getElementById("diagnostico").value,
                tratamiento: document.getElementById("tratamiento").value,
                animal: {
                    id: parseInt(document.getElementById("idAnimal").value)
                },
                veterinario: {
                    id: parseInt(document.getElementById("idVeterinario").value)
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

                        console.log("Respuesta del servidor:", data);

                        // 1. Limpiamos las cajas de texto del formulario inmediatamente
                        limpiarFormularioHistorial();

                        // 2. Esperamos 250ms para asegurar que Hibernate/EclipseLink/JPA termine de procesar el commit en BD
                        setTimeout(() => {
                            buscarHistoriales();
                        }, 250);
                    })
                    .catch(error => {
                        console.error("Error en la operación guardar/actualizar:", error);
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
            .then(response => response.json())
            .then(data => {
                console.log("Eliminado exitosamente:", data);

                // Esperamos 250ms antes de refrescar la tabla para darle respiro al borrado en BD
                setTimeout(() => {
                    buscarHistoriales();
                }, 250);
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
            });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHistorial() {
    document.getElementById("formHistorial").reset();
    document.getElementById("idHistorial").value = "";

    let especie = document.getElementById("especieAnimal");

    if (especie) {
        especie.value = "";
    }
}

// ===============================
// INICIO DE LA APLICACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", function () {
   
    cargarVeterinarios();
    cargarAnimales();
});