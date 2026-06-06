/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.LoginDao;
import com.ues.edu.entidades.Usuario;
import com.ues.edu.modelo.EncriptarContrasenia;

/**
 *
 * @author MINED
 */
public class LoginService {
    
    LoginDao dao= new LoginDao();

    public Usuario login(String nombreUsuario, String password) {

        Usuario usuario
                = dao.buscarPorNombre(nombreUsuario);

        if (usuario == null) {
            return null;
        }

        EncriptarContrasenia enc
                = new EncriptarContrasenia();

        String passEncriptada
                = enc.contraseniaencriptar(password);

        if (usuario.getContrasena()
                .equals(passEncriptada)) {

            return usuario;
        }

        return null;
    }

}
