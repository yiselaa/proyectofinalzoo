/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.EmpleadoDao;
import com.ues.edu.entidades.Empleado;
import java.util.List;

/**
 *
 * @author MINED
 */
public class EmpleadosService {
    
   private EmpleadoDao dao = new EmpleadoDao();

    // CREAR
    public void crearEmpleado(Empleado e) {

    if (dao.existeDui(e.getDui())) {
        throw new RuntimeException("Ya existe un empleado con ese DUI");
    }

    dao.guardar(e);
}

    // ACTUALIZAR
    public void editarEmpleado(Empleado e) {
        dao.actualizar(e);
    }

    // ELIMINAR
    public void eliminarEmpleado(int id) {
        dao.eliminar(id);
    }

    // LISTAR TODOS
    public List<Empleado> obtenerEmpleados() {
        return dao.listar();
    }

    // BUSCAR POR ID
    public Empleado buscarEmpleado(int id) {
        return dao.buscarPorId(id);
    }
}