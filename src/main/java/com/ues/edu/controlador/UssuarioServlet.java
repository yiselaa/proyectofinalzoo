/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ues.edu.controlador;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ues.edu.entidades.Usuario;
import com.ues.edu.service.UsuariosService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author MINED
 */
@WebServlet(name = "UssuarioServlet", urlPatterns = {"/UssuarioServlet"})
public class UssuarioServlet extends HttpServlet {

    UsuariosService usuarioService = new UsuariosService();

   Gson gson = new GsonBuilder().setPrettyPrinting().create();

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
            out.println("<title>Servlet UssuarioServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UssuarioServlet at " + request.getContextPath() + "</h1>");
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

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String idParam = request.getParameter("id");

        // BUSCAR POR ID
        if (idParam != null && !idParam.isEmpty()) {

            long id = Long.parseLong(idParam);

            Usuario usuario = usuarioService.buscarUsuario(id);

            if (usuario == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"mensaje\":\"Usuario no encontrado\"}");
                return;
            }

            response.getWriter().write(gson.toJson(usuario));
            return;
        }

        // LISTAR TODOS
        List<Usuario> usuarios = usuarioService.mostrarUsuarios();

        response.getWriter().write(gson.toJson(usuarios));
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

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        Usuario usuario = gson.fromJson(request.getReader(), Usuario.class);

        usuarioService.crearUsuario(usuario);

        response.getWriter().write(gson.toJson(
                java.util.Map.of("mensaje", "Usuario guardado")
        ));
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

    public static boolean validarContraseña(String contraseñaPlana, String contraseñaEncriptada) {
        return BCrypt.checkpw(contraseñaPlana, contraseñaEncriptada);
    }

}
