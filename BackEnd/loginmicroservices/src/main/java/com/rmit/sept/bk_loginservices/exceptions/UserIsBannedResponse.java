package com.rmit.sept.bk_loginservices.exceptions;

public class UserIsBannedResponse {

    private String username;

    public UserIsBannedResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}