/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Animal;
import com.ues.edu.entidades.Empleado;
import com.ues.edu.entidades.HistorialMedico;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.Date;
import java.util.List;

/**
 *
 * @author coc44
 */

public class HistorialMedicoDao {

    private EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

    // ==========================
    // GUARDAR
    // ==========================
    public void guardar(HistorialMedico historial) {
        EntityManager em = emf.createEntityManager();
      try {
        em.getTransaction().begin();
        Animal animalReal = em.find(Animal.class, historial.getAnimal().getId());
        Empleado veterinarioReal = em.find(Empleado.class, historial.getVeterinario().getId());
        
        // 2. Se los inyectamos al historial (reemplazando los "esqueletos" que venían de JS)
        historial.setAnimal(animalReal);
        historial.setVeterinario(veterinarioReal);
       em.merge(historial);
            
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw e; // Lanzamos el error para que el Servlet lo atrape
        } finally {
            em.close();
        }
    }

    // ==========================
    // ACTUALIZAR
    // ==========================
    public void actualizar(HistorialMedico historial) {
    EntityManager em = emf.createEntityManager();
    try {
        em.getTransaction().begin();
        
        // 1. Igual que en el guardar, rescatamos los objetos reales de la DB
        Animal animalReal = em.find(Animal.class, historial.getAnimal().getId());
        Empleado veterinarioReal = em.find(Empleado.class, historial.getVeterinario().getId());
        
        // 2. Se los inyectamos al historial para que no se pierdan sus datos
        historial.setAnimal(animalReal);
        historial.setVeterinario(veterinarioReal);
        
        // 3. ¡AQUÍ ESTÁ EL CAMBIO! Para editar se usa MERGE, no persist
        em.merge(historial);
        
        em.getTransaction().commit();
    } catch (Exception e) {
        if (em.getTransaction().isActive()) {
            em.getTransaction().rollback();
        }
        throw e;
    } finally {
        em.close();
    }
}

    // ==========================
    // ELIMINAR
    // ==========================
    public void eliminar(int id) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        HistorialMedico h = em.find(HistorialMedico.class, id);
        if (h != null) {
            em.remove(h);
        }

        em.getTransaction().commit();
        em.close();
    }

    // ==========================
    // LISTAR TODOS
    // ==========================
    public List<HistorialMedico> listar() {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery("SELECT h FROM HistorialMedico h", HistorialMedico.class);
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // BUSCAR POR ID
    // ==========================
    public HistorialMedico buscarPorId(int id) {
        EntityManager em = emf.createEntityManager();
        HistorialMedico h = em.find(HistorialMedico.class, id);
        em.close();
        return h;
    }

    // ==========================
    // BUSCAR POR DIAGNÓSTICO
    // ==========================
    public List<HistorialMedico> buscarPorDiagnostico(String diagnostico) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery(
                        "SELECT h FROM HistorialMedico h WHERE LOWER(h.diagnostico) LIKE LOWER(:diagnostico)",
                        HistorialMedico.class
                );
        query.setParameter("diagnostico", "%" + diagnostico + "%");
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // FILTRAR POR FECHA
    // ==========================
    public List<HistorialMedico> filtrarPorFecha(Date fecha) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery(
                        "SELECT h FROM HistorialMedico h WHERE h.fecha = :fecha",
                        HistorialMedico.class
                );
        query.setParameter("fecha", fecha);
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // FILTRAR POR VETERINARIO
    // ==========================
    public List<HistorialMedico> filtrarPorVeterinario(int idVeterinario) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery(
                        "SELECT h FROM HistorialMedico h WHERE h.veterinario.id = :idVeterinario",
                        HistorialMedico.class
                );
        query.setParameter("idVeterinario", idVeterinario);
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // FILTRAR POR ANIMAL
    // ==========================
    public List<HistorialMedico> filtrarPorAnimal(int idAnimal) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery(
                        "SELECT h FROM HistorialMedico h WHERE h.animal.id = :idAnimal",
                        HistorialMedico.class
                );
        query.setParameter("idAnimal", idAnimal);
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // PAGINACIÓN
    // ==========================
    public List<HistorialMedico> listarPaginado(int pagina, int size) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<HistorialMedico> query =
                em.createQuery("SELECT h FROM HistorialMedico h", HistorialMedico.class);
        query.setFirstResult((pagina - 1) * size);
        query.setMaxResults(size);
        List<HistorialMedico> lista = query.getResultList();
        em.close();
        return lista;
    }
}

