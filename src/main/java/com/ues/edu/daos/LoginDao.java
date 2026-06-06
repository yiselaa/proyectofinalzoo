/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;

/**
 *
 * @author MINED
 */
public class LoginDao {

    private EntityManagerFactory emf = JPAUtil.getEMF();

    public Usuario buscarPorNombre(String nombreUsuario) {

        EntityManager em = emf.createEntityManager();

        try {

            TypedQuery<Usuario> query
                    = em.createQuery(
                            "SELECT u FROM Usuario u "
                            + "WHERE u.nombreUsuario = :nombre",
                            Usuario.class
                    );

            query.setParameter("nombre", nombreUsuario);

            return query.getSingleResult();

        } catch (Exception e) {

            return null;

        } finally {

            em.close();
        }
    }
}
