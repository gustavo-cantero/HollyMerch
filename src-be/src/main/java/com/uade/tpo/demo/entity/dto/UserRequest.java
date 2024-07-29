package com.uade.tpo.demo.entity.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * UserRequest se usa tanto para Creacion de un user (Sign-up) como para Login (solo pasando pwd y userName)
 */
@Data
public class UserRequest {
    private String email;
    private String name;
    private String lastName;
    private String password;
    private String userName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
}
