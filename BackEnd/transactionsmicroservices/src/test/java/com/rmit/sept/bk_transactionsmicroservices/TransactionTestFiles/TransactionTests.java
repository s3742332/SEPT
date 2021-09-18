package com.rmit.sept.bk_transactionsmicroservices.TransactionTestFiles;

import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TransactionTests {

    private static Transaction transaction;
    private static List<String> books;

    @BeforeAll
    static void setup() {
        books = new ArrayList<>();
        books.add("Book 1");
        books.add("Book 2");
        transaction = new Transaction();
        transaction.setOrderId(1);
        transaction.setOrderComplete(true);
        transaction.setUserName("user@user.com");
        transaction.setBooks(books);
        transaction.setTransactionCost(39.99);
    }

    @Test
    @DisplayName("Should pass if transaction order ID is same as provided")
    void testGetOrderId() {
        assertEquals(1, transaction.getOrderId());
    }

    @Test
    @DisplayName("Should pass if order complete is true")
    void testGetOrderComplete() {
        assertTrue(transaction.isOrderComplete());
    }

    @Test
    @DisplayName("Should pass if username is same as email provided")
    void testGetUserName() {
        assertEquals("user@user.com", transaction.getUserName());
    }

    @Test
    @DisplayName("Should pass if book list is the same as provided")
    void getBooks() {
        assertEquals(books, transaction.getBooks());
    }

    @Test
    @DisplayName("Should pass if transaction cost is 39.99")
    void getTransactionCost() {
        assertEquals(39.99, transaction.getTransactionCost());
    }
}
