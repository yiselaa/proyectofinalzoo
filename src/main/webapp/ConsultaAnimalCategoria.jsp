<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

    <head>

        <meta charset="UTF-8">
        <title>Lista de Animales</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

        <style>
            body {
                background: #f1f8e9;
            }

            .header {
                background: linear-gradient(90deg, #2e7d32, #43a047);
                color: white;
                padding: 25px;
                text-align: center;
                border-radius: 0 0 20px 20px;
            }

            .card-custom {
                border: none;
                border-radius: 15px;
                box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
            }

            table thead {
                background-color: #2e7d32;
                color: white;
            }
        </style>

    </head>

    <body>

        <div class="header">
            <h1>🐾 Lista de Animales</h1>
        </div>

        <div class="container mt-5">

            <div class="card card-custom">

                <div class="card-body">

                    <table id="tablaAnimales" class="table table-hover text-center align-middle">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>

                        <tbody></tbody>

                    </table>

                </div>

            </div>

        </div>

        <script>
            const CONTEXT_PATH = "<%=request.getContextPath()%>";
            console.log("CONTEXT:", CONTEXT_PATH);
        </script>

        <script src="js/ConsultaAnimalCategoria.js"></script>

    </body>

</html>