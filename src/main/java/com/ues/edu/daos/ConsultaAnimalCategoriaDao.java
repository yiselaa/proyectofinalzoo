package com.ues.edu.daos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.Query;
import java.util.List;

public class ConsultaAnimalCategoriaDao {

    private EntityManagerFactory emf
            = Persistence.createEntityManagerFactory("proyectofinalPU");

public List<Object[]> getAnimalesPorNombre(String filtro) {

    EntityManager em = null;

    try {

        em = emf.createEntityManager();

        String sql = "SELECT a.id, a.nombre_animal, a.edad, c.nombre_categoria "
                + "FROM animal a "
                + "INNER JOIN categoria c ON a.idcategoria = c.id ";

        if (filtro != null && !filtro.trim().isEmpty()) {
            sql += "WHERE a.nombre_animal LIKE :filtro";
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