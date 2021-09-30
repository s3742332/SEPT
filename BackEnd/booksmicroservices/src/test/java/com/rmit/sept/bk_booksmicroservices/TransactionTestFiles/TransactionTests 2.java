 package com.rmit.sept.bk_booksmicroservices.TransactionTestFiles;

 import com.rmit.sept.bk_booksmicroservices.model.Transaction;
 import org.junit.jupiter.api.BeforeAll;
 import org.junit.jupiter.api.DisplayName;
 import org.junit.jupiter.api.Test;

 import static org.junit.jupiter.api.Assertions.assertEquals;

 public class TransactionTests {

     private static Transaction transaction;
     private static Long[] bookIds;

      @BeforeAll
      static void setup() {
          bookIds = new Long[]{1L, 2L, 3L};
          transaction = new Transaction();
          transaction.setId(1L);
          transaction.setUserName("user@user.com");
          transaction.setBooks(bookIds);
          transaction.setTransactionCost(39.99);
      }

     @Test
     @DisplayName("Should pass if transaction order ID is same as provided")
     void testGetOrderId() {
         assertEquals(1, transaction.getId());
     }

     @Test
     @DisplayName("Should pass if username is same as email provided")
     void testGetUserName() {
         assertEquals("user@user.com", transaction.getUserName());
     }

     @Test
     @DisplayName("Should pass if book ID list is the same as provided")
     void getBooks() {
         assertEquals(bookIds, transaction.getBookIds());
     }

     @Test
     @DisplayName("Should pass if transaction cost is 39.99")
     void getTransactionCost() {
         assertEquals(39.99, transaction.getTransactionCost());
     }
 }
