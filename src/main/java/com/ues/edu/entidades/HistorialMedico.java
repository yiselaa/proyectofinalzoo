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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author MINED
 */
@Setter
@Getter
@Entity
@Table(name = "historial_medico")
@AllArgsConstructor
@NoArgsConstructor
public class HistorialMedico {   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    @NotBlank
    @Column(name = "diagnostico", nullable = false, length = 70)
    private String diagnostico;
    
    @NotBlank
    @Column(name = "tratamiento", nullable = false, length = 70)
    private String tratamiento;

    @ManyToOne
    @JoinColumn(name = "idAnimal")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "idVeterinario")
    private Empleado veterinario; // Empleado con rol VETERINARIO
}
    
    
