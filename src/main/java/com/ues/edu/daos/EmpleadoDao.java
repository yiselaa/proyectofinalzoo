package com.ues.edu.daos;

import com.ues.edu.entidades.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import java.util.List;

public class EmpleadoDao {

    private EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

    
    public void guardar(Empleado empleado) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        em.persist(empleado);

        em.getTransaction().commit();

        em.close();
    }

  
public void actualizar(Empleado empleado) {

    EntityManager em = emf.createEntityManager();

    em.getTransaction().begin();

    Empleado existente = em.find(Empleado.class, empleado.getId());

    if (existente != null) {
        existente.setNombre(empleado.getNombre());
        existente.setApellido(empleado.getApellido());
        existente.setDui(empleado.getDui());
        existente.setRol(empleado.getRol());
        // ✅ NO tocamos historiales, usuario ni animalesAsignados
    }

    em.getTransaction().commit();

    em.close();
}

  
    public void eliminar(long id) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Empleado e = em.find(Empleado.class, id);

        if (e != null) {
            em.remove(e);
        }

        em.getTransaction().commit();

        em.close();
    }

    public List<Empleado> listar() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Empleado> query =
                em.createQuery(
                        "SELECT e FROM Empleado e",
                        Empleado.class
                );

        List<Empleado> lista = query.getResultList();

        em.close();

        return lista;
    }

    public Empleado buscarPorId(long id) {

        EntityManager em = emf.createEntityManager();

        Empleado e = em.find(Empleado.class, id);

        em.close();

        return e;
    }

  
    public List<Empleado> buscarPorNombre(String nombre) {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Empleado> query =
                em.createQuery(
                        "SELECT e FROM Empleado e "
                        + "WHERE LOWER(e.nombre) LIKE LOWER(:nombre)",
                        Empleado.class
                );

        query.setParameter("nombre", "%" + nombre + "%");

        List<Empleado> lista = query.getResultList();

        em.close();

        return lista;
    }

  
    public List<Empleado> filtrarPorRol(String rol) {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Empleado> query =
                em.createQuery(
                        "SELECT e FROM Empleado e "
                        + "WHERE e.rol = :rol",
                        Empleado.class
                );

        query.setParameter("rol", rol);

        List<Empleado> lista = query.getResultList();

        em.close();

        return lista;
    }

   
    public List<Empleado> listarPaginado(int pagina, int size) {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Empleado> query =
                em.createQuery(
                        "SELECT e FROM Empleado e",
                        Empleado.class
                );

        query.setFirstResult((pagina - 1) * size);

        query.setMaxResults(size);

        List<Empleado> lista = query.getResultList();

        em.close();

        return lista;
    }

}