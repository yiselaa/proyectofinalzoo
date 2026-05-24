/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Empleado;
import com.ues.edu.entidades.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import java.util.List;

/**
 *
 * @author MINED
 */
public class UsuarioDao {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("profinalPU");

    public List<Usuario> listar() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Usuario> query
                = em.createQuery(
                        "SELECT u FROM Usuario u",
                        Usuario.class
                );

        List<Usuario> lista = query.getResultList();

        em.close();

        return lista;
    }

    public Usuario buscarPorId(long id) {

        EntityManager em = emf.createEntityManager();

        Usuario e = em.find(Usuario.class, id);

        em.close();

        return e;
    }
    
    public void guardar(Usuario usuario) {

    EntityManager em = emf.createEntityManager();

    em.getTransaction().begin();

    try {

        if (usuario.getEmpleado() != null &&
            usuario.getEmpleado().getId() != null) {

            Empleado emp = em.find(
                Empleado.class,
                usuario.getEmpleado().getId()
            );

            usuario.setEmpleado(emp);
        }

        em.persist(usuario);

        em.getTransaction().commit();

    } catch (Exception e) {
        em.getTransaction().rollback();
        e.printStackTrace();
    } finally {
        em.close();
    }
}

}
