package com.uade.tpo.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity // Como esto se lo paso a la BD via el Repository, lo tengo que declarar como
        // Entitity sino JPA y Hybernate se vuelve loquillo.
public class Category { // Esto representa una TABLE en SQL.

    public Category(String description) {
        this.description = description;
    }

    public Category(long id) {
        this.id = id;
    }

    public Category() {
        // Default Empty Constructor (Otherwise Server will return 500)
    }

    @Id // Esto setea que esta variable es el Primary-Key de la tabla.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Aca le seteo que se auto genere la variable y auto-incremente
                                                        // el ID.
    private long id;

    @Column // Esto setea una columna (obviamente las Row las va a manejar con cada
            // instancia que le pasas)
    private String description;

    // @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    // private List<Product> products;
}
