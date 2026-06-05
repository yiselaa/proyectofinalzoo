/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import com.ues.edu.entidades.Alimentacion;
import com.ues.edu.entidades.Animal;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import java.util.List;
/**
 *
 * @author coc44
 */
public class AlimentacionDao {

    private EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

    // ==========================
    // GUARDAR
    // ==========================
    public void guardar(Alimentacion alimentacion) {

        EntityManager em = emf.createEntityManager();

        try {

            em.getTransaction().begin();

            // 🔥 BUSCAR EL ANIMAL REAL EN LA BD
            Animal animal = em.find(
                    Animal.class,
                    alimentacion.getAnimal().getId()
            );

            // 🔥 ASIGNAR EL ANIMAL ADMINISTRADO
            alimentacion.setAnimal(animal);

            em.persist(alimentacion);

            em.getTransaction().commit();

        } catch (Exception e) {

            em.getTransaction().rollback();

            e.printStackTrace();

        } finally {

            em.close();
        }
    }

    // ==========================
    // ACTUALIZAR
    // ==========================
    public void actualizar(Alimentacion alimentacion) {

        EntityManager em = emf.createEntityManager();

        try {

            em.getTransaction().begin();

            Alimentacion existente =
                    em.find(Alimentacion.class,
                            alimentacion.getId());

            if (existente != null) {

                Animal animal = em.find(
                        Animal.class,
                        alimentacion.getAnimal().getId()
                );

                existente.setTipoAlimento(
                        alimentacion.getTipoAlimento());

                existente.setHorario(
                        alimentacion.getHorario());

                existente.setCantidad(
                        alimentacion.getCantidad());

                existente.setAnimal(animal);
            }

            em.getTransaction().commit();

        } catch (Exception e) {

            em.getTransaction().rollback();

            e.printStackTrace();

        } finally {

            em.close();
        }
    }

    // ==========================
    // ELIMINAR
    // ==========================
    public void eliminar(int id) {

        EntityManager em = emf.createEntityManager();

        try {

            em.getTransaction().begin();

            Alimentacion a =
                    em.find(Alimentacion.class, id);

            if (a != null) {
                em.remove(a);
            }

            em.getTransaction().commit();

        } catch (Exception e) {

            em.getTransaction().rollback();

            e.printStackTrace();

        } finally {

            em.close();
        }
    }

    // ==========================
    // LISTAR TODOS
    // ==========================
    public List<Alimentacion> listar() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Alimentacion> query =
                em.createQuery(
                        "SELECT a FROM Alimentacion a",
                        Alimentacion.class
                );

        List<Alimentacion> lista =
                query.getResultList();

        em.close();

        return lista;
    }

    // ==========================
    // BUSCAR POR ID
    // ==========================
    public Alimentacion buscarPorId(int id) {

        EntityManager em = emf.createEntityManager();

        Alimentacion a =
                em.find(Alimentacion.class, id);

        em.close();

        return a;
    }
}