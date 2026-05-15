<%-- 
    Document   : ConsultaCuidadorAnimal
    Created on : 15 may 2026, 10:48:23
    Author     : MINED
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cuidadores por Animal</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body { background: #f1f8e9; }

        .header {
            background: linear-gradient(90deg, #2e7d32, #66bb6a);
            color: white;
            padding: 20px;
            text-align: center;
        }

        .card-custom {
            border: none;
            border-radius: 15px;
            box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
        }

        table thead {
            background: #2e7d32;
            color: white;
        }
    </style>
</head>

<body>

<div class="header">
    <h2>🐾 Cuidadores de Animales</h2>
</div>

<div class="container mt-5">

    <div class="card card-custom p-3">

        <table id="tablaCuidador" class="table table-hover">
            <thead>
                <tr>
                    <th>Animal</th>
                    <th>Nombre Cuidador</th>
                    <th>Apellido</th>
                </tr>
            </thead>

            <tbody></tbody>
        </table>

    </div>
</div>

<script src="js/ConsultaCuidador.js"></script>

</body>
</html>
