document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#tablaAnimales tbody");
    let table = null;


    function initDataTable() {
        table = $('#tablaAnimales').DataTable({
            autoWidth: false,
            pageLength: 5,
            lengthMenu: [5, 10, 25, 50],
            pagingType: "simple_numbers",
            language: {
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                search: "Buscar",
                infoEmpty: "No hay registros",
                zeroRecords: "No se encontraron resultados",
                paginate: {
                    next: "→",
                    previous: "←"
                }
            }
        });
    }

    function cargar() {
        fetch("/ProyectoFinalZoo/CategoriaAnimalConsuServlet")
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if ($.fn.DataTable.isDataTable("#tablaAnimales")) {
                        $('#tablaAnimales').DataTable().destroy();
                    }

                    tbody.innerHTML = "";

                    let html = "";
                    data.forEach(a => {
                        html += `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nombre}</td>
                                <td>${a.especie}</td>
                                <td>${a.fecha_ingreso}</td>
                                <td>${a.fecha_nacimiento}</td>
                                <td>${a.edad}</td>
                                <td>${a.tipoTerreno}</td>
                                <td>${a.capacidad}</td>
                            </tr>
                        `;
                    });

                    tbody.innerHTML = html;
                    initDataTable();
                    $('#tablaAnimales').DataTable().columns.adjust().draw();
                })
                .catch(error => {
                    console.error("Error al cargar datos:", error);
                });
    }

    cargar();
});

