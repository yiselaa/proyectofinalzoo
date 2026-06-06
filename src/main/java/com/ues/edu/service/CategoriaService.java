/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.CategoriaDao;
import com.ues.edu.entidades.Categoria;
import java.util.List;

/**
 *
 * @author coc44
 */
public class CategoriaService {
    
 private CategoriaDao dao = new CategoriaDao();

    // 🔥 CREAR
    public void crearCategoria(Categoria c) {

        dao.guardar(c);
    }

    // 🔥 ACTUALIZAR
    public void editarCategoria(Categoria c) {

        dao.actualizar(c);
    }

    // 🔥 ELIMINAR
    public void eliminarCategoria(long id) {

        dao.eliminar(id);
    }

    // 🔥 LISTAR TODOS
    public List<Categoria> obtenerCategorias() {

        return dao.listar();
    }

    // 🔥 BUSCAR POR ID
    public Categoria buscarCategoria(long id) {

        return dao.buscarPorId(id);
    }
}
