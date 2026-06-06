/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ues.edu.controlador;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ues.edu.entidades.Categoria;
import com.ues.edu.service.CategoriaService;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

/**
 *
 * @author coc44
 */
@WebServlet(name = "CategoriaServlet", urlPatterns = {"/CategoriaServlet"})
public class CategoriaServlet extends HttpServlet {
    
     private CategoriaService categoriaService = new CategoriaService();

    private Gson gson = new GsonBuilder()
    .excludeFieldsWithModifiers(java.lang.reflect.Modifier.TRANSIENT)
    .addSerializationExclusionStrategy(new com.google.gson.ExclusionStrategy() {

        @Override
        public boolean shouldSkipField(
                com.google.gson.FieldAttributes f) {

            return f.getName().equals("listaAnimales");
        }

        @Override
        public boolean shouldSkipClass(Class<?> clazz) {

            return false;
        }
    })
    .create();

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
            out.println("<title>Servlet CategoriaServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet CategoriaServlet at " + request.getContextPath() + "</h1>");
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
        
    String idParam = request.getParameter("id");

        // BUSCAR POR ID
        if (idParam != null && !idParam.isEmpty()) {

            long id = Long.parseLong(idParam);

            Categoria categoria = categoriaService.buscarCategoria(id);

            if (categoria == null) {

                response.setStatus(HttpServletResponse.SC_NOT_FOUND);

                response.getWriter()
                        .write("{\"mensaje\":\"Categoría no encontrada\"}");

                return;
            }

            response.setContentType("application/json");

            response.getWriter().write(gson.toJson(categoria));

            return;
        }

        // LISTAR TODOS
        List<Categoria> categorias =
                categoriaService.obtenerCategorias();

        response.setContentType("application/json");

        response.getWriter().write(gson.toJson(categorias));
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
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        Categoria categoria =
                gson.fromJson(request.getReader(), Categoria.class);

        String error = validarCategoria(categoria);

        if (error != null) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            response.setContentType("application/json");

            response.getWriter()
                    .write("{\"error\":\"" + error + "\"}");

            return;
        }

        categoriaService.crearCategoria(categoria);

        response.setContentType("application/json");

        response.getWriter()
                .write("{\"mensaje\":\"Categoría guardada\"}");
    }

    
     @Override
    protected void doPut(HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        Categoria categoria =
                gson.fromJson(request.getReader(), Categoria.class);

        String error = validarCategoria(categoria);

        if (error != null) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            response.setContentType("application/json");

            response.getWriter()
                    .write("{\"error\":\"" + error + "\"}");

            return;
        }

        categoriaService.editarCategoria(categoria);

        response.setContentType("application/json");

        response.getWriter()
                .write("{\"mensaje\":\"Categoría actualizada\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        long id = Long.parseLong(request.getParameter("id"));

        categoriaService.eliminarCategoria(id);

        response.setContentType("application/json");

        response.getWriter()
                .write("{\"mensaje\":\"Categoría eliminada\"}");
    }

    // ==========================
    // VALIDAR
    // ==========================
    private String validarCategoria(Categoria c) {

        if (c == null) {

            return "Categoría inválida";
        }

        if (c.getNombre() == null
                || c.getNombre().trim().length() < 3) {

            return "Nombre mínimo 3 caracteres";
        }

        if (c.getDescripcion() == null
                || c.getDescripcion().trim().length() < 3) {

            return "Descripción mínima 3 caracteres";
        }

        return null;
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

}
