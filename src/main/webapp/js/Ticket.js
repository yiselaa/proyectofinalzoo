console.log("JS nNUEVO CARGADO");
document.addEventListener("DOMContentLoaded", function () {

    cargarTickets();

    document.getElementById("formTicket")
            .addEventListener("submit", function (e) {

                e.preventDefault();

                let id = document.getElementById("idTicket").value;

                let ticket = {
                    id: id === "" ? null : parseInt(id),
                    tipo: document.getElementById("tipoTicket").value,
                    precio: parseFloat(document.getElementById("precio").value),
                    estado: "Activo"
                };

                let metodo = id === "" ? "POST" : "PUT";

                fetch("/ProyectoFinalZoo/TicketServlet", {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ticket)
                })
                        .then(response => response.json())
                        .then(data => {

                            Swal.fire({
                                icon: "success",
                                title: id ? "Actualizado" : "Agregado",
                                text: data.mensaje,
                                confirmButtonColor: "#3f5b4b"
                            });

                            limpiarFormulario();
                            cargarTickets();
                        })
                        .catch(error => {

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: error.message,
                                confirmButtonColor: "#b05d4d"
                            });
                        });

            });

});

function cargarTickets() {

    fetch("/ProyectoFinalZoo/TicketServlet?accion=listar")
            .then(response => response.json())
            .then(data => {

                let tbody = document.querySelector("#tablaTickets tbody");

                tbody.innerHTML = "";

                data.forEach(ticket => {

                    tbody.innerHTML += `
                    <tr>
                        <td>${ticket.id}</td>
                        <td>${ticket.tipo}</td>
                        <td>$${ticket.precio}</td>
                        <td>${ticket.estado}</td>

                        <td class="acciones">

                            <button class="btnEditar"
                                onclick="editarTicket(${ticket.id}, '${ticket.tipo}', ${ticket.precio})">
                                <i class="ti ti-edit"></i>
                            </button>

                            <button class="${ticket.estado === 'Activo' ? 'btnEliminar' : 'btnHabilitar'}"
    onclick="${ticket.estado === 'Activo'
                            ? `deshabilitarTicket(${ticket.id})`
                            : `habilitarTicket(${ticket.id})`}">
    <i class="ti ${ticket.estado === 'Activo' ? 'ti-ban' : 'ti-circle-check'}"></i>
</button>

                        </td>
                    </tr>
                `;
                });

            })
            .catch(error => console.error("Error al cargar tickets:", error));
}

function editarTicket(id, tipo, precio) {

    document.getElementById("idTicket").value = id;
    document.getElementById("tipoTicket").value = tipo;
    document.getElementById("precio").value = precio;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deshabilitarTicket(id) {
    Swal.fire({
        title: "¿Deshabilitar ticket?",
        text: "Ya no aparecerá en nuevas visitas",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b05d4d",
        cancelButtonColor: "#3f5b4b",
        confirmButtonText: "Sí, deshabilitar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed)
            return;

        fetch(`/ProyectoFinalZoo/TicketServlet?id=${id}`, {
            method: "DELETE"
        })
                .then(async response => {
                    const texto = await response.text();
                    if (!response.ok)
                        throw new Error(texto);
                    return JSON.parse(texto);
                })
                .then(data => {
                    Swal.fire({
                        icon: "success",
                        title: "Deshabilitado",
                        text: data.mensaje,
                        confirmButtonColor: "#3f5b4b"
                    });
                    cargarTickets();
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message,
                        confirmButtonColor: "#b05d4d"
                    });
                });
    });
}


function limpiarFormulario() {

    document.getElementById("idTicket").value = "";
    document.getElementById("tipoTicket").value = "";
    document.getElementById("precio").value = "";
}

function habilitarTicket(id) {
    Swal.fire({
        title: "¿Habilitar ticket?",
        text: "Volverá a aparecer en nuevas visitas",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3f5b4b",
        cancelButtonColor: "#b05d4d",
        confirmButtonText: "Sí, habilitar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) return;

        fetch(`/ProyectoFinalZoo/TicketServlet?id=${id}`, {
    method: "PUT",
    headers: { "X-Accion": "habilitar" }
})
        .then(async response => {
            const texto = await response.text();
            if (!response.ok) throw new Error(texto);
            return JSON.parse(texto);
        })
        .then(data => {
            Swal.fire({
                icon: "success",
                title: "Habilitado",
                text: data.mensaje,
                confirmButtonColor: "#3f5b4b"
            });
            cargarTickets();
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
                confirmButtonColor: "#b05d4d"
            });
        });
    });
}
