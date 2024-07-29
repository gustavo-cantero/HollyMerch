package com.uade.tpo.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
 * Excepción que se lanza cuando se intenta grabar un producto duplicado.
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "El producto que se intenta grabar esta duplicado")
public class ProductDuplicateException extends Exception {

}
