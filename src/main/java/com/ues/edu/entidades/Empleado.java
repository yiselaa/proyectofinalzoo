/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.entidades;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author MINED
 * 
 */

@Setter
@Getter
@Entity
@Table(name = "empleado")
@AllArgsConstructor
@NoArgsConstructor
public class Empleado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
   
    @NotBlank
    @Column(name = "nombre_empleado", nullable = false, length = 70)
    private String nombre;
    
    @NotBlank
    @Column(name = "apellido", nullable = false, length = 70)
    private String apellido;
    
    @NotBlank
    @Pattern(regexp = "^\\d{8}-\\d{1}$", message = "EL DUI DEBE TENER EL FORMATO ########-#")
    @Column(name = "numero_dui", nullable = false, unique = true, length = 10)
    private String dui;
    
    @NotBlank
    @Column(name = "rol", nullable = false, length = 70)
    private String rol; // "ADMIN", "CUIDADOR", "VETERINARIO"

    @OneToOne(mappedBy = "empleado", cascade = CascadeType.ALL)
    private Usuario usuario;

    @ManyToMany(mappedBy = "cuidadores")
    private List<Animal> animalesAsignados; // Solo para Cuidadores
    
}
