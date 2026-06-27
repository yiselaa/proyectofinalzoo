<%-- 
    Document   : Categoria
    Created on : 16 may. 2026, 21:31:56
    Author     : coc44
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Hábitats</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/Crud.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </head>

    <body>
        <div class="contenedor">
            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Sistema de Gestión de Hábitats</p>
            </div>

            <div class="contenido">
                <form id="formHabitat">
                    <input type="hidden" id="idHabitat">

                    <div class="formulario">
                        <div class="campo">
                            <label>Tipo de Terreno</label>
                            <input type="text" id="tipoTerreno" placeholder="Ingrese tipo de terreno" required>
                        </div>

                        <div class="campo">
                            <label>Capacidad</label>
                            <input type="number" id="capacidad" placeholder="Ingrese capacidad" required>
                        </div>

                        <div class="botones">
                            <button type="submit" class="guardar">Guardar Hábitat</button>
                            <button type="button" class="cancelar" onclick="limpiarFormularioHabitat()">Cancelar</button>
                        </div>
                    </div>
                </form>

                <table id="tablaHabitats">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo Terreno</th>
                            <th>Capacidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyHabitats"></tbody>
                </table>
                
                <div id="paginacion" class="paginacion"></div> 
                
                <div style="margin-top: 24px; text-align: right;">
                    <a href="index.html" class="btn-back">
                        <i class="ti ti-arrow-left"></i> 
                    </a>
                </div>

            </div>
        </div>

        <script src="${pageContext.request.contextPath}/js/Habitat.js"></script>
    </body>
</html>
