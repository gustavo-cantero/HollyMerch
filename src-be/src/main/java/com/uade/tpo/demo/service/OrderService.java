package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.OrderDetail;
import com.uade.tpo.demo.entity.dto.OrderRequest;
import com.uade.tpo.demo.exceptions.ProductDuplicateException;

public interface OrderService {

    //get
    public List<Order> getOrders();
    public Optional<Order> getOrderById(Long orderId);
    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId);

    //post
    public Order createOrder(OrderRequest checkoutOrder) throws ProductDuplicateException;
}
