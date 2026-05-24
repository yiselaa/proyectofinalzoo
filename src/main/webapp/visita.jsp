<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Gestión de Visitas</title>

    <script src="js/visitas.js" defer></script>

    <style>

        :root{
            --verdeOscuro:#1b4332;
            --verdeMedio:#2d6a4f;
            --verdeClaro:#52b788;
            --verdeSuave:#d8f3dc;
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
            background:linear-gradient(90deg,#1b4332,#2d6a4f);
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
        }

        .campo input,
        .campo select{
            padding:13px;
            border:2px solid #cce3de;
            border-radius:10px;
            background:#f8fff9;
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
            background:#2d6a4f;
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
            background:#2d6a4f;
            color:white;
        }

        th,td{
            padding:15px;
            text-align:center;
            border-bottom:1px solid #ddd;
        }

        tbody tr:nth-child(even){
            background:#d8f3dc;
        }

    </style>

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

    </div>

</div>

</body>
</html>