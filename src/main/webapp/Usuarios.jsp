<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="java.util.List" %>
<%@ page import="com.ues.edu.entidades.Empleado" %>
<%@ page import="com.ues.edu.service.EmpleadosService" %>

<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Usuarios</title>

        <style>

            :root{
                --verde-oscuro:#1b4332;
                --verde-medio:#2d6a4f;
                --verde-claro:#52b788;
                --verde-suave:#d8f3dc;
                --blanco:#ffffff;
                --gris:#f1f1f1;
                --rojo:#d62828;
                --verde-hover:#40916c;
            }

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            body{
                font-family: 'Segoe UI', sans-serif;
                background: linear-gradient(135deg,#d8f3dc,#95d5b2);
                min-height:100vh;
                padding:40px;
            }

            .contenedor{
                max-width:1200px;
                margin:auto;
                background:white;
                border-radius:20px;
                overflow:hidden;
                box-shadow:0 10px 30px rgba(0,0,0,0.15);
            }

            .encabezado{
                background:linear-gradient(90deg,var(--verde-oscuro),var(--verde-medio));
                padding:35px;
                text-align:center;
                color:white;
            }

            .encabezado h1{
                font-size:38px;
                margin-bottom:8px;
            }

            .encabezado p{
                font-size:17px;
                opacity:0.9;
            }

            .contenido{
                padding:35px;
            }

            .formulario{
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
                gap:20px;
                margin-bottom:40px;
            }

            .campo{
                display:flex;
                flex-direction:column;
            }

            .campo label{
                margin-bottom:8px;
                font-weight:bold;
                color:var(--verde-oscuro);
            }

            .campo input,
            .campo select{
                padding:14px;
                border:2px solid #cce3de;
                border-radius:12px;
                background:#f8fff9;
                font-size:15px;
                transition:0.3s;
            }

            .campo input:focus,
            .campo select:focus{
                outline:none;
                border-color:var(--verde-claro);
                box-shadow:0 0 10px rgba(82,183,136,0.4);
            }

            .botones{
                grid-column:1/-1;
                display:flex;
                gap:15px;
                margin-top:10px;
            }

            .botones button{
                padding:14px 22px;
                border:none;
                border-radius:12px;
                cursor:pointer;
                font-size:15px;
                font-weight:bold;
                transition:0.3s;
            }

            .guardar{
                background:var(--verde-medio);
                color:white;
            }

            .guardar:hover{
                background:var(--verde-oscuro);
                transform:scale(1.05);
            }

            .cancelar{
                background:#b7e4c7;
                color:var(--verde-oscuro);
            }

            .cancelar:hover{
                background:#95d5b2;
                transform:scale(1.05);
            }

            table{
                width:100%;
                border-collapse:collapse;
                overflow:hidden;
                border-radius:15px;
            }

            thead{
                background:var(--verde-medio);
                color:white;
            }

            th{
                padding:18px;
                text-transform:uppercase;
                letter-spacing:1px;
                font-size:14px;
            }

            td{
                padding:16px;
                text-align:center;
                border-bottom:1px solid #ddd;
            }

            tbody tr:nth-child(even){
                background:var(--verde-suave);
            }

            tbody tr:hover{
                background:#b7e4c7;
                transition:0.3s;
            }

            .acciones{
                display:flex;
                justify-content:center;
                gap:10px;
            }

            .btnEditar,
            .btnEliminar{
                border:none;
                padding:10px 14px;
                border-radius:8px;
                cursor:pointer;
                color:white;
                font-weight:bold;
                transition:0.3s;
            }

            .btnEditar{
                background:#40916c;
            }

            .btnEliminar{
                background:var(--rojo);
            }

            .btnEditar:hover,
            .btnEliminar:hover{
                transform:translateY(-2px);
                opacity:0.9;
            }

            .password-container{
                position:relative;
            }

            .password-toggle{
                position:absolute;
                right:15px;
                top:50%;
                transform:translateY(-50%);
                cursor:pointer;
                font-size:18px;
            }

            @media(max-width:768px){

                body{
                    padding:15px;
                }

                .botones{
                    flex-direction:column;
                }

                .acciones{
                    flex-direction:column;
                }

            }

        </style>

    </head>

    <body>

        <div class="contenedor">

            <div class="encabezado">
                <h1>WILD ZOO MK</h1>
                <p>Gestión de Usuarios</p>
            </div>

            <div class="contenido">

                <form id="formUsuario">

                    <input type="hidden" id="idUsuario">

                    <div class="formulario">

                        <div class="campo">
                            <label>Nombre Usuario</label>

                            <input type="text"
                                   id="nombreUsuario"
                                   placeholder="Ingrese usuario"
                                   required>
                        </div>

                        <div class="campo">

                            <label>Contraseña</label>

                            <div class="password-container">

                                <input type="password"
                                       id="contrasena"
                                       placeholder="Ingrese contraseña"
                                       required>

                                <span class="password-toggle">👁</span>

                            </div>

                        </div>

                        <div class="campo">

                            <label>Empleado</label>

                            <select id="idEmpleado" required>

                                <option value="">
                                    Seleccione empleado
                                </option>

                                <%
                                    EmpleadosService empleadoService =
                                            new EmpleadosService();

                                    List<Empleado> empleados =
                                            empleadoService.obtenerEmpleados();

                                    for(Empleado e : empleados){
                                %>

                                <option value="<%= e.getId() %>">
                                    <%= e.getNombre() %>
                                </option>

                                <%
                                    }
                                %>

                            </select>

                        </div>



                        <div class="botones">

                            <button type="submit" class="guardar">
                                Guardar Usuario
                            </button>

                            <button type="button"
                                    class="cancelar"
                                    onclick="limpiarFormulario()">
                                Cancelar
                            </button>

                        </div>

                    </div>

                </form>

                <table id="tablaUsuarios">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Empleado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>

                </table>

            </div>

        </div>

        <script>

            function togglePassword() {

                const passwordField =
                        document.getElementById("contrasena");

                if (passwordField.type === "password") {
                    passwordField.type = "text";
                } else {
                    passwordField.type = "password";
                }
            }

        </script>
        
        <script src="${pageContext.request.contextPath}/js/usuarios.js"></script>

    </body>
</html> 