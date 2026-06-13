/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* * Alimentacion.js
 */

console.log("JS ALIMENTACION CARGADO");

let paginaActual = 1;
const size = 5;

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    cargarAnimales();
    buscar();
});

// ===============================
// CARGAR ANIMALES EN COMBOBOX
// ===============================
function cargarAnimales() {
    fetch('AnimalServlet')
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener la lista de animales.");
            return response.json();
        })
        .then(animales => {
            const selectAnimal = document.getElementById('idAnimal');
            selectAnimal.length = 1; // Conservar solo la opción por defecto

            animales.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.id;
                
                // 🛠️ MODIFICADO: Ahora solo mostrará la especie del animal
                option.textContent = animal.especie;
                
                selectAnimal.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar animales:', error);
        });
}

// ===============================
// BUSCAR ALIMENTACIONES
// ===============================
function buscar(pagina = 1) {
    paginaActual = pagina;

    fetch("AlimentacionServlet")
        .then(response => {
            if (!response.ok) throw new Error("Error al consultar el registro de alimentación.");
            return response.json();
        })
        .then(data => {
            console.log(data);
            mostrarAlimentaciones(data);
        })
        .catch(error => {
            console.error("Error buscando:", error);
            mostrarAlertaError("No se pudo cargar el historial de alimentación.");
        });
}

// ===============================
// MOSTRAR ALIMENTACIONES EN TABLA
// ===============================
function mostrarAlimentaciones(lista) {
    const tbody = document.getElementById('tbodyAlimentacion');
    tbody.innerHTML = ''; 

    if (!Array.isArray(lista)) {
        console.error("Respuesta inválida:", lista);
        return;
    }

    lista.forEach(alimentacion => {
        const tr = document.createElement('tr');
        const especieAnimal = alimentacion.animal 
            ? `${alimentacion.animal.especie ?? "—"} ` 
            : 'Sin asignar';

        tr.innerHTML = `
            <td>${alimentacion.id}</td>
            <td>${alimentacion.tipoAlimento ?? "—"}</td>
            <td>${alimentacion.horario ?? "—"}</td>
            <td>${alimentacion.cantidad ?? "0"}</td>
            <td>${especieAnimal}</td>
            <td class="acciones">
                <button class="btnEditar" onclick="editar(${alimentacion.id})">
                    <i class="ti ti-edit"></i>
                </button>
                <button class="btnEliminar" onclick="eliminarAlimentacion(${alimentacion.id})">
                    <i class="ti ti-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===============================
// EDITAR REGISTRO
// ===============================
function editar(id) {
    fetch(`AlimentacionServlet?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo obtener el registro seleccionado.");
            return response.json();
        })
        .then(a => {
            document.getElementById("idAlimentacion").value = a.id;
            document.getElementById("tipoAlimento").value = a.tipoAlimento;
            document.getElementById("horario").value = a.horario;
            document.getElementById("cantidad").value = a.cantidad;
            document.getElementById("idAnimal").value = a.animal ? a.animal.id : "";

            // Cambiar dinámicamente el texto del botón de guardar
            let btnGuardar = document.getElementById("btnGuardarAlimentacion") || document.getElementById("btnGuardar");
            if (btnGuardar) {
                btnGuardar.textContent = "Actualizar Registro";
            }

            // Subida fluida hacia el formulario
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => {
            console.error("Error editando:", error);
            mostrarAlertaError("Error al recuperar los datos de la alimentación.");
        });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formAlimentacion")
        .addEventListener("submit", function (event) {

            event.preventDefault();

            let id = document.getElementById("idAlimentacion").value;
            let idAnimal = document.getElementById("idAnimal").value;

            let alimentacion = {
                tipoAlimento: document.getElementById("tipoAlimento").value,
                horario: document.getElementById("horario").value,
                cantidad: parseFloat(document.getElementById("cantidad").value),
                animal: idAnimal ? { id: parseInt(idAnimal) } : null
            };

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
                const text = await response.text();
                let data;
                
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    // Evita el error del token '<' si el servidor escupe un error HTML (500)
                    throw new Error(text || "Error interno en el servidor.");
                }

                if (!response.ok) {
                    throw new Error(data.error || "Error al procesar el registro de alimentación.");
                }
                return data;
            })
            .then(data => {
                console.log("GUARDADO:", data);

                // Quitar mensajes de alertas previos en la interfaz si los hay
                let msgError = document.getElementById("mensajeErrorAlimentacion") || document.getElementById("mensajeError");
                if (msgError) msgError.innerHTML = "";

                limpiarFormulario();
                buscar();

                Swal.fire({
                    icon: "success",
                    title: id ? "Registro Actualizado" : "Registro Guardado",
                    text: data.mensaje || "La alimentación se procesó correctamente.",
                    confirmButtonColor: "#3f5b4b"
                });
            })
            .catch(error => {
                console.error("ERROR COMPLETO:", error);

                let msgError = document.getElementById("mensajeErrorAlimentacion") || document.getElementById("mensajeError");
                if (msgError) {
                    msgError.innerHTML = `
                        <div style="color:white; background:#d62828; padding:10px; border-radius:8px; margin-bottom:15px;">
                            ${error.message}
                        </div>`;
                } else {
                    mostrarAlertaError(error.message);
                }
            });
        });

// ===============================
// ELIMINAR REGISTRO
// ===============================
function eliminarAlimentacion(id) {
    Swal.fire({
        title: "¿Deseas eliminar este registro?",
        text: "Esta acción removerá el horario y asignación de comida del animal.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b05d4d",
        cancelButtonColor: "#3f5b4b",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        fetch(`AlimentacionServlet?id=${id}`, {
            method: 'DELETE'
        })
        .then(async response => {
            const texto = await response.text();

            if (!response.ok) {
                throw new Error(texto || "No se pudo eliminar el registro.");
            }

            try {
                return JSON.parse(texto);
            } catch (e) {
                return { mensaje: texto };
            }
        })
        .then(data => {
            console.log("ELIMINADO: ", data);
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: data.mensaje || "El registro de alimentación ha sido removido.",
                confirmButtonColor: "#3f5b4b"
            });
            buscar();
            limpiarFormulario();
        })
        .catch(error => {
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: "error",
                title: "Error al borrar",
                text: error.message,
                confirmButtonColor: "#b05d4d"
            });
        });
    });
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormulario() {
    document.getElementById("formAlimentacion").reset();
    document.getElementById("idAlimentacion").value = "";

    let btnGuardar = document.getElementById("btnGuardarAlimentacion") || document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Alimentación";
    }
}

// Helper para alertas rápidas de error
function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error detectado",
        text: mensaje,
        confirmButtonColor: "#b05d4d"
    });
}