<%-- 
    Document   : Cuidador
    Created on : 31 may. 2026, 16:18:47
    Author     : coc44
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Categorías y sus Cuidadores</title>

        <style>
            :root{
                --verde-oscuro:#1b4332;
                --verde-medio:#2d6a4f;
                --verde-claro:#52b788;
                --verde-suave:#d8f3dc;
                --blanco:#ffffff;
                --gris:#f4f4f4;
                --rojo:#d62828;
                --azul:#40916c;
            }

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            body{
                font-family: Arial, Helvetica, sans-serif;
                background: linear-gradient(135deg, #d8f3dc, #95d5b2);
                min-height:100vh;
                padding:40px;
            }

            .contenedor{
                max-width:1200px;
                margin:auto;
                background:var(--blanco);
                border-radius:20px;
                overflow:hidden;
                box-shadow:0 10px 25px rgba(0,0,0,0.2);
            }

            .header{
                background:linear-gradient(90deg, var(--verde-oscuro), var(--verde-medio));
                color:white;
                padding:35px;
                text-align:center;
            }

            .header h1{
                font-size:40px;
                margin-bottom:10px;
                letter-spacing:2px;
            }

            .header p{
                font-size:18px;
                opacity:0.9;
            }

            .contenido{
                padding:35px;
            }

            .formulario{
                display:grid;
                grid-template-columns:repeat(auto-fit, minmax(250px,1fr));
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
                font-size:15px;
                transition:0.3s;
                background:#f8fff9;
                width:100%;
            }

            /* Estilo personalizado para el selector múltiple */
            .campo select[multiple] {
                height: 140px;
                padding: 10px;
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
                padding:14px 25px;
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
                font-size:15px;
                text-transform:uppercase;
                letter-spacing:1px;
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
                background:var(--azul);
            }

            .btnEliminar{
                background:var(--rojo);
            }

            .btnEditar:hover,
            .btnEliminar:hover{
                transform:translateY(-2px);
                opacity:0.9;
            }

            @media(max-width:768px){
                body{
                    padding:15px;
                }

                .header h1{
                    font-size:28px;
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

            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Sistema de Gestión de Categorías y Cuidadores</p>
            </div>

            <div class="contenido">

                <form id="formCategoriaCuidador">

                    <input type="hidden" id="idAsignacionOculta">

                    <div class="formulario">

                        <div class="campo">
                            <label>Categoria</label>
                            <select id="idHabitatSelect" required>
                                <option value="">Cargando habitar...</option>
                            </select>
                        </div>

                        <div class="campo">
                            <label>Cuidador</label>
                            
                            <select id="idEmpleadoSelect" required>
                                <option value="">Seleccione cuidador...</option>
                                
                            </select>
                        </div>

                        <div class="botones">
                            <button type="submit" class="guardar">
                                Guardar Asignación
                            </button>

                            <button type="button"
                                    class="cancelar"
                                    onclick="limpiarFormulario()">
                                Cancelar
                            </button>
                        </div>

                    </div>

                </form>

                <table id="tablaCategoriaCuidador">
                    <thead>
                        <tr>
                            <th style="">ID</th>
                            <th style="">Habitat </th>
                            <th style=";">Cuidadores Responsables</th>
                            <th style="">Acciones</th>
                        </tr>
                    </thead>

                    <tbody id="tbodyCategoriaCuidador">
                        </tbody>
                </table>

            </div>

        </div>

        <script src="${pageContext.request.contextPath}/js/HabitatCuidador.js"></script>
    </body>
</html>
