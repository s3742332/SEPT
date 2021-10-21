package com.rmit.sept.bk_booksmicroservices.ReviewTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.Review;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;

public class ReviewTests {

    private static Review review;
    private static LocalDateTime ldt;

    @BeforeAll
    static void setup() {
        ldt = LocalDateTime.now();
        review = new Review();
        review.setUsername("user@user.com");
        review.setReview("abcdefghijklmnopqrstuvwxyz");
        review.setBookId(1);
        review.setCreatedAt(ldt);
        review.setUpdatedAt(ldt);
        review.setRating(7);
    }

    @Test
    @DisplayName("Should return same username as provided")
    void testGetUsername() {
        assertEquals("user@user.com", review.getUsername());
    }

    @Test
    @DisplayName("Should return same review as provided")
    void testGetReview() {
        assertEquals("abcdefghijklmnopqrstuvwxyz", review.getReview());
    }

    @Test
    @DisplayName("Should return same book id as provided")
    void testGetBookId() {
        assertEquals(1, review.getBookId());
    }

    @Test
    @DisplayName("Should return correct rating provided")
    void testGetRating() {
        assertEquals(7, review.getRating());
    }
}
