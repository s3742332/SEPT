package com.rmit.sept.bk_booksmicroservices.SellerReviewTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.SellerReview;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SellerReviewTests {

    private static SellerReview sellerReview;

    @BeforeAll
    static void setup() {
        sellerReview = new SellerReview();
        sellerReview.setId(1L);
        sellerReview.setUsername("user@user.com");
        sellerReview.setReview("abcdefg");
    }

    @Test
    @DisplayName("Should return same ID as provided")
    void testGetId() {
        assertEquals(1L, sellerReview.getId());
    }

    @Test
    @DisplayName("Should return same username as provided")
    void testGetUsername() {
        assertEquals("user@user.com", sellerReview.getUsername());
    }

    @Test
    @DisplayName("Should return same review as provided")
    void testGetReview() {
        assertEquals("abcdefg", sellerReview.getReview());
    }
}
