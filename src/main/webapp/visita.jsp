<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WILD ZOO MK - Gestión de Visitas</title>

        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/Crud.css">

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">

    </head>

    <body>

        <div class="contenedor">

            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Gestión de Visitas</p>
            </div>

            <div class="contenido">

                <form id="formVisita">

                    <input type="hidden" id="idVisita">

                    <div class="formulario">

                        <div class="campo">
                            <label>Nombre Visitante</label>

                            <input type="text"
                                   id="nombreVisitante"
                                   required>
                        </div>

                        <div class="campo">
                            <label>Fecha Visita</label>

                            <input type="date"
                                   id="fechaVisita"
                                   required>
                        </div>



                        <div class="botones">

                            <button type="submit" class="guardar">
                                Guardar
                            </button>

                            <button type="button"
                                    class="cancelar"
                                    onclick="limpiarFormulario()">
                                Cancelar
                            </button>

                        </div>

                    </div>

                </form>

                <table id="tablaVisitas">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Visitante</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>

                </table>
                
                 <div style="margin-top: 24px; text-align: right;">
                    <a href="index.jsp" class="btn-back">
                        <i class="ti ti-arrow-left"></i> 
                    </a>
                </div>

            </div>

        </div>

    </body>
</html>