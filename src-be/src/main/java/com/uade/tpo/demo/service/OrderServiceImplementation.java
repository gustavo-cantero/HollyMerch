package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.entity.DiscountVoucher;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.OrderDetail;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.OrderDetailRequest;
import com.uade.tpo.demo.entity.dto.OrderRequest;
import com.uade.tpo.demo.exceptions.ProductDuplicateException;
import com.uade.tpo.demo.repository.OrderDetailRepository;
import com.uade.tpo.demo.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImplementation implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private DiscountVoucherServiceImpl voucherService;

    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    @Override
    @Transactional
    public Order createOrder(OrderRequest checkoutOrder) throws ProductDuplicateException {
        double total = 0;
        int count = 0;
        for (OrderDetailRequest detail : checkoutOrder.getOrderDetails()) {
            if (checkoutOrder.getItemsQty() < detail.getCount())
                throw new UnsupportedOperationException(
                        "La cantidad total de productos en su orden es menor que a la contabilizadas en sus detalles.");
            Optional<Product> selectedProduct = productService.getProductById(detail.getProductId());
            if (selectedProduct.isPresent()) {
                if (selectedProduct.get().getStock() < detail.getCount()) {
                    throw new UnsupportedOperationException(
                            "No hay stock del producto: " + selectedProduct.get().getName());
                } else {
                    detail.setProductName(selectedProduct.get().getName());
                    selectedProduct.get().setStock(
                            selectedProduct.get().getStock() - Integer.parseInt(detail.getCount().toString()));
                    productService.update(selectedProduct.get());
                }
                if (Double.compare(detail.getPrice(), selectedProduct.get().getPrice()) != 0) {
                    throw new UnsupportedOperationException(
                            "No es correcto el precio del producto: " +
                                    selectedProduct.get().getName());
                }
                total += (detail.getCount() * selectedProduct.get().getPrice());
                count += detail.getCount();
            } else {
                throw new UnsupportedOperationException(
                        "No existe el producto: " + selectedProduct.get().getName());
            }
        }
        if (count != checkoutOrder.getItemsQty()) {
            throw new UnsupportedOperationException(
                    "El total de productos es diferente.");
        }
        if (checkoutOrder.getDiscountKeyword() != null) {
            DiscountVoucher voucher = voucherService.getVoucherByKeyword(checkoutOrder.getDiscountKeyword()).get();
            total *= (1-((double)voucher.getDiscountPercentage() / 100));
        }
        if (Double.compare(total, checkoutOrder.getTotal()) != 0) {
            throw new UnsupportedOperationException(
                    "El costo total es diferente.");
        }
        User user = userService.getUserById(checkoutOrder.getUserId()).get();
        Order newOrder = checkoutOrder.toOrder();
        newOrder.setUser(user);
        Order order = orderRepository.save(newOrder);
        for (OrderDetail detail : order.getOrderDetails()) {
            orderDetailRepository.save(detail);
        }
        return order;
    }

}
