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
import jakarta.validation.constraints.NotNull;
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
@Table(name = "detalle_visita")
@AllArgsConstructor
@NoArgsConstructor
public class DetalleVisita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @NotNull
    @Column(name = "subtotal", nullable = false)
    private double subtotal; // Se calcula como cantidad * ticket.precio

    @ManyToOne
    @JoinColumn(name = "idvisita")
    private Visita visita;

    @ManyToOne
    @JoinColumn(name = "idticket")
    private Ticket ticket;

    
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
        if (this.ticket != null) {
            this.subtotal = this.cantidad * this.ticket.getPrecio();
        }
    }

}
