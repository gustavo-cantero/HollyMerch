package com.uade.tpo.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
 * Excepción que se lanza cuando las credenciales son incorrectas.
 */
@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "Las credenciales son incorrectas, acceso denegado.")
public class InvalidCredentialsException extends Exception {

}