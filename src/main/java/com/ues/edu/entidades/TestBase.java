package com.ues.edu.entidades;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class TestBase {

    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("profinalPU");
        EntityManager em = emf.createEntityManager();

        try {

            em.getTransaction().begin();

            // Crear empleados
            Empleado e1 = new Empleado();
            e1.setNombre("Juan");
            e1.setApellido("Pérez");
            e1.setDui("12345678-9");
            e1.setRol("Cuidador");

            Empleado e2 = new Empleado();
            e2.setNombre("María");
            e2.setApellido("López");
            e2.setDui("98765432-1");
            e2.setRol("Cuidador");

            em.persist(e1);
            em.persist(e2);

            // Crear hábitat
            Habitat habitat = new Habitat();
            habitat.setTipoTerreno("Selva");
            habitat.setCapacidad(20);

            List<Empleado> cuidadores = new ArrayList<>();
            cuidadores.add(e1);
            cuidadores.add(e2);

            habitat.setCuidadores(cuidadores);

            em.persist(habitat);

            em.getTransaction().commit();

            System.out.println("Datos guardados correctamente");

        } catch (Exception e) {

            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }

            e.printStackTrace();

        } finally {

            em.close();
            emf.close();
        }
    }
}