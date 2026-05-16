document.addEventListener("DOMContentLoaded", function () {

    const tbody = document.querySelector("#tablaAnimales tbody");

    let table = null;

    function initDataTable() {
        table = $('#tablaAnimales').DataTable({
            pageLength: 5,
            lengthMenu: [5, 10, 25, 50],
            language: {
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: {
                    next: "Siguiente",
                    previous: "Anterior"
                }
            }
        });
    }

    function cargar() {

        fetch("/ProyectoFinalZoo/CategoriaAnimalConsuServlet")
            .then(res => res.json())
            .then(data => {

                let html = "";

                data.forEach(a => {
                    html += `
                        <tr>
                            <td>${a.id}</td>
                            <td>${a.nombre}</td>
                            <td>${a.fecha_ingreso}</td>
                            <td>${a.fecha_nacimiento}</td>
                            <td>${a.edad}</td>
                            <td>${a.categoria}</td>
                            <td>${a.descripcion}</td>
                        </tr>
                    `;
                });

                tbody.innerHTML = html;

                // ✔ inicializar SOLO UNA VEZ
                if (!$.fn.DataTable.isDataTable("#tablaAnimales")) {
                    initDataTable();
                } else {
                    table.clear().destroy();
                    initDataTable();
                }
            });
    }

    cargar();
});