<%-- 
    Document   : detalle_visita
    Created on : 22 may 2026, 22:14:56
    Author     : MINED
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Gestión de Detalle Visita</title>

    <script src="js/detalleVisita.js" defer></script>

    <style>

        :root{
            --verdeOscuro:#1b4332;
            --verdeMedio:#2d6a4f;
            --verdeClaro:#52b788;
            --verdeSuave:#d8f3dc;
            --blanco:#ffffff;
            --rojo:#d62828;
        }

        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }

        body{
            font-family:Arial, Helvetica, sans-serif;
            background:linear-gradient(135deg,#d8f3dc,#95d5b2);
            padding:40px;
        }

        .contenedor{
            max-width:1200px;
            margin:auto;
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,0.2);
        }

        .header{
            background:linear-gradient(90deg,var(--verdeOscuro),var(--verdeMedio));
            color:white;
            text-align:center;
            padding:30px;
        }

        .contenido{
            padding:30px;
        }

        .formulario{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:20px;
            margin-bottom:35px;
        }

        .campo{
            display:flex;
            flex-direction:column;
        }

        .campo label{
            margin-bottom:8px;
            font-weight:bold;
            color:var(--verdeOscuro);
        }

        .campo input,
        .campo select{
            padding:13px;
            border:2px solid #cce3de;
            border-radius:10px;
            background:#f8fff9;
        }

        .campo input:focus,
        .campo select:focus{
            outline:none;
            border-color:var(--verdeClaro);
        }

        .botones{
            grid-column:1/-1;
            display:flex;
            gap:15px;
        }

        button{
            padding:12px 18px;
            border:none;
            border-radius:10px;
            cursor:pointer;
            font-weight:bold;
        }

        .guardar{
            background:var(--verdeMedio);
            color:white;
        }

        .cancelar{
            background:#b7e4c7;
        }

        table{
            width:100%;
            border-collapse:collapse;
        }

        thead{
            background:var(--verdeMedio);
            color:white;
        }

        th,td{
            padding:15px;
            text-align:center;
            border-bottom:1px solid #ddd;
        }

        tbody tr:nth-child(even){
            background:var(--verdeSuave);
        }

    </style>

</head>

<body>

<div class="contenedor">

    <div class="header">
        <h1>WILD ZOO MK</h1>
        <p>Gestión de Detalle de Visitas</p>
    </div>

    <div class="contenido">

        <form id="formDetalleVisita">

            <input type="hidden" id="idDetalleVisita">

            <div class="formulario">

                <div class="campo">
                    <label>Visita</label>

                    <select id="idVisita" required>
                        <option value="">
                            Seleccione visita
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label>Ticket</label>

                    <select id="idTicket" required>
                        <option value="">
                            Seleccione ticket
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label>Cantidad</label>

                    <input type="number"
                           id="cantidad"
                           placeholder="Ingrese cantidad"
                           required>
                </div>

                <div class="campo">
                    <label>Subtotal</label>

                    <input type="number"
                           id="subtotal"
                           placeholder="Ingrese subtotal"
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

        <table id="tablaDetalleVisita">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Visita</th>
                    <th>Ticket</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>

            </tbody>

        </table>

    </div>

</div>

</body>
</html>
