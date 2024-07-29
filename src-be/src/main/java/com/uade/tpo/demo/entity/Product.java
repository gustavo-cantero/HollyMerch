package com.uade.tpo.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

/*
 * Entidad para los productos.
 */
@Data
@Entity
public class Product {
    public Product() {
    }

    /*
     * Constructor para la creación de un producto.
     * 
     * @param id Identificador del producto.
     * 
     * @param name Nombre del producto.
     * 
     * @param description Descripción del producto.
     * 
     * @param price Precio del producto.
     * 
     * @param stock Stock del producto.
     * 
     * @param image Imagen del producto.
     * 
     * @param categoryId Identificador de la categoría del producto.
     */
    public Product(long id, String name, String description, double price, int stock, String image, long categoryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.category = new Category(categoryId);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private int stock;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
