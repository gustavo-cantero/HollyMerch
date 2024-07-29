package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.entity.OrderDetail;

import lombok.Data;

@Data
public class OrderDetailRequest {
    private Long orderId;
    private Long productId;
    private String productName;
    private Long count;
    private Double price;

    public OrderDetail toOrderDetail(){
        return new OrderDetail(null, productId, productName,
        count, price);
    }
}
