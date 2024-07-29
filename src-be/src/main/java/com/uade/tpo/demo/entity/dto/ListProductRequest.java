package com.uade.tpo.demo.entity.dto;

import lombok.Data;

/*
 * DTO para la búsqueda de productos.
 */
@Data
public class ListProductRequest {
    private Integer id;
    private Integer categoryId;
    private String name;
    private String description;
    private Double priceFrom;
    private Double priceTo;
    private Boolean withStock;
}
