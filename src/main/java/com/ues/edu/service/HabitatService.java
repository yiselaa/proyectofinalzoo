/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.service;

import com.ues.edu.daos.HabitatDao;
import com.ues.edu.entidades.Habitat;
import java.util.List;

/**
 *
 * @author MINED
 */
public class HabitatService {
    
    private HabitatDao dao = new HabitatDao();

    // CREAR
    public void crearHabitat(Habitat h) {
        dao.guardar(h);
    }

    public void editarHabitat(Habitat h) {
        dao.actualizar(h);
    }

    public void eliminarHabitat(long id) {
        dao.eliminar(id);
    }

    public List<Habitat> obtenerHabitats() {
        return dao.listar();
    }

    public Habitat buscarHabitat(long id) {
        return dao.buscarPorId(id);
    }

    public List<Habitat> buscarPorTipoTerreno(String tipoTerreno) {
        return dao.buscarPorTipoTerreno(tipoTerreno);
    }

    public List<Habitat> filtrarPorCapacidadMinima(int capacidad) {
        return dao.filtrarPorCapacidadMinima(capacidad);
    }

    public List<Habitat> listarPaginado(int pagina, int size) {
        return dao.listarPaginado(pagina, size);
    }
}
