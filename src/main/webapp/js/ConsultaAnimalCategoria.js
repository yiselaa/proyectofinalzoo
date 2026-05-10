function buscarAnimalesPorFiltro() {

    fetch("CategoriaAnimalConsuServlet")

    .then(response => response.json())

    .then(data => {

        console.log(data);

        const tbody = document.querySelector("#tablaAnimales tbody");

        tbody.innerHTML = "";

        data.forEach(animal => {

            tbody.innerHTML += `
                <tr>
                    <td>${animal.id}</td>
                    <td>${animal.nombre}</td>
                    <td>${animal.edad}</td>
                    <td>${animal.categoria}</td>
                    <td>${animal.descripcion}</td>
                </tr>
            `;
        });

    })

    .catch(error => {

        console.error(error);

    });
}

window.onload = buscarAnimalesPorFiltro;