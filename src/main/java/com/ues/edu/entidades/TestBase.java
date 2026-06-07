/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.ues.edu.entidades;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

/**
 *
 * @author MINED
 */
public class TestBase {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
 
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("profinalPU");
    EntityManager em = emf.createEntityManager();
    
    // 2. Prueba rápida: Crear una categoría
    Habitat h = new Habitat();
    h.setTipoTerreno("Selva");
    h.setCapacidad(20);
   
    
    try {
        em.getTransaction().begin();
        em.persist(h);
        em.getTransaction().commit();
        System.out.println("¡Base de datos y tablas creadas exitosamente!");
    } catch (Exception e) {
        System.err.println("Error al crear la base: " + e.getMessage());
    } finally {
        em.close();
        emf.close();
    }
}
    }
    
