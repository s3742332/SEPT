// package com.rmit.sept.bk_booksmicroservices.TransactionTestFiles;

// import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;
// import com.rmit.sept.bk_booksmicroservices.Services.TransactionService;
// import com.rmit.sept.bk_booksmicroservices.model.Transaction;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.mockito.junit.jupiter.MockitoSettings;
// import org.mockito.quality.Strictness;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.stream.Collectors;
// import java.util.stream.Stream;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.*;

// @ExtendWith(MockitoExtension.class)
// @MockitoSettings(strictness = Strictness.LENIENT)
// public class TransactionServiceTests {

//     private static Transaction transaction1, transaction2, transaction3;
//     private static List<String> books1, books2, books3;

//     @InjectMocks
//     private TransactionService transactionService;

//     @Mock
//     private TransactionRepository transactionRepository;

//     // @BeforeEach
//     // void setup() {
//     //     books1 = new ArrayList<>();
//     //     books1.add("Book 1");
//     //     books1.add("Book 2");
//     //     transaction1 = new Transaction();
//     //     transaction1.setOrderId(1);
//     //     transaction1.setOrderComplete(true);
//     //     transaction1.setUserName("user1@user.com");
//     //     transaction1.setBooks(books1);
//     //     transaction1.setTransactionCost(39.99);

//     //     books2 = new ArrayList<>();
//     //     books2.add("Book 3");
//     //     books2.add("Book 4");
//     //     transaction2 = new Transaction();
//     //     transaction2.setOrderId(2);
//     //     transaction2.setOrderComplete(true);
//     //     transaction2.setUserName("user2@user.com");
//     //     transaction2.setBooks(books2);
//     //     transaction2.setTransactionCost(33.99);

//     //     books3 = new ArrayList<>();
//     //     books3.add("Book 5");
//     //     books3.add("Book 6");
//     //     transaction3 = new Transaction();
//     //     transaction3.setOrderId(3);
//     //     transaction3.setOrderComplete(false);
//     //     transaction3.setUserName("user3@user.com");
//     //     transaction3.setBooks(books3);
//     //     transaction3.setTransactionCost(42.99);
//     // }

//     @Test
//     @DisplayName("Should pass if transaction being saved to repo is the same as provided")
//     void saveTransactionTest() {
//         Mockito.when(transactionRepository.save(transaction1)).thenReturn(transaction1);

//         assertEquals(transaction1, transactionService.saveTransaction(transaction1));
//     }

//     @Test
//     @DisplayName("Should pass if transactions list matches")
//     void getAllTransactionsTest() {
//         Mockito.when(transactionRepository.findAll()).thenReturn(Stream
//                 .of(transaction1, transaction2).collect(Collectors.toList()));

//         assertEquals(2, ((List<Transaction>) transactionService.getAllTransactions()).size());
//     }

//     @Test
//     @DisplayName("Should pass if the correct transaction by ID was returned")
//     void getTransactionByIdTest() {
//         Long id = new Long(1);
//         Mockito.when(transactionRepository.getById(id)).thenReturn(transaction1);

//         assertEquals(transaction1, transactionService.getTransactionById(id));
//     }

//     @Test
//     @DisplayName("Should pass if the correct transaction by order ID was returned")
//     void getTransactionByOrderIdTest() {
//         Mockito.when(transactionRepository.findTransactionByOrderId(1)).thenReturn(transaction1);

//         assertEquals(transaction1, transactionService.getTransactionByOrderId(1));
//     }

//     @Test
//     void updateOrderStatusTest() {
//         Transaction updatedTransaction = transaction3;
//         transactionService.updateOrderStatus(updatedTransaction);
//         verify(transactionRepository, times(1)).save(updatedTransaction);
//     }

// }
