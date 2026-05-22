/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ues.edu.controlador;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ues.edu.entidades.HistorialMedico;
import com.ues.edu.service.HistorialMedicoService;
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
@WebServlet(name = "HistorialMedicoServlet", urlPatterns = {"/HistorialMedicoServlet"})
public class HistorialMedicoServlet extends HttpServlet {

    private HistorialMedicoService historialService = new HistorialMedicoService();

    private Gson gson = new GsonBuilder()
        .addSerializationExclusionStrategy(new com.google.gson.ExclusionStrategy() {
            @Override
            public boolean shouldSkipField(com.google.gson.FieldAttributes f) {
                // Evitar ciclos infinitos en relaciones bidireccionales
                return f.getName().equals("listaHistoriales") 
                    || f.getName().equals("listaAnimales");
            }
            @Override
            public boolean shouldSkipClass(Class<?> clazz) { return false; }
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
            out.println("<title>Servlet HistorialMedicoServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet HistorialMedicoServlet at " + request.getContextPath() + "</h1>");
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
            throws IOException {
      

     String idParam = request.getParameter("id");


        if (idParam != null && !idParam.isEmpty()) {
            int id = Integer.parseInt(idParam);
            HistorialMedico h = historialService.buscarHistorial(id);

            if (h == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"mensaje\":\"Historial no encontrado\"}");
                return;
            }

            response.getWriter().write(gson.toJson(h));
            return;
        }

        List<HistorialMedico> historiales = historialService.obtenerHistoriales();
        response.getWriter().write(gson.toJson(historiales));
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
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

 
        HistorialMedico historial = gson.fromJson(request.getReader(), HistorialMedico.class);

        String error = validarHistorial(historial);

        if (error != null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"" + error + "\"}");
            return;
        }

        historialService.crearHistorial(historial);

        response.setContentType("application/json");
        response.getWriter().write("{\"mensaje\":\"Historial guardado\"}");
    }

    // ===============================
    // PUT → actualizar historial
    // ===============================
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        HistorialMedico historial = gson.fromJson(request.getReader(), HistorialMedico.class);

        String error = validarHistorial(historial);

        if (error != null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"" + error + "\"}");
            return;
        }

        historialService.editarHistorial(historial);

        response.setContentType("application/json");
        response.getWriter().write("{\"mensaje\":\"Historial actualizado\"}");
    }

    // ===============================
    // DELETE → eliminar historial
    // ===============================
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        int id = Integer.parseInt(request.getParameter("id"));

        historialService.eliminarHistorial(id);

        response.setContentType("application/json");
        response.getWriter().write("{\"mensaje\":\"Historial eliminado\"}");
    }

    // ===============================
    // VALIDACIÓN
    // ===============================
    private String validarHistorial(HistorialMedico h) {
        if (h == null) {
            return "Historial inválido";
        }
        if (h.getDiagnostico() == null || h.getDiagnostico().trim().length() < 5) {
            return "Diagnóstico mínimo 5 caracteres";
        }
        if (h.getTratamiento() == null || h.getTratamiento().trim().length() < 5) {
            return "Tratamiento mínimo 5 caracteres";
        }
        if (h.getFecha() == null) {
            return "Fecha requerida";
        }
        if (h.getAnimal() == null) {
            return "Debe asociar un animal";
        }
        if (h.getVeterinario() == null) {
            return "Debe asociar un veterinario";
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
