/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Animal;
import jakarta.persistence.EntityManager;
import com.ues.edu.entidades.Categoria;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;
import java.util.List;

/**
 *
 * @author coc44
 */
public class AnimalDao {
    
private EntityManagerFactory emf = JPAUtil.getEMF();


    // ==========================
    // GUARDAR
    // ==========================
    public void guardar(Animal animal) {

    EntityManager em = emf.createEntityManager();

    em.getTransaction().begin();

    // 🔥 RE-ATTACH de categoría
    if (animal.getCategoria() != null
            && animal.getCategoria().getId() != null) {

        animal.setCategoria(
                em.find(Categoria.class,
                        animal.getCategoria().getId())
        );
    }

    em.persist(animal);

    em.getTransaction().commit();

    em.close();
}

    // ==========================
    // ACTUALIZAR
    // ==========================
 public void actualizar(Animal animal) {

    EntityManager em = emf.createEntityManager();

    em.getTransaction().begin();

    if (animal.getCategoria() != null
            && animal.getCategoria().getId() != null) {

        animal.setCategoria(
                em.find(Categoria.class,
                        animal.getCategoria().getId())
        );
    }

    em.merge(animal);

    em.getTransaction().commit();

    em.close();
}

    // ==========================
    // ELIMINAR
    // ==========================
    public void eliminar(int id) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        Animal a = em.find(Animal.class, id);
        if (a != null) {
            em.remove(a);
        }
        em.getTransaction().commit();
        em.close();
    }

    // ==========================
    // LISTAR TODOS (con categoría)
    // ==========================
    public List<Animal> listar() {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Animal> query =
                em.createQuery("SELECT a FROM Animal a JOIN FETCH a.categoria", Animal.class);
        List<Animal> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // BUSCAR POR ID (con categoría)
    // ==========================
    public Animal buscarPorId(int id) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Animal> query =
                em.createQuery("SELECT a FROM Animal a JOIN FETCH a.categoria WHERE a.id = :id", Animal.class);
        query.setParameter("id", id);
        Animal a = null;
        try {
            a = query.getSingleResult();
        } catch (Exception e) {
            // si no existe, devuelve null
        }
        em.close();
        return a;
    }

    // ==========================
    // BUSCAR POR NOMBRE (con categoría)
    // ==========================
    public List<Animal> buscarPorNombre(String nombre) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Animal> query =
                em.createQuery(
                        "SELECT a FROM Animal a JOIN FETCH a.categoria WHERE LOWER(a.nombre) LIKE LOWER(:nombre)",
                        Animal.class
                );
        query.setParameter("nombre", "%" + nombre + "%");
        List<Animal> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // FILTRAR POR CATEGORÍA
    // ==========================
    public List<Animal> filtrarPorCategoria(int idCategoria) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Animal> query =
                em.createQuery(
                        "SELECT a FROM Animal a JOIN FETCH a.categoria WHERE a.categoria.id = :idCategoria",
                        Animal.class
                );
        query.setParameter("idCategoria", idCategoria);
        List<Animal> lista = query.getResultList();
        em.close();
        return lista;
    }

    // ==========================
    // PAGINACIÓN (con categoría)
    // ==========================
    public List<Animal> listarPaginado(int pagina, int size) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Animal> query =
                em.createQuery("SELECT a FROM Animal a JOIN FETCH a.categoria", Animal.class);
        query.setFirstResult((pagina - 1) * size);
        query.setMaxResults(size);
        List<Animal> lista = query.getResultList();
        em.close();
        return lista;
    }
}
