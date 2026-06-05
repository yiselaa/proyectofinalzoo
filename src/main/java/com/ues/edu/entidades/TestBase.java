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
    Categoria cat = new Categoria();
    cat.setNombre("Felinos");
    cat.setDescripcion("Animales con garras");
    
    try {
        em.getTransaction().begin();
        em.persist(cat);
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
    
