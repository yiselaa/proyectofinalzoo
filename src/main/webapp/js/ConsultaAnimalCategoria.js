function buscarAnimalesPorFiltro() {

    fetch(CONTEXT_PATH + "/CategoriaAnimalConsuServlet")

        .then(response => {

            console.log("STATUS:", response.status);

            if (!response.ok) {
                throw new Error("Error en servidor");
            }

            return response.json();
        })

        .then(data => {

            console.log("DATOS:", data);

            const tbody = document.querySelector("#tablaAnimales tbody");

            tbody.innerHTML = "";

            data.forEach(animal => {

                tbody.innerHTML += `
                    <tr>
                        <td>${animal.id}</td>
                        <td>${animal.nombre}</td>
                        <td>${animal.edad}</td>
                        <td>${animal.categoria}</td>
                        <td>---</td>
                    </tr>
                `;
            });

        })

        .catch(error => {

            console.error("ERROR:", error);

        });
}

window.onload = buscarAnimalesPorFiltro;