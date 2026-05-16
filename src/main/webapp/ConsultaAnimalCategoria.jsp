<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lista de Animales</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">

    <!-- CSS EXTERNO -->
<link rel="stylesheet" href="css/ConsultasCss.css"></head>

<body>

<!-- HEADER -->
<div class="header">
    <h1>🐾 LISTA DE ANIMALES</h1>
</div>

<div class="container">

    <div class="card card-clean shadow-sm">

        <div class="table-responsive">

            <table id="tablaAnimales" class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ingreso</th>
                        <th>Nacimiento</th>
                        <th>Edad</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

        </div>

        <!-- BOTÓN -->
        <div class="mt-4 text-end">
            <a href="index.html" class="btn-back">
                ← Volver al inicio
            </a>
        </div>

    </div>
</div>

<!-- SCRIPTS -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

<script src="js/ConsultaAnimalCategoria.js"></script>

</body>
</html>

