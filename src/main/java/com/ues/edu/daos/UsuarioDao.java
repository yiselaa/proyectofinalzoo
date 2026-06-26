/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Empleado;
import com.ues.edu.entidades.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;
import java.util.List;

/**
 *
 * @author MINED
 */
public class UsuarioDao {

private EntityManagerFactory emf = JPAUtil.getEMF();

    public List<Usuario> listar() {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Usuario> query = em.createQuery("SELECT u FROM Usuario u", Usuario.class);
        List<Usuario> lista = query.getResultList();
        em.close();
        return lista;
    }

    // â† SOLO este, borra el de long
    public Usuario buscarPorId(int id) {
        EntityManager em = emf.createEntityManager();
        Usuario u = em.find(Usuario.class, id);
        em.close();
        return u;
    }

    
    public void guardar(Usuario usuario) {
    EntityManager em = emf.createEntityManager();
    em.getTransaction().begin();
    try {
        // 🌟 IMPRIMIR PARA DEPURAR (Verifica qué está llegando a NetBeans)
        if (usuario.getEmpleado() != null) {
            System.out.println("ID del Empleado recibido en el DAO: " + usuario.getEmpleado().getId());
        } else {
            System.out.println("El objeto Empleado llegó completamente NULL al DAO");
        }

        // 🌟 CONDICIÓN CORREGIDA: Asegurar que el ID sea válido (mayor a cero)
        if (usuario.getEmpleado() != null && usuario.getEmpleado().getId() != null && usuario.getEmpleado().getId() > 0) {
            Empleado emp = em.find(Empleado.class, usuario.getEmpleado().getId());
            
            if (emp != null) {
                usuario.setEmpleado(emp); // Le inyectamos el empleado real recuperado de la BD
            } else {
                throw new RuntimeException("El ID de empleado " + usuario.getEmpleado().getId() + " no existe en la BD.");
            }
        } else {
            throw new RuntimeException("No se puede guardar el usuario porque no contiene un ID de Empleado válido.");
        }

        em.persist(usuario);
        em.getTransaction().commit();
    } catch (Exception e) {
        em.getTransaction().rollback();
        throw new RuntimeException("Error al guardar usuario", e);
    } finally {
        em.close();
    }
}
    
    public void actualizar(Usuario usuario) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        try {
            if (usuario.getEmpleado() != null && usuario.getEmpleado().getId() != null) {
                Empleado emp = em.find(Empleado.class, usuario.getEmpleado().getId());
                usuario.setEmpleado(emp);
            }
            em.merge(usuario);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

   public void eliminar(int id) {
    EntityManager em = emf.createEntityManager();
    try {
        em.getTransaction().begin();
        
        em.createNativeQuery("DELETE FROM usuario WHERE id = :id")
          .setParameter("id", id)
          .executeUpdate();
        
        em.getTransaction().commit();
        
    } catch (Exception e) {
        em.getTransaction().rollback();
        throw new RuntimeException("Error al eliminar", e);
    } finally {
        em.close();
    }
}
}