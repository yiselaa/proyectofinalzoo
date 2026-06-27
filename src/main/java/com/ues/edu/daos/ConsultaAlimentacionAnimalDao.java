package com.ues.edu.daos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;
import java.util.List;

/**
 * @author coc44
 */
public class ConsultaAlimentacionAnimalDao {

    private EntityManagerFactory emf = JPAUtil.getEMF();

    public List<Object[]> buscarFiltro(String filtro) {

        EntityManager em = null;

        try {
            em = emf.createEntityManager();

            String sql
                    = "SELECT "
                    + "a.especie AS col0, "
                    + "al.tipo_alimento AS col1, "
                    + "al.cantidad AS col2, "
                    + "al.horario AS col3, "
                    + "CONCAT(COALESCE(c.nombre_empleado, 'Sin Cuidador'), ' ', COALESCE(c.apellido, '')) AS col4 " // 👈 Corregido a c.apellido
                    + "FROM alimentacion al "
                    + "LEFT JOIN animal a ON al.idanimal = a.id "
                    + "LEFT JOIN empleado c ON al.idcuidador = c.id " // 👈 Ya funcionará cuando crees la columna
                    + "WHERE 1=1 ";

            // Corregido por completo para usar los nombres reales de Postgres
            if (filtro != null && !filtro.trim().isEmpty() && !filtro.equalsIgnoreCase("null")) {
                sql += " AND (LOWER(a.especie) LIKE LOWER(:filtro) "
                        + " OR LOWER(al.tipo_alimento) LIKE LOWER(:filtro) "
                        + " OR LOWER(c.nombre_empleado) LIKE LOWER(:filtro) "
                        + " OR LOWER(c.apellido_empleado) LIKE LOWER(:filtro)) "; // 🌟 CORREGIDO: c.apellido_empleado
            }

            Query query = em.createNativeQuery(sql);

            if (filtro != null && !filtro.trim().isEmpty() && !filtro.equalsIgnoreCase("null")) {
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
