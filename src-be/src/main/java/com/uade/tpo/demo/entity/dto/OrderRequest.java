package com.uade.tpo.demo.entity.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.OrderDetail;

import lombok.Data;

@Data
public class OrderRequest {
    private Long itemsQty;
    private double total;
    private Long userId;
    private String discountKeyword;
    private List<OrderDetailRequest> orderDetails;

    public Order toOrder(){
        Order order = new Order();
        order.setItemsQty(itemsQty);
        order.setTotal(total);
        order.setDiscount(discountKeyword);

        List<OrderDetail> orderDetailEntities = orderDetails.stream()
                .map(orderDetailRequest -> {
                    OrderDetail orderDetail = orderDetailRequest.toOrderDetail();
                    orderDetail.setOrder(order);
                    return orderDetail;
                })
                .collect(Collectors.toList());

        order.setOrderDetails(orderDetailEntities);

        return order;
    }
}
