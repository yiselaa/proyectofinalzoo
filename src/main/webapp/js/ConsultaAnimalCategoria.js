document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("buscar");
    const tbody = document.querySelector("#tablaAnimales tbody");

    console.log("🔥 JS activo");

    function cargar(valor) {

        fetch("/ProyectoFinalZoo/CategoriaAnimalConsuServlet?filtro=" + encodeURIComponent(valor))
            .then(res => res.json())
            .then(data => {

                console.log("DATA:", data);

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
            })
            .catch(err => console.error("ERROR FETCH:", err));
    }

    // 🔥 FORZAR EVENTO DIRECTO
    input.onkeyup = function () {
        cargar(this.value);
    };

    // carga inicial
    cargar("");
});