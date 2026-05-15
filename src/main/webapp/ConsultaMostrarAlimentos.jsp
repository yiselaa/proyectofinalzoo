<%-- 
    Document   : ConsultaMostrarAlimentos
    Created on : 15 may 2026, 10:46:53
    Author     : MINED
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Alimentación de Animales</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: #f1f8e9;
        }

        .header {
            background: linear-gradient(90deg, #2e7d32, #66bb6a);
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
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

        .btn-back {
            background: #f48fb1;
            color: white;
            border: none;
        }

        .btn-back:hover {
            background: #ec407a;
            color: white;
        }
    </style>
</head>

<body>

<!-- HEADER -->
<div class="header">
    <h2>🐾 Alimentación de Animales</h2>
</div>

<div class="container mt-5">

    <div class="card card-custom p-3">

        <div class="d-flex justify-content-between mb-3">
            <h5 class="text-success">Listado de alimentación</h5>

            <a href="index.jsp" class="btn btn-back">
                ⬅ Volver
            </a>
        </div>

        <table id="tablaAlimentacion" class="table table-hover">
            <thead>
                <tr>
                    <th>Animal</th>
                    <th>Tipo de Alimento</th>
                    <th>Cantidad</th>
                    <th>Horario</th>
                </tr>
            </thead>

            <tbody>
            </tbody>
        </table>

    </div>

</div>

<script src="js/ConsultaAlimentacion.js"></script>

</body>
</html>