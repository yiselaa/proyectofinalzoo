/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.daos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;
import java.util.List;


/**
 *
 * @author coc44
 */



public class ConsultaAlimentacionAnimalDao {

    private EntityManagerFactory emf = JPAUtil.getEMF();


    public List<Object[]> buscarFiltro(String filtro) {

        EntityManager em = null;

        try {

            em = emf.createEntityManager();

            String sql =
                    "SELECT " +
                    "a.nombre_animal AS col0, " +
                    "al.tipo_alimento AS col1, " +
                    "al.cantidad AS col2, " +
                    "al.horario AS col3 " +
                    "FROM alimentacion al " +
                    "INNER JOIN animal a ON al.idanimal = a.id " +
                    "WHERE 1=1 ";

            if (filtro != null && !filtro.trim().isEmpty()) {

                sql += " AND (LOWER(a.nombre_animal) LIKE LOWER(:filtro) " +
                       " OR LOWER(al.tipo_alimento) LIKE LOWER(:filtro)) ";
            }

            Query query = em.createNativeQuery(sql);

            if (filtro != null && !filtro.trim().isEmpty()) {

                query.setParameter("filtro", "%" + filtro + "%");
            }

            return query.getResultList();

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }
}