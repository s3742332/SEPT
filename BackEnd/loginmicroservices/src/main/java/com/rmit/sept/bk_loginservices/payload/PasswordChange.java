package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

public class PasswordChange {

    private Long id;
    @NotBlank(message = "Password cannot be blank")
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
