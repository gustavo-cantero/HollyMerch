package com.uade.tpo.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
 * Excepción que se lanza cuando se intenta grabar un cupon de descuento duplicado.
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "El cupón de descuento que se intenta grabar está duplicado")
public class DiscountVoucherDuplicateException extends Exception{

}