package com.uade.tpo.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.entity.DiscountVoucher;
import com.uade.tpo.demo.entity.dto.DiscountVoucherRequest;
import com.uade.tpo.demo.exceptions.DiscountVoucherDuplicateException;
import com.uade.tpo.demo.service.DiscountVoucherService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin("*")
@RequestMapping("vouchers")
public class DiscountVouchersController {
    @Autowired
    private DiscountVoucherService discountVoucherService;

    @GetMapping
    public ResponseEntity<List<DiscountVoucher>> getVouchers() {
        return ResponseEntity.ok(discountVoucherService.getVouchers());
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<?> getVoucherByKeyword(@PathVariable String keyword) {
        Optional<DiscountVoucher> result = discountVoucherService.getVoucherByKeyword(keyword);
        if (!result.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el cupón.");
        if (!result.get().isActive())
            return ResponseEntity.status(HttpStatus.GONE).body("El cupón ya no es válido.");
        return ResponseEntity.ok(result.get());
    }

    @PostMapping()
    public ResponseEntity<DiscountVoucher> createDiscountVoucher(@RequestBody DiscountVoucherRequest voucherRequest)
            throws DiscountVoucherDuplicateException {
        DiscountVoucher result = discountVoucherService.createVoucher(voucherRequest.toDiscountVoucher());
        return ResponseEntity.created(URI.create("/vouchers/" + result.getKeyword())).body(result);
    }

    @PutMapping("/{keyword}")
    public ResponseEntity<DiscountVoucher> changeActiveStatus(@PathVariable String keyword) {
        DiscountVoucher voucher = discountVoucherService.getVoucherByKeyword(keyword).get();
        voucher.setActive(!voucher.isActive());
        discountVoucherService.updateDiscountVoucher(voucher);
        return ResponseEntity.ok(voucher);
    }

}
