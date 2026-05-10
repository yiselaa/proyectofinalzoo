/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
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

/**
 *
 * @author MINED
 */
@WebServlet(name = "CategoriaAnimalConsuServlet", urlPatterns = {"/CategoriaAnimalConsuServlet"})
public class CategoriaAnimalConsuServlet extends HttpServlet {

    ConsultaAnimalCategoriaDao dao = new ConsultaAnimalCategoriaDao();

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet CategoriaAnimalConsuServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet CategoriaAnimalConsuServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");

        PrintWriter out = response.getWriter();

        try {

            List<Object[]> animales = dao.getAnimalesPorNombre(null);

            JSONArray jsonArray = new JSONArray();

            for (Object[] a : animales) {

                System.out.println("COLUMNAS: " + a.length);

                for (Object valor : a) {
                    System.out.println(valor);
                }

                JSONObject obj = new JSONObject();

                obj.put("id", a[0]);
                obj.put("nombre", a[1]);
                obj.put("edad", a[2]);
                obj.put("categoria", a[3]);

                if (a.length > 4) {
                    obj.put("descripcion",
                            a[4] != null ? a[4].toString() : "");
                }

                jsonArray.put(obj);
            }

            out.print(jsonArray);

        } catch (Exception e) {

            e.printStackTrace();

            JSONObject error = new JSONObject();
            error.put("error", e.getMessage());

            out.print(error);
        }

        out.flush();
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @Override
    public void init() {
        System.out.println(">>> CategoriaAnimalConsuServlet CARGADO");
    }

}
