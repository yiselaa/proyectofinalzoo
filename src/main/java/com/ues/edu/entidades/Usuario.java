package com.ues.edu.entidades;

import com.google.gson.annotations.Expose;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @Expose
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Expose
    @Column(name = "nombre_usuario", unique = true, nullable = false, length = 70)
    private String nombreUsuario;

    @NotBlank
    @Expose
    @Column(name = "contrasena", nullable = false, length = 70)
    private String contrasena;

    @ManyToOne // o @OneToOne según tu modelo físico
    @JoinColumn(name = "id_empleado")
    @Expose // 🌟 CLAVE: Permite mapear el objeto empleado asignado
    private Empleado empleado;
}
