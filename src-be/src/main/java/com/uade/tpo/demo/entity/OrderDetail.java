package com.uade.tpo.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class OrderDetail {
    public OrderDetail() {
    }

    public OrderDetail(Order _order, Long _productId, String _productName, Long _count, Double _price){
        this.order = _order;
        this.productId = _productId;
        this.productName = _productName;
        this.count = _count;
        this.price = _price;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference
    private Order order;

    @Column
    private Long productId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column
    private Long count;

    @Column
    private Double price;
}
