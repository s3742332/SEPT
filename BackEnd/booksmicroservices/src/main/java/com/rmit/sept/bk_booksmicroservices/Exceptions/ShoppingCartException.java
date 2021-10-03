package com.rmit.sept.bk_booksmicroservices.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ShoppingCartException extends RuntimeException{
    public ShoppingCartException(String message) {
        super(message);
    }
}
