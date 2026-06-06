<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WILD ZOO MK - Gestión de Empleados</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/Crud.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    </head>

    <body>

        <div class="contenedor">

            <div class="header">
                <h1>WILD ZOO MK</h1>
                <p>Sistema de Gestión de Empleados</p>
            </div>

            <div class="contenido">

                <form id="formEmpleado">

                    <input type="hidden" id="idEmpleado">

                    <div class="formulario">

                        <div class="campo">
                            <label for="nombreEmpleado">Nombre</label>
                            <input type="text" id="nombreEmpleado" placeholder="Ingrese nombre" required>
                        </div>

                        <div class="campo">
                            <label for="apellido">Apellido</label>
                            <input type="text" id="apellido" placeholder="Ingrese apellido" required>
                        </div>

                        <div class="campo">
                            <label for="numeroDui">DUI</label>
                            <input type="text" id="numeroDui" placeholder="00000000-0" required>
                        </div>

                        <div class="campo">
                            <label for="rol">Rol</label>
                            <select id="rol" required>
                                <option value="">Seleccione rol</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="CUIDADOR">CUIDADOR</option>
                                <option value="VETERINARIO">VETERINARIO</option>
                            </select>
                        </div>

                        <div class="botones">
                            <button type="submit" class="guardar">
                                Guardar Empleado
                            </button>

                            <button type="button" class="cancelar">
                                Cancelar
                            </button>
                        </div>

                    </div>

                </form>

                <table id="tablaEmpleados">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DUI</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyEmpleados">
                    </tbody>
                </table>

<div id="paginacion" class="paginacion"></div>                
                <div style="margin-top: 24px; text-align: right;">
                    <a href="index.html" class="btn-back">
                        <i class="ti ti-arrow-left"></i> 
                    </a>
                </div>

            </div>

        </div>
        <script src="${pageContext.request.contextPath}/js/Empleado.js"></script>

    </body>

</html>