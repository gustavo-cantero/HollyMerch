package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class LoginResponse {
    public LoginResponse() {}

    public LoginResponse(long userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

    private long userId;
    private String userName;
}

