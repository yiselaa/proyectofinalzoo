package com.ues.edu.controlador;

import com.ues.edu.daos.ConsultaAnimalCategoriaDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(name = "CategoriaAnimalConsuServlet", urlPatterns = {"/CategoriaAnimalConsuServlet"})
public class CategoriaAnimalConsuServlet extends HttpServlet {

    ConsultaAnimalCategoriaDao dao = new ConsultaAnimalCategoriaDao();

     @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            String filtro = request.getParameter("filtro");

            List<Object[]> animales = dao.buscarFiltro(filtro);

            JSONArray jsonArray = new JSONArray();

            if (animales != null) {
                for (Object[] a : animales) {

                    JSONObject obj = new JSONObject();

                    obj.put("id", a[0] != null ? Long.parseLong(a[0].toString()) : 0);
                    obj.put("nombre", a[1] != null ? a[1].toString() : "");
                    obj.put("fecha_ingreso", a[2] != null ? a[2].toString() : "");
                    obj.put("fecha_nacimiento", a[3] != null ? a[3].toString() : "");
                    obj.put("edad", a[4] != null ? Long.parseLong(a[4].toString()) : 0);
                    obj.put("categoria", a[5] != null ? a[5].toString() : "");
                    obj.put("descripcion", a[6] != null ? a[6].toString() : "");

                    jsonArray.put(obj);
                }
            }

            out.print(jsonArray);

        } catch (Exception e) {

            e.printStackTrace();

            JSONObject error = new JSONObject();
            error.put("error", e.toString());

            out.print(error);
        }

        out.flush();
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    @Override
    public String getServletInfo() {
        return "CategoriaAnimalConsuServlet";
    }
}