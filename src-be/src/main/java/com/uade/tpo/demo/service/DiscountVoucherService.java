package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import com.uade.tpo.demo.entity.DiscountVoucher;
import com.uade.tpo.demo.exceptions.DiscountVoucherDuplicateException;

public interface DiscountVoucherService {

    // get
    public List<DiscountVoucher> getVouchers();
    public Optional<DiscountVoucher> getVoucherByKeyword(String keyword);

    //post
    public DiscountVoucher createVoucher(DiscountVoucher voucher) throws DiscountVoucherDuplicateException;

    //put
    public DiscountVoucher updateDiscountVoucher(DiscountVoucher voucher);
}
