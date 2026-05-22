/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ues.edu.controlador;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ues.edu.entidades.Alimentacion;
import com.ues.edu.service.AlimentacionService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 *
 * @author coc44
 */
@WebServlet(name = "AlimentacionServlet", urlPatterns = {"/AlimentacionServlet"})
public class AlimentacionServlet extends HttpServlet {
    
    private AlimentacionService alimentacionService =
            new AlimentacionService();

    private Gson gson = new GsonBuilder()
            .excludeFieldsWithModifiers(
                    java.lang.reflect.Modifier.TRANSIENT)
            .addSerializationExclusionStrategy(
                    new com.google.gson.ExclusionStrategy() {

                @Override
                public boolean shouldSkipField(
                        com.google.gson.FieldAttributes f) {

                    return f.getName().equals("alimentaciones")
                            || f.getName().equals("historiales")
                            || f.getName().equals("cuidadores")
                            || f.getName().equals("listaAnimales");
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
            out.println("<title>Servlet AlimentacionServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AlimentacionServlet at " + request.getContextPath() + "</h1>");
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

        // 🔥 BUSCAR POR ID
        if (idParam != null && !idParam.isEmpty()) {

            int id = Integer.parseInt(idParam);

            Alimentacion alimentacion =
                    alimentacionService.buscarAlimentacion(id);

            if (alimentacion == null) {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND);

                response.getWriter().write(
                        "{\"mensaje\":\"Registro no encontrado\"}"
                );

                return;
            }

            response.setContentType("application/json");

            response.getWriter().write(
                    gson.toJson(alimentacion));

            return;
        }

        // 🔥 LISTAR TODOS
        List<Alimentacion> lista =
                alimentacionService.obtenerAlimentaciones();

        response.setContentType("application/json");

        response.getWriter().write(
                gson.toJson(lista));
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
        
    Alimentacion alimentacion =
                gson.fromJson(
                        request.getReader(),
                        Alimentacion.class
                );

        String error =
                validarAlimentacion(alimentacion);

        if (error != null) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST);

            response.setContentType("application/json");

            response.getWriter().write(
                    "{\"error\":\"" + error + "\"}"
            );

            return;
        }

        alimentacionService.crearAlimentacion(alimentacion);

        response.setContentType("application/json");

        response.getWriter().write(
                "{\"mensaje\":\"Alimentación guardada\"}"
        );
    }

    // ==========================
    // PUT
    // ==========================
    @Override
    protected void doPut(HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");

        Alimentacion alimentacion =
                gson.fromJson(
                        request.getReader(),
                        Alimentacion.class
                );

        String error =
                validarAlimentacion(alimentacion);

        if (error != null) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST);

            response.getWriter().write(
                    "{\"error\":\"" + error + "\"}"
            );

            return;
        }

        alimentacionService.editarAlimentacion(alimentacion);

        response.getWriter().write(
                "{\"mensaje\":\"Alimentación actualizada\"}"
        );
    }

    // ==========================
    // DELETE
    // ==========================
    @Override
    protected void doDelete(HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        int id = Integer.parseInt(
                request.getParameter("id"));

        alimentacionService.eliminarAlimentacion(id);

        response.setContentType("application/json");

        response.getWriter().write(
                "{\"mensaje\":\"Alimentación eliminada\"}"
        );
    }

    // ==========================
    // VALIDAR
    // ==========================
    private String validarAlimentacion(Alimentacion a) {

        if (a == null) {
            return "Registro inválido";
        }

        if (a.getTipoAlimento() == null
                || a.getTipoAlimento().trim().length() < 3) {

            return "Tipo alimento mínimo 3 caracteres";
        }

        if (a.getHorario() == null
                || a.getHorario().trim().length() < 3) {

            return "Horario inválido";
        }

        if (a.getCantidad() <= 0) {
            return "Cantidad inválida";
        }

        if (a.getAnimal() == null) {
            return "Debe seleccionar un animal";
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
