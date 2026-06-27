/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Habitat;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import java.util.List;

/**
 *
 * @author coc44
 */

public class HabitatDao {

    private EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

    public void guardar(Habitat habitat) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(habitat);
        em.getTransaction().commit();
        em.close();
    }

    public void actualizar(Habitat habitat) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Habitat existente = em.find(Habitat.class, habitat.getId());
        if (existente != null) {
            existente.setTipoTerreno(habitat.getTipoTerreno());
            existente.setCapacidad(habitat.getCapacidad());
            
        }

        em.getTransaction().commit();
        em.close();
    }

    public void eliminar(long id) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Habitat h = em.find(Habitat.class, id);
        if (h != null) {
            em.remove(h);
        }

        em.getTransaction().commit();
        em.close();
    }

    public List<Habitat> listar() {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Habitat> query =
                em.createQuery("SELECT h FROM Habitat h", Habitat.class);
        List<Habitat> lista = query.getResultList();
        em.close();
        return lista;
    }

    public Habitat buscarPorId(long id) {
        EntityManager em = emf.createEntityManager();
        Habitat h = em.find(Habitat.class, id);
        em.close();
        return h;
    }

    public List<Habitat> buscarPorTipoTerreno(String tipoTerreno) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Habitat> query =
                em.createQuery(
                        "SELECT h FROM Habitat h WHERE LOWER(h.tipoTerreno) LIKE LOWER(:tipo)",
                        Habitat.class
                );
        query.setParameter("tipo", "%" + tipoTerreno + "%");
        List<Habitat> lista = query.getResultList();
        em.close();
        return lista;
    }

    public List<Habitat> filtrarPorCapacidadMinima(int capacidad) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Habitat> query =
                em.createQuery(
                        "SELECT h FROM Habitat h WHERE h.capacidad >= :capacidad",
                        Habitat.class
                );
        query.setParameter("capacidad", capacidad);
        List<Habitat> lista = query.getResultList();
        em.close();
        return lista;
    }

    public List<Habitat> listarPaginado(int pagina, int size) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Habitat> query =
                em.createQuery("SELECT h FROM Habitat h", Habitat.class);
        query.setFirstResult((pagina - 1) * size);
        query.setMaxResults(size);
        List<Habitat> lista = query.getResultList();
        em.close();
        return lista;
    }
}