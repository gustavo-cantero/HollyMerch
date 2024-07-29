package com.uade.tpo.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class DiscountVoucher {

    public DiscountVoucher(){
        
    }

    public DiscountVoucher(String keyword, int discountPercentage, boolean active) {
        this.keyword = keyword;
        this.discountPercentage = discountPercentage;
        this.active = active;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String keyword;

    @Column
    private int discountPercentage;

    @Column
    private boolean active;

}
