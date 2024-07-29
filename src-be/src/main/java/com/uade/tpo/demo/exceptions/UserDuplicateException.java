package com.uade.tpo.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
 * Excepción que se lanza cuando se intenta agregar un usuario duplicado.
 */
@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Usuario ya existente")
public class UserDuplicateException extends Exception {

}
