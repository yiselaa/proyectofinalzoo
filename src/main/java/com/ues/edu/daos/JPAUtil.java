    /*
     * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
     * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
     */
    package com.ues.edu.daos;

    import jakarta.persistence.EntityManagerFactory;
    import jakarta.persistence.Persistence;

    /**
     *
     * @author MINED
     */
    public class JPAUtil {

        private static final EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("profinalPU");

        static {
            System.out.println("JPAUtil EMF creado: " + emf.hashCode());
        }

        public static EntityManagerFactory getEMF() {
            System.out.println("JPAUtil EMF usado: " + emf.hashCode());
            return emf;
        }

        private JPAUtil() {}
    }

