// package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

// import com.rmit.sept.bk_booksmicroservices.model.Book;
// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertTrue;

// public class BookTests {
    
//     private static Book book;

//     @BeforeAll
//     static void setup() {
//         book = new Book();
//         book.setSeller("Test Company");
//         book.setBookTitle("Test Book");
//         book.setAuthor("Test Author");
//         book.setBookDescription("Test Description");
//         book.setBookCost(10.00);
//         book.setStockLevel(1);
//         Long idValue = (long) 1;
//         book.setId(idValue);
//         book.setApproved(true);
//     }

//     @Test 
//     @DisplayName("Should pass if book author name is the same as name provided")
//     void testGetAuthor() {
//         assertEquals("Test Author", book.getAuthor());
//     }

//     @Test
//     @DisplayName("Should pass if book cost is the same as cost provided")
//     void testGetBookCost() {
//         assertEquals(10.00, book.getBookCost());
//     }

//     @Test
//     @DisplayName("Should pass if stock level is the same as quantity provided")
//     void testGetStockLevel() {
//         assertEquals(1, book.getStockLevel());
//     }

//     @Test
//     @DisplayName("Should pass if book ID is the same as value provided")
//     void testGetId() {
//         assertEquals(1, book.getId());
//     }

//     @Test
//     @DisplayName("Should pass if book is approved")
//     void testGetApproved() {
//         assertTrue(book.getApproved());
//     }
    
// }