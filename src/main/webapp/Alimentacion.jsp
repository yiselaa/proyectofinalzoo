<%-- 
    Document   : Alimentacion
    Created on : 18 may. 2026, 22:02:32
    Author     : coc44
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>

    <head>

        <title>Gestión de Alimentación</title>

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
                background:linear-gradient(
                    90deg,
                    var(--verde-oscuro),
                    var(--verde-medio)
                    );
                color:white;
                padding:35px;
                text-align:center;
            }

            .header h1{
                font-size:40px;
                margin-bottom:10px;
            }

            .contenido{
                padding:35px;
            }

            .formulario{
                display:grid;
                grid-template-columns:
                    repeat(auto-fit, minmax(250px,1fr));

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

                background:#f8fff9;

                width:100%;
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
            }

            .guardar{
                background:var(--verde-medio);
                color:white;
            }

            .cancelar{
                background:#b7e4c7;
                color:var(--verde-oscuro);
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
            }

            td{
                padding:16px;
                text-align:center;
                border-bottom:1px solid #ddd;
            }

            tbody tr:nth-child(even){
                background:var(--verde-suave);
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
            }

            .btnEditar{
                background:var(--azul);
            }

            .btnEliminar{
                background:var(--rojo);
            }

        </style>

    </head>

    <body>

        <div class="contenedor">

            <div class="header">

                <h1>WILD ZOO MK</h1>

                <p>Sistema de Gestión de Alimentación</p>

            </div>

            <div class="contenido">

                <form id="formAlimentacion">

                    <input type="hidden"
                           id="idAlimentacion">

                    <div class="formulario">

                        <div class="campo">

                            <label>Tipo Alimento</label>

                            <input type="text"
                                   id="tipoAlimento"
                                   placeholder="Ingrese alimento"
                                   required>

                        </div>

                        <div class="campo">

                            <label>Horario</label>

                            <input type="text"
                                   id="horario"
                                   placeholder="Ej: 08:00 AM"
                                   required>

                        </div>

                        <div class="campo">
                            <label>Cantidad</label>
                            <div style="display: flex; width: 100%;">
                                <input type="number"
                                       step="0.01"
                                       id="cantidad"
                                       placeholder="Ingrese cantidad"
                                       required
                                       style="border-radius: 12px 0 0 12px; border-right: none; flex: 1;">
                                <span style="display: flex; align-items: center; padding: 0 15px; background: var(--verde-suave); border: 2px solid #cce3de; border-left: none; border-radius: 0 12px 12px 0; color: var(--verde-oscuro); font-weight: bold; font-size: 15px;">
                                    kg
                                </span>
                            </div>
                        </div>

                        <div class="campo">

                            <label>Animal</label>

                            <select id="idAnimal" required>

                                <option value="">
                                    Seleccione un animal
                                </option>

                            </select>

                        </div>

                        <div class="botones">

                            <button type="submit"
                                    class="guardar">

                                Guardar Alimentación

                            </button>

                            <button type="button"
                                    class="cancelar"
                                    onclick="limpiarFormulario()">

                                Cancelar

                            </button>

                        </div>

                    </div>

                </form>

                <table id="tablaAlimentacion">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Tipo Alimento</th>

                            <th>Horario</th>

                            <th>Cantidad (kg)</th>

                            <th>Animal</th>

                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody id="tbodyAlimentacion">

                    </tbody>

                </table>

            </div>

        </div>

        <script src="${pageContext.request.contextPath}/js/Alimentacion.js?v=1.1"></script>

    </body>

</html>
