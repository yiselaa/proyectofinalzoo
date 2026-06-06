package com.ues.edu.daos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;
import java.util.List;

public class ConsultaAnimalCuidadorDao {

    private EntityManagerFactory emf = JPAUtil.getEMF();


    public List<Object[]> buscarFiltro(String filtro) {

        EntityManager em = null;

        try {
            em = emf.createEntityManager();

            String sql =
                    "SELECT " +
                    "a.nombre_animal AS col0, " +
                    "e.nombre_empleado AS col1, " +
                    "e.apellido AS col2, " +
                    "e.numero_dui AS col3 " +
                    "FROM animal_cuidador ac " +
                    "INNER JOIN animal a ON ac.idanimal = a.id " +
                    "INNER JOIN empleado e ON ac.idempleado = e.id " +
                    "WHERE 1=1 ";

            if (filtro != null && !filtro.trim().isEmpty()) {
                sql += " AND (LOWER(a.nombre_animal) LIKE LOWER(:filtro) " +
                       " OR LOWER(e.nombre_empleado) LIKE LOWER(:filtro) " +
                       " OR LOWER(e.apellido) LIKE LOWER(:filtro) " +
                       " OR LOWER(e.numero_dui) LIKE LOWER(:filtro)) ";
            }

            Query query = em.createNativeQuery(sql);

            if (filtro != null && !filtro.trim().isEmpty()) {
                query.setParameter("filtro", "%" + filtro + "%");
            }

            return query.getResultList();

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }
}