/* * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* * HistorialMedico.js
 */

console.log("JS HISTORIAL MÉDICO CARGADO - CORREGIDO CON SESIÓN GLOBAL AUTOMÁTICA");

let mapaAnimalesEspecies = {};
let paginaActual = 1;
const size = 5; // 🌟 Límite estricto de 5 registros por página
let datosCompletos = []; // Almacén global para segmentar los historiales médicos

// 🌟 VARIABLE GLOBAL: Guarda el ID del veterinario logueado para que no se pierda al limpiar o editar el formulario
let idVeterinarioSesion = null; 

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    cargarVeterinarios();
    cargarAnimales();
});

// ===================================================
//  FORMATEAR FECHA 
// ===================================================
function formatearFecha(fecha) {
    if (!fecha) return "";
    const solo = fecha.substring(0, 10);
    const partes = solo.split("-");
    if (partes.length < 3) return fecha;
    return `${parseInt(partes[2])}/${parseInt(partes[1])}/${partes[0]}`;
}

// ===============================
// CARGAR ANIMALES
// ===============================
function cargarAnimales() {
    fetch("/ProyectoFinalZoo/AnimalServlet")
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener catálogo de animales.");
            return response.json();
        })
        .then(data => {
            let select = document.getElementById("idAnimal");
            select.innerHTML = '<option value="">Seleccione un animal...</option>';
            mapaAnimalesEspecies = {};

            data.forEach(animal => {
                let nombreEspecie = (animal.especie && typeof animal.especie === 'object') ? animal.especie.nombre : animal.especie;
                if (animal.nombre) {
                    mapaAnimalesEspecies[animal.nombre.trim().toLowerCase()] = nombreEspecie || "Sin especie";
                }
                select.innerHTML += `<option value="${animal.id}">${animal.nombre}</option>`;
            });

            buscarHistoriales();
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("No se pudieron cargar los animales.");
            buscarHistoriales();
        });
}

// ===============================
// CARGAR VETERINARIOS
// ===============================
function cargarVeterinarios() {
    fetch("/ProyectoFinalZoo/EmpleadoServlet")
        .then(response => response.json())
        .then(data => {
            let select = document.getElementById("idVeterinario");
            select.innerHTML = '<option value="">Seleccione un veterinario...</option>';
            data.forEach(emp => {
                if (emp.rol === 'Veterinario') {
                    select.innerHTML += `<option value="${emp.id}">${emp.nombre} ${emp.apellido}</option>`;
                }
            });
            
            // Mapeamos al veterinario que está usando el sistema actualmente
            autocompletarVeterinario();
        })
        .catch(error => console.error("Error cargando veterinarios:", error));
}

// ===============================
// BUSCAR HISTORIALES (CORREGIDO)
// ===============================
function buscarHistoriales(pagina = 1) {
    paginaActual = pagina;

    fetch(`/ProyectoFinalZoo/HistorialMedicoServlet?_=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            console.log("Datos de historial recibidos:", data);
            datosCompletos = data; // Guardamos el array completo de la BD
            
            if (Array.isArray(datosCompletos)) {
                // Forzar el redibujado segmentado local
                redibujarTablaLocal();
            }
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("No se pudo cargar la lista de historiales médicos.");
        });
}

// ==========================================================
// MOSTRAR HISTORIALES EN TABLA
// ==========================================================
function mostrarHistoriales(lista) {
    if (!Array.isArray(lista)) return;
    let html = "";
    lista.forEach(h => {
        let nombreAnimal = h.animal ? h.animal.nombre : null;
        let especieReal = nombreAnimal ? (mapaAnimalesEspecies[nombreAnimal.trim().toLowerCase()] || "Sin especie") : "Sin especie";

        html += `
            <tr>
                <td>${h.id ?? "—"}</td>
                <td>${formatearFecha(h.fecha)}</td> 
                <td>${h.diagnostico ?? "—"}</td>
                <td>${h.treatment || h.tratamiento || "—"}</td>
                <td>${nombreAnimal || "Sin animal"}</td>
                <td>${especieReal}</td>
                <td>${h.veterinario ? h.veterinario.nombre + ' ' + h.veterinario.apellido : "Sin veterinario"}</td>
                <td class="acciones">
                    <button class="btnEditar" onclick="editarHistorial(${h.id})">
                        <i class="ti ti-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tbodyHistoriales").innerHTML = html;
}

// ==========================================================
// RENDERIZAR CONTROLES DE PAGINACIÓN (SÍNCRO TOTAL)
// ==========================================================
function renderPaginacion(totalRegistros) {
    const pagContenedor = document.getElementById("paginacion");
    if (!pagContenedor) return;

    const totalPaginas = Math.ceil(totalRegistros / size) || 1;

    pagContenedor.innerHTML = `
        <button onclick="anterior()" ${paginaActual === 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            <i class="ti ti-chevron-left"></i>
        </button>
        <span style="margin: 0 10px; font-weight: bold;">Página ${paginaActual} de ${totalPaginas}</span>
        <button onclick="siguiente()" ${paginaActual === totalPaginas ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            <i class="ti ti-chevron-right"></i>
        </button>
    `;
}

// ==========================================================
// LÓGICAS DE NAVEGACIÓN LOCAL (EL MOTOR DEL RECORTE)
// ==========================================================
function anterior() {
    if (paginaActual > 1) {
        paginaActual--;
        redibujarTablaLocal();
    }
}

function siguiente() {
    const totalPaginas = Math.ceil(datosCompletos.length / size);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        redibujarTablaLocal();
    }
}

function redibujarTablaLocal() {
    // 🧠 Segmentamos matemáticamente la lista en bloques de 5
    const inicio = (paginaActual - 1) * size;
    const fin = inicio + size;
    const registrosSegmentados = datosCompletos.slice(inicio, fin);
    
    mostrarHistoriales(registrosSegmentados);
    renderPaginacion(datosCompletos.length);
}

function cambiarPagina(nuevaPagina) {
    buscarHistoriales(nuevaPagina);
}

// ==========================================================
// EDITAR HISTORIAL
// ==========================================================
function editarHistorial(id) {
    fetch(`/ProyectoFinalZoo/HistorialMedicoServlet?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo obtener el registro.");
            return response.json();
        })
        .then(h => {
            document.getElementById("idHistorial").value = h.id;
            document.getElementById("fecha").value = h.fecha ? h.fecha.substring(0, 10) : "";
            document.getElementById("diagnostico").value = h.diagnostico ?? "";
            document.getElementById("tratamiento").value = h.tratamiento || h.treatment || "";
            document.getElementById("idAnimal").value = h.animal ? h.animal.id : "";
            
            // 🛡️ Sincronizamos el veterinario que ya poseía el registro en BD para que no viaje nulo
            if (h.veterinario && h.veterinario.id) {
                let selectVet = document.getElementById("idVeterinario");
                if (selectVet) selectVet.value = h.veterinario.id;
                idVeterinarioSesion = h.veterinario.id; // Asegura la persistencia global
            } else if (idVeterinarioSesion) {
                let selectVet = document.getElementById("idVeterinario");
                if (selectVet) selectVet.value = idVeterinarioSesion;
            }

            let btnGuardar = document.getElementById("btnGuardar");
            if (btnGuardar) {
                btnGuardar.textContent = "Actualizar Historial";
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(error => {
            console.error(error);
            mostrarAlertaError("Error al cargar los datos en el formulario.");
        });
}

// ==========================================================
// GUARDAR O ACTUALIZAR
// ==========================================================
document.getElementById("formHistorial").addEventListener("submit", function (event) {
    event.preventDefault();

    let id = document.getElementById("idHistorial").value;
    let idAnimalRaw = document.getElementById("idAnimal").value;
    let selectVet = document.getElementById("idVeterinario");
    
    // 🛡️ Prioridad de captura de datos infalible para evitar nulos en el objeto
    let idVeterinarioRaw = idVeterinarioSesion || (selectVet ? selectVet.value : "");

    if (!idVeterinarioRaw && selectVet) {
        idVeterinarioRaw = selectVet.value; 
    }

    let historial = {
        fecha: document.getElementById("fecha").value,
        diagnostico: document.getElementById("diagnostico").value,
        treatment: document.getElementById("tratamiento").value,
        tratamiento: document.getElementById("tratamiento").value,
        animal: idAnimalRaw ? { id: parseInt(idAnimalRaw) } : null,
        veterinario: idVeterinarioRaw ? { id: parseInt(idVeterinarioRaw) } : null
    };

    if (id) {
        historial.id = parseInt(id);
    }
    
    let metodo = id ? "PUT" : "POST";

    fetch("/ProyectoFinalZoo/HistorialMedicoServlet", {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historial)
    })
    .then(async response => {
        const text = await response.text();
        let data;
        try { data = JSON.parse(text); } catch (e) { throw new Error("Error en la respuesta del servidor."); }
        if (!response.ok) throw new Error(data.error || "Error al procesar la solicitud.");
        return data;
    })
    .then(data => {
        let msgError = document.getElementById("mensajeError");
        if (msgError) msgError.innerHTML = "";

        limpiarFormularioHistorial();
        buscarHistoriales(paginaActual);

        Swal.fire({
            icon: "success",
            title: id ? "Historial Actualizado" : "Historial Registrado",
            text: data.mensaje || "Operación clínica realizada con éxito.",
            confirmButtonColor: "#3f5b4b"
        });
    })
    .catch(error => {
        console.error(error);
        mostrarAlertaError(error.message);
    });
});

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioHistorial() {
    document.getElementById("formHistorial").reset();
    document.getElementById("idHistorial").value = "";
    
    let btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Historial";
    }
    
    // Restablecemos el ID en el select oculto para las siguientes inserciones
    let selectVet = document.getElementById("idVeterinario");
    if (selectVet && idVeterinarioSesion) {
        selectVet.value = idVeterinarioSesion;
    }
}

function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error Clínico",
        text: mensaje,
        confirmButtonColor: "#b05d4d"
    });
}

// ===================================================
// AUTOCOMPLETAR Y OCULTAR EL SELECTOR DESDE LA SESIÓN
// ===================================================
function autocompletarVeterinario() {
    fetch("/ProyectoFinalZoo/HistorialMedicoServlet?accion=obtenerSesion")
        .then(response => {
            if (!response.ok) throw new Error("No hay una sesión de veterinario activa.");
            return response.json();
        })
        .then(empleado => {
            idVeterinarioSesion = empleado.id; 
            
            let selectVet = document.getElementById("idVeterinario");
            if (selectVet) {
                selectVet.value = empleado.id; 
                selectVet.disabled = true;     
                
                let contenedorPadre = selectVet.parentElement;
                if (contenedorPadre) {
                    contenedorPadre.style.display = "none";
                }
            }
        })
        .catch(error => {
            console.log("Aviso de Sesión:", error.message);
        });
}