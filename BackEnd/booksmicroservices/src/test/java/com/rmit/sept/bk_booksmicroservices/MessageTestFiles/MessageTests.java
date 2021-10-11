package com.rmit.sept.bk_booksmicroservices.MessageTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.Message;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MessageTests {

    private static Message message;

    @BeforeAll
    static void setup() {
        message = new Message();
        message.setUsername("user@user.com");
        message.setMessage("Hello World!");
    }

    @Test
    @DisplayName("Should return same username as provided")
    void testGetUsername() {
        assertEquals("user@user.com", message.getUsername());
    }

    @Test
    @DisplayName("Should return same message as provided")
    void testGetMessage() {
        assertEquals("Hello World!", message.getMessage());
    }
}
