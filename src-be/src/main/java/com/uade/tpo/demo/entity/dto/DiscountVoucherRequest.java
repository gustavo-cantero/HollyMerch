package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.entity.DiscountVoucher;

import lombok.Data;

@Data
public class DiscountVoucherRequest {

    private String keyword;
    private int discountPercentage;
    private boolean active;

    public DiscountVoucher toDiscountVoucher(){
        return new DiscountVoucher(keyword, discountPercentage, active);
    }

}
