package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.entity.Product;

import lombok.Data;

/*
 * DTO para la creación de un producto.
 */
@Data
public class ProductRequest {
    private long id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String image;
    private long categoryId;
    private String userName;

    public Product toProduct() {
        return new Product(id, name, description, price, stock, image, categoryId);
    }
}
