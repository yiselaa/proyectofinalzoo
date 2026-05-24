document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#tablaAnimales tbody");
    let table = null;

    function initDataTable() {
        if ($.fn.DataTable.isDataTable("#tablaAnimales")) {
            $('#tablaAnimales').DataTable().destroy();
        }
        table = $('#tablaAnimales').DataTable({
            autoWidth: false,
            pageLength: 5,
            lengthMenu: [5, 10, 25, 50],
            language: {
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                search: "Buscar ",
                infoEmpty: "No hay registros",
                zeroRecords: "No se encontraron resultados",
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
                            <td>${a.edad} años</td>
                            <td>${a.categoria}</td>
                            <td>${a.descripcion}</td>
                        </tr>
                    `;
                    });
                    tbody.innerHTML = html;
                    initDataTable();

                });
    }

    cargar();
});