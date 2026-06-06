package com.ues.edu.daos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;
import java.util.List;

public class ConsultaAnimalCategoriaDao {

    private EntityManagerFactory emf = JPAUtil.getEMF();


   public List<Object[]> buscarFiltro(String filtro) {

    EntityManager em = null;

    try {
        em = emf.createEntityManager();

        String sql =
                "SELECT " +
                "a.id AS col0, " +
                "a.nombre_animal AS col1, " +
                "TO_CHAR(a.fechaingreso, 'YYYY-MM-DD') AS col2, " +
                "TO_CHAR(a.fecha_nacimiento, 'YYYY-MM-DD') AS col3, " +
                "CAST(EXTRACT(YEAR FROM AGE(a.fecha_nacimiento)) AS INTEGER) AS col4, " +
                "c.nombre_categoria AS col5, " +
                "c.descripcion AS col6 " +
                "FROM animal a " +
                "INNER JOIN categoria c ON a.idcategoria = c.id " +
                "WHERE 1=1 ";

        if (filtro != null && !filtro.trim().isEmpty()) {
            sql += " AND (LOWER(a.nombre_animal) LIKE LOWER(:filtro) " +
                   " OR LOWER(c.nombre_categoria) LIKE LOWER(:filtro)) ";
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