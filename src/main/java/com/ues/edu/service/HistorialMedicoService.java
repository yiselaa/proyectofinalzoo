/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.HistorialMedicoDao;
import com.ues.edu.entidades.HistorialMedico;
import java.util.List;

/**
 *
 * @author coc44
 */
    
    public class HistorialMedicoService {

    private HistorialMedicoDao dao = new HistorialMedicoDao();

    // 🔥 CREAR
    public void crearHistorial(HistorialMedico h) {
        dao.guardar(h);
    }

    // 🔥 ACTUALIZAR
    public void editarHistorial(HistorialMedico h) {
        dao.actualizar(h);
    }

    // 🔥 ELIMINAR
    public void eliminarHistorial(int id) {
        dao.eliminar(id);
    }

    // 🔥 LISTAR TODOS
    public List<HistorialMedico> obtenerHistoriales() {
        return dao.listar();
    }

    // 🔥 BUSCAR POR ID
    public HistorialMedico buscarHistorial(int id) {
        return dao.buscarPorId(id);
    }

    // 🔥 BUSCAR POR DIAGNÓSTICO
    public List<HistorialMedico> buscarPorDiagnostico(String diagnostico) {
        return dao.buscarPorDiagnostico(diagnostico);
    }

    // 🔥 FILTRAR POR FECHA
    public List<HistorialMedico> filtrarPorFecha(java.util.Date fecha) {
        return dao.filtrarPorFecha(fecha);
    }

    // 🔥 FILTRAR POR VETERINARIO
    public List<HistorialMedico> filtrarPorVeterinario(int idVeterinario) {
        return dao.filtrarPorVeterinario(idVeterinario);
    }

    // 🔥 FILTRAR POR ANIMAL
    public List<HistorialMedico> filtrarPorAnimal(int idAnimal) {
        return dao.filtrarPorAnimal(idAnimal);
    }

    // 🔥 PAGINACIÓN
    public List<HistorialMedico> listarPaginado(int pagina, int size) {
        return dao.listarPaginado(pagina, size);
    }
}
    

