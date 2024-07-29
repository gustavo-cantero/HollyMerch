package com.uade.tpo.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.uade.tpo.demo.entity.DiscountVoucher;

public interface DiscountVoucherRepository extends JpaRepository<DiscountVoucher, Long>{

    @Query(value = "SELECT d FROM DiscountVoucher d WHERE d.keyword = ?1")
    Optional<DiscountVoucher> findByKeyword(String keyword);
}
