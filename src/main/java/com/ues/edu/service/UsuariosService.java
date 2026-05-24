/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.UsuarioDao;
import com.ues.edu.entidades.Usuario;
import java.util.List;

/**
 *
 * @author MINED
 */
public class UsuariosService {
    
    UsuarioDao dao = new UsuarioDao();
    
    public List<Usuario> mostrarUsuarios(){
         return dao.listar();
          }
    
    public Usuario buscarUsuario(Long id) {
        return dao.buscarPorId(id);
    }
            
     public void crearUsuario(Usuario u) {
        dao.guardar(u);
    }
     
}
