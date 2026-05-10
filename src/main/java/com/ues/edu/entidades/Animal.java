/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ues.edu.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author yiss
 */
@Setter
@Getter
@Entity
@Table(name = "animal")
@AllArgsConstructor
@NoArgsConstructor

public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank
    @Column(name = "nombre_animal", nullable = false, length = 70)
    private String nombre;
    
    @NotNull
    @Column(name = "edad", nullable = false)
    private Integer edad;
    
    @Temporal(TemporalType.DATE)
    private Date fechaIngreso;

    @ManyToOne
    @JoinColumn(name = "idcategoria")
    private Categoria categoria;

    @ManyToMany
    @JoinTable(
        name = "animal_cuidador",
        joinColumns = @JoinColumn(name = "idAnimal"),
        inverseJoinColumns = @JoinColumn(name = "idEmpleado")
    )
    private List<Empleado> cuidadores;
    
}
    
