/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Categoria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import java.util.List;

/**
 *
 * @author coc44
 */

public class CategoriaDao {

    private EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

    // ==========================
    // GUARDAR
    // ==========================
    public void guardar(Categoria categoria) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        em.persist(categoria);

        em.getTransaction().commit();

        em.close();
    }

    // ==========================
    // ACTUALIZAR
    // ==========================
    public void actualizar(Categoria categoria) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Categoria existente = em.find(Categoria.class, categoria.getId());

        if (existente != null) {

            existente.setNombre(categoria.getNombre());

            existente.setDescripcion(categoria.getDescripcion());
        }

        em.getTransaction().commit();

        em.close();
    }

    // ==========================
    // ELIMINAR
    // ==========================
    public void eliminar(long id) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Categoria c = em.find(Categoria.class, id);

        if (c != null) {

            em.remove(c);
        }

        em.getTransaction().commit();

        em.close();
    }

    // ==========================
    // LISTAR
    // ==========================
    public List<Categoria> listar() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Categoria> query =
                em.createQuery(
                        "SELECT c FROM Categoria c",
                        Categoria.class
                );

        List<Categoria> lista = query.getResultList();

        em.close();

        return lista;
    }

    // ==========================
    // BUSCAR POR ID
    // ==========================
    public Categoria buscarPorId(long id) {

        EntityManager em = emf.createEntityManager();

        Categoria c = em.find(Categoria.class, id);

        em.close();

        return c;
    }

    // ==========================
    // BUSCAR POR NOMBRE
    // ==========================
    public List<Categoria> buscarPorNombre(String nombre) {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Categoria> query =
                em.createQuery(
                        "SELECT c FROM Categoria c "
                        + "WHERE LOWER(c.nombre) LIKE LOWER(:nombre)",
                        Categoria.class
                );

        query.setParameter("nombre", "%" + nombre + "%");

        List<Categoria> lista = query.getResultList();

        em.close();

        return lista;
    }
}
