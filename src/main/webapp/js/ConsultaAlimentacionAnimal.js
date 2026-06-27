/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("¡JS de Consulta detectado y cargado correctamente!"); // 🌟 Alerta 1

    const tbody = document.querySelector("#tablaAlimentacion tbody");
    let table = null;

    function initDataTable() {
        table = $('#tablaAlimentacion').DataTable({
            pageLength: 5,
            lengthMenu: [5, 10, 25, 50],
            destroy: true,
            language: {
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: { next: "Siguiente", previous: "Anterior" }
            }
        });
    }

    function cargar() {
        console.log("Iniciando petición fetch al Servlet..."); // 🌟 Alerta 2
        
        fetch("AlimentacionAnimalConsuServlet")
            .then(res => {
                console.log("Estatus de la respuesta del servidor:", res.status); // 🌟 Alerta 3
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(data => {
                console.log("Datos crudos recibidos del Servlet:", data); // 🌟 Alerta 4

                if (table !== null) {
                    table.destroy();
                }

                let html = "";
                data.forEach(item => {
                    html += `
                        <tr>
                            <td>${item.nombre_animal}</td>
                            <td>${item.tipo_alimento}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.horario}</td>
                            <td>${item.cuidador}</td>
                        </tr>
                    `;
                });

                tbody.innerHTML = html;
                initDataTable();
            })
            .catch(error => {
                console.error("Error crítico atrapado en el catch:", error); // 🌟 Alerta de error
            });
    }

    cargar();
});