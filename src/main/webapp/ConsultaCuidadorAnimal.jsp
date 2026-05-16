<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Animales y Cuidadores</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">

        <link rel="stylesheet" href="css/ConsultasCss.css">
    </head>

    <body>

        <div class="header">
            <h1>🐾 LISTA DE ANIMALES Y CUIDADORES</h1>
        </div>

        <div class="container">

            <div class="card card-clean shadow-sm">

                <div class="table-responsive">
                    <table id="tablaAC" class="table table-hover">
                        <thead>
                        <th>Animal</th>
                        <th>Empleado</th>
                        <th>Apellido</th>
                        <th>DUI</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="mt-3 text-end">
                    <a href="index.html" class="btn-back">← </a>
                </div>

            </div>

        </div>

        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

        <script src="js/ConsultaCuidadorAnimal.js"></script>

    </body>
</html>