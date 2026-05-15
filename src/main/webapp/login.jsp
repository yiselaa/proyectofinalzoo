<%-- 
    Document   : login
    Created on : 15 may 2026, 10:34:29
    Author     : MINED
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #2e7d32, #81c784);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-card {
            width: 400px;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
            background: white;
        }

        .login-title {
            text-align: center;
            margin-bottom: 20px;
            color: #2e7d32;
        }
    </style>
</head>

<body>

<div class="login-card">

    <h2 class="login-title">Iniciar Sesión</h2>

    <!-- FORMULARIO -->
    <form action="LoginServlet" method="post">

        <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input type="text" name="usuario" class="form-control" placeholder="Ingrese usuario" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" name="password" class="form-control" placeholder="Ingrese contraseña" required>
        </div>

        <button type="submit" class="btn btn-success w-100">
            Entrar
        </button>

    </form>

    <hr>

    <p class="text-center text-muted">
        Sistema de Zoológico 🐾
    </p>

</div>

</body>
</html>