package com.rmit.sept.bk_booksmicroservices.CartTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ShoppingCartTests {

    private static ShoppingCart cart;

    private static Long[] cartContents;

    @BeforeAll
    static void setup() {
        cartContents = new Long[]{1L, 2L, 3L};
        cart = new ShoppingCart();
        cart.setId(1L);
        cart.setCartTotal(39.99);
        cart.setCartContents(cartContents);
        cart.setUserName("user@user.com");
    }

    @Test
    @DisplayName("Should pass if cart ID is same as provided")
    void testGetId() {
        assertEquals(1L, cart.getId());
    }

    @Test
    @DisplayName("Should pass if cart total is same as provided")
    void testGetCartTotal() {
        assertEquals(39.99, cart.getCartTotal());
    }

    @Test
    @DisplayName("Should pass if cart contents is same as provided")
    void getCartContents() {
        assertEquals(cartContents, cart.getCartContents());
    }

    @Test
    @DisplayName("Should pass if cart username is same as provided")
    void getUserName() {
        assertEquals("user@user.com", cart.getUserName());
    }
}
