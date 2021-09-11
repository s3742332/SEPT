package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class BookTests {
    
    private static Book book;

    @BeforeAll
    static void setup() {
        book = new Book();
        book.setCompanyName("Test Company");
        book.setBookTitle("Test Book");
        book.setAuthor("Test Author");
        book.setBookDescription("Test Description");
        book.setBookCost(10.00);
        // book.setInStock(true);
        Long idValue = (long) 1;
        book.setId(idValue);
    }

    // Simple getter test for book author
    @Test 
    void getAuthorTest() {
        assertEquals("Test Author", book.getAuthor());
    }

    // Simple getter test for book cost
    @Test
    void getBookCostTest() {
        assertEquals(10.00, book.getBookCost());
    }

    // // Test if the book is in stock
    // @Test
    // void bookInStockTest() {
    //     assertTrue(book.getStock());
    // }

    // // Test if the book is not in stock, test should fail as book is in stock
    // @Test
    // void bookNotInStock() {
    //     assertFalse(!book.isInStock());
    // }
}