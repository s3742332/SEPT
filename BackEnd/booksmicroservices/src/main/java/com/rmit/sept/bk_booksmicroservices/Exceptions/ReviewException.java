package com.rmit.sept.bk_booksmicroservices.Exceptions;

import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReviewException extends RuntimeException
{
    public ReviewException(String message) {
        super(message);
    }
}
