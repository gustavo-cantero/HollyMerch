package com.uade.tpo.demo.entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity(name = "`order`")
public class Order {
   public Order() {

   }

   public Order(Long _itemsQty, double _total, User _user,String _discount){
      this.itemsQty = _itemsQty;
      this.total = _total;
      this.user = _user;
      this.discount=_discount;
   }

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column
   private Long itemsQty;

   @Column
   private double total;

   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false) // _id es el default de SQL para acceder a la PK de un User. //Aca
                                                   // tengo muchos a uno, porque Muchas orders van a tener 1 solo ID,
                                                   // esto te busca TODAS las orders.
   private User user;

   @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
   @JsonManagedReference
   private List<OrderDetail> orderDetails;

   @Column
   @CreationTimestamp
   private Date orderDate;

   //discountKeyword
   @Column
   private String discount;

}
