<%-- 
    Document   : Categoria
    Created on : 16 may. 2026, 21:31:56
    Author     : coc44
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WILD ZOO MK - Gestión de Empleados</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/Crud.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
    </head>

    <body>

        <div class="contenedor">

            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Sistema de Gestión de Categorías</p>
            </div>

            <div class="contenido">

                <form id="formCategoria">

                    <input type="hidden" id="idCategoria">

                    <div class="formulario">

                        <div class="campo">
                            <label>Nombre Categoría</label>

                            <input type="text"
                                   id="nombreCategoria"
                                   placeholder="Ingrese categoría"
                                   required>
                        </div>

                        <div class="campo">
                            <label>Descripción</label>

                            <textarea id="descripcion"
                                      placeholder="Ingrese descripción"
                                      required>
                            </textarea>
                        </div>

                        <div class="botones">

                            <button type="submit" class="guardar">
                                Guardar Categoría
                            </button>

                            <button type="button"
                                    class="cancelar"
                                    onclick="limpiarFormulario()">
                                Cancelar
                            </button>

                        </div>

                    </div>

                </form>

                <table id="tablaCategorias">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody id="tbodyCategorias">

                    </tbody>

                </table>

                <div style="margin-top: 24px; text-align: right;">
                    <a href="index.jsp" class="btn-back">
                        <i class="ti ti-arrow-left"></i> 
                    </a>
                </div>

            </div>

        </div>

        <script src="${pageContext.request.contextPath}/js/Categoria.js"></script>

    </body>
</html>