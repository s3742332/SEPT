 package com.rmit.sept.bk_booksmicroservices.TransactionTestFiles;

 import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;
 import com.rmit.sept.bk_booksmicroservices.Services.BookService;
 import com.rmit.sept.bk_booksmicroservices.Services.TransactionService;
 import com.rmit.sept.bk_booksmicroservices.model.Book;
 import com.rmit.sept.bk_booksmicroservices.model.Transaction;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.DisplayName;
 import org.junit.jupiter.api.Test;
 import org.junit.jupiter.api.extension.ExtendWith;
 import org.mockito.InjectMocks;
 import org.mockito.Mock;
 import org.mockito.Mockito;
 import org.mockito.junit.jupiter.MockitoExtension;
 import org.mockito.junit.jupiter.MockitoSettings;
 import org.mockito.quality.Strictness;

 import java.util.List;
 import java.util.stream.Collectors;
 import java.util.stream.Stream;

 import static org.junit.jupiter.api.Assertions.assertEquals;

 @ExtendWith(MockitoExtension.class)
 @MockitoSettings(strictness = Strictness.LENIENT)
 public class TransactionServiceTests {

     private static Transaction transaction1, transaction2, transaction3;
     private static Long[] bookIds_1, bookIds_2, bookIds_3;

     @InjectMocks
     private TransactionService transactionService;

     @Mock
     private TransactionRepository transactionRepository;

     @Mock
     private BookService bookService;

     @BeforeEach
     void setup() {
         bookIds_1 = new Long[]{1L};
         transaction1 = new Transaction();
         transaction1.setId(1L);
         transaction1.setUserName("user@user.com");
         transaction1.setBooks(bookIds_1);
         transaction1.setTransactionCost(39.99);

         bookIds_2 = new Long[]{4L, 5L, 6L};
         transaction2 = new Transaction();
         transaction1.setId(2L);
         transaction2.setUserName("user2@user.com");
         transaction2.setBooks(bookIds_2);
         transaction2.setTransactionCost(33.99);

         bookIds_3 = new Long[]{7L, 8L, 9L};
         transaction3 = new Transaction();
         transaction3.setId(3L);
         transaction3.setUserName("user3@user.com");
         transaction3.setBooks(bookIds_3);
         transaction3.setTransactionCost(42.99);
     }

     @Test
     @DisplayName("Should pass if transaction being saved to repo is the same as provided")
     void saveTransactionTest() {
         // Add a book to the book repository
         Book book = new Book();
         book.setId(1L);
         book.setStockLevel(150);
         book.setBookCost(39.99);
         bookService.saveOrUpdateBook(book);

         Mockito.when(transactionRepository.save(transaction1)).thenReturn(transaction1);

         assertEquals(transaction1, transactionService.saveTransaction(transaction1));
     }

     @Test
     @DisplayName("Should pass if transactions list matches")
     void getAllTransactionsTest() {
         Mockito.when(transactionRepository.findAll()).thenReturn(Stream
                 .of(transaction1, transaction2, transaction3).collect(Collectors.toList()));

         assertEquals(3, ((List<Transaction>) transactionService.getAllTransactions()).size());
     }

     @Test
     @DisplayName("Should pass if the correct transaction by ID was returned")
     void getTransactionByIdTest() {
         Long id = new Long(1);
         Mockito.when(transactionRepository.getById(id)).thenReturn(transaction1);

         assertEquals(transaction1, transactionService.getTransactionById(id));
     }

     @Test
     void deleteTransactionByIdTest() {
         Mockito.when(transactionRepository.save(transaction1)).thenReturn(transaction1);

         transactionService.deleteTransactionById(1L);

         Mockito.verify(transactionRepository).deleteById(1L);
     }
 }
