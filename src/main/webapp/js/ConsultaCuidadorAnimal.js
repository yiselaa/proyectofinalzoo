document.addEventListener("DOMContentLoaded", function () {

    const tbody = document.querySelector("#tablaAC tbody");

    function cargar() {

        fetch("/ProyectoFinalZoo/AnimalCuidadorConsultaServlet")
            .then(res => res.json())
            .then(data => {

                let html = "";

                data.forEach(a => {
                    html += `
                        <tr>
                            <td>${a.nombre_animal}</td>
                            <td>${a.nombre_empleado}</td>
                            <td>${a.apellido}</td>
                            <td>${a.numero_dui}</td>
                        </tr>
                    `;
                });

                tbody.innerHTML = html;

                // 🔥 SOLO INICIALIZAR UNA VEZ
                if (!$.fn.DataTable.isDataTable("#tablaAC")) {
                    $('#tablaAC').DataTable({
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
            });
    }

    cargar();
});