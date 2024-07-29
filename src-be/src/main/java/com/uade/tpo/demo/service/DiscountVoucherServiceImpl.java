package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.entity.DiscountVoucher;
import com.uade.tpo.demo.exceptions.DiscountVoucherDuplicateException;
import com.uade.tpo.demo.repository.DiscountVoucherRepository;

@Service
public class DiscountVoucherServiceImpl implements DiscountVoucherService {

    @Autowired
    DiscountVoucherRepository discountVoucherRepository;

    @Override
    public List<DiscountVoucher> getVouchers() {
        return discountVoucherRepository.findAll();
    }

    @Override
    public Optional<DiscountVoucher> getVoucherByKeyword(String keyword) {
        return discountVoucherRepository.findByKeyword(keyword);
    }

    @Override
    public DiscountVoucher createVoucher(DiscountVoucher voucher) throws DiscountVoucherDuplicateException {
        if (voucher.getDiscountPercentage() < 0 || voucher.getDiscountPercentage() > 80) {
            throw new UnsupportedOperationException("Porcentaje de descuento inválido.");
        }
        Optional<DiscountVoucher> voucherDupl = discountVoucherRepository.findByKeyword(voucher.getKeyword());
        if (voucherDupl.isPresent()) {
            throw new DiscountVoucherDuplicateException();
        }
        return discountVoucherRepository.save(voucher);
    }

    @Override
    public DiscountVoucher updateDiscountVoucher(DiscountVoucher voucher) {
        DiscountVoucher newVoucher = discountVoucherRepository.getReferenceById(voucher.getId());
        newVoucher.setKeyword(voucher.getKeyword());
        newVoucher.setDiscountPercentage(voucher.getDiscountPercentage());
        newVoucher.setActive(voucher.isActive());
        return discountVoucherRepository.save(newVoucher);
    }

    

}
