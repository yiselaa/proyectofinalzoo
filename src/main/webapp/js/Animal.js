console.log("JS nuevo2 ANIMALES CARGADO");


// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    buscarAnimales();
    cargarCategorias();
});

let paginaActual = 1;
const size = 5;

// ===============================
// FORMATEAR FECHA
// ===============================
function formatearFecha(fecha) {
    console.log("Fecha recibida:", JSON.stringify(fecha));
    if (!fecha)
        return "";
    const solo = fecha.substring(0, 10);
    const partes = solo.split("-");
    return `${parseInt(partes[2])}/${parseInt(partes[1])}/${partes[0]}`;
}

// ===============================
// BUSCAR ANIMALES
// ===============================
function buscarAnimales(pagina = 1) {
    paginaActual = pagina;
    fetch("/ProyectoFinalZoo/AnimalServlet")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                mostrarAnimales(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
}

// ===============================
// MOSTRAR ANIMALES EN TABLA
// ===============================
function mostrarAnimales(lista) {
    let html = "";
    lista.forEach(a => {
        html += `
    <tr>
        <td>${a.id}</td>
        <td>${a.nombre}</td>
        <td>${formatearFecha(a.fechaNacimiento)}</td>
        <td>${calcularEdad(a.fechaNacimiento)}</td>
        <td>${formatearFecha(a.fechaIngreso)}</td>
        <td>${a.categoria ? a.categoria.nombre : ""}</td>
        <td class="acciones">
            <button class="btnEditar" onclick="editarAnimal(${a.id})">Editar</button>
            <button class="btnEliminar" onclick="eliminarAnimal(${a.id})">Eliminar</button>
        </td>
    </tr>
`;
    });
    document.getElementById("tbodyAnimales").innerHTML = html;
}
// ===============================
// CARGAR CATEGORIAS
// ===============================
function cargarCategorias() {
    fetch("/ProyectoFinalZoo/CategoriaServlet")
            .then(response => response.json())
            .then(data => {
                let combo = document.getElementById("categoria");
                combo.innerHTML = '<option value="">Seleccione categoría</option>';
                data.forEach(c => {
                    combo.innerHTML += `
                    <option value="${c.id}">${c.nombre}</option>
                `;
                });
            })
            .catch(error => {
                console.error(error);
            });
}

// ===============================
// EDITAR ANIMAL
// ===============================
function editarAnimal(id) {
    fetch(`/ProyectoFinalZoo/AnimalServlet?id=${id}`)
            .then(response => response.json())
            .then(a => {
                document.getElementById("idAnimal").value = a.id;
                document.getElementById("nombreAnimal").value = a.nombre;
                document.getElementById("fechaNacimiento").value =
                        a.fechaNacimiento ? a.fechaNacimiento.substring(0, 10) : "";
                document.getElementById("fechaIngreso").value =
                        a.fechaIngreso ? a.fechaIngreso.substring(0, 10) : "";
                document.getElementById("categoria").value =
                        a.categoria ? a.categoria.id : "";
            })
            .catch(error => {
                console.error(error);
            });
}

// ===============================
// GUARDAR O ACTUALIZAR
// ===============================
document.getElementById("formAnimal")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            let id = document.getElementById("idAnimal").value;

            let animal = {
                nombre: document.getElementById("nombreAnimal").value,
                fechaNacimiento: document.getElementById("fechaNacimiento").value,
                fechaIngreso: document.getElementById("fechaIngreso").value,
                categoria: {
                    id: parseInt(document.getElementById("categoria").value)
                }
            };

            if (id) {
                animal.id = parseInt(id);
            }

            let metodo = id ? "PUT" : "POST";

            fetch("/ProyectoFinalZoo/AnimalServlet", {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animal)
            })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        limpiarFormularioAnimal();
                        buscarAnimales();
                    })
                    .catch(error => {
                        console.error(error);
                    });
        });

// ===============================
// ELIMINAR ANIMAL
// ===============================
function eliminarAnimal(id) {
    if (!confirm("¿Desea eliminar este animal?")) {
        return;
    }
    fetch(`/ProyectoFinalZoo/AnimalServlet?id=${id}`, {
        method: "DELETE"
    })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                buscarAnimales();
            })
            .catch(error => {
                console.error(error);
            });
}

function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento)
        return "";
    const partes = fechaNacimiento.split("-");
    const hoy = new Date();
    const nacimiento = new Date(partes[0], partes[1] - 1, partes[2]);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad + " años";
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormularioAnimal() {
    document.getElementById("formAnimal").reset();
    document.getElementById("idAnimal").value = "";
}

