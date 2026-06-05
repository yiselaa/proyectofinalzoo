<%-- 
    Document   : HistorialMedico
    Created on : 17 may. 2026, 19:24:36
    Author     : coc44
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Historial Médico</title>

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
                width:90%;
            }

            .botones{
                grid-column:1/-1;
                display:flex;
                gap:15px;
                margin-top:10px;
            }

            .guardar{
                background:var(--verde-medio);
                color:white;
                padding:14px 25px;
                border:none;
                border-radius:12px;
                cursor:pointer;
                font-weight:bold;
            }

            .cancelar{
                background:#b7e4c7;
                color:var(--verde-oscuro);
                padding:14px 25px;
                border:none;
                border-radius:12px;
                cursor:pointer;
                font-weight:bold;
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

            th, td{
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

            .btnEditar{
                background:var(--azul);
                color:white;
                border:none;
                padding:10px 14px;
                border-radius:8px;
                cursor:pointer;
                font-weight:bold;
            }

            .btnEliminar{
                background:var(--rojo);
                color:white;
                border:none;
                padding:10px 14px;
                border-radius:8px;
                cursor:pointer;
                font-weight:bold;
            }
        </style>
    </head>

    <body>
        <div class="contenedor">
            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Sistema de Gestión de Historial Médico</p>
            </div>

            <div class="contenido">
                <form id="formHistorial">
                    <input type="hidden" id="idHistorial">

                    <div class="formulario">
                        <div class="campo">
                            <label>Fecha</label>
                            <input type="date" id="fecha" required>
                        </div>

                        <div class="campo">
                            <label>Diagnóstico</label>
                            <input type="text" id="diagnostico" placeholder="Ingrese diagnóstico" required>
                        </div>

                        <div class="campo">
                            <label>Tratamiento</label>
                            <input type="text" id="tratamiento" placeholder="Ingrese tratamiento" required>
                        </div>

                        <div class="campo">
                            <label>Animal</label>
                            <select id="idAnimal" required>
                                <option value="">Seleccione un animal...</option>
                            </select>
                        </div>

                    <div class="campo">
                        <label>Veterinario</label>
                        <select id="idVeterinario" required>
                            <option value="">Seleccione un veterinario</option>
                        </select>
                    </div>

                    <div class="botones">
                        <button type="submit" class="guardar">Guardar</button>
                        <button type="button" class="cancelar" onclick="limpiarFormularioHistorial()">Cancelar</button>
                    </div>
            </div>
        </form>

        <br><br>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Diagnóstico</th>
                    <th>Tratamiento</th>
                    <th>Animal</th>
                    <th>Especie</th>
                    <th>Veterinario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tbodyHistoriales">
            </tbody>
        </table>
    </div>
</div>

<%-- Opción recomendada y segura en Jakarta EE / Servlets --%>
<script src="${pageContext.request.contextPath}/js/HistorialMedico.js"></script>
</body>
</html>