package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.Services.TransactionService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private static final Logger logger = LogManager.getLogger(TransactionController.class);


    @Autowired
    private BookService bookService;

    @Autowired
    private TransactionService transactionService;

    // adding or removing a book - pass through username (email) + array of book ids
    @CrossOrigin(origins = "*")
    @PostMapping("/saveTransaction")
    public ResponseEntity<Transaction> createNewTransaction(@RequestBody Transaction transaction) {
        Transaction transaction1 = transactionService.saveTransaction(transaction);
        logger.log(org.apache.logging.log4j.Level.INFO, "Saving transaction");

        return new ResponseEntity<Transaction>(transaction1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllTransactions")
    public ResponseEntity<?> getAllTransactions() {
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving transaction");

        return new ResponseEntity<Iterable<Transaction>>(transactionList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllUserTransactions/{name}")
    public ResponseEntity<?> getAllUserSellerTransactions(@PathVariable String name) {
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        ArrayList<Transaction> userTransactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionList) {
            if (transaction.getUserName().equals(name)) {
                userTransactions.add(transaction);
            }
        }
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving all user transactions");

        return new ResponseEntity<Iterable<Transaction>>(userTransactions, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getUserOwnedBooks/{name}")
    public ResponseEntity<?> getUserOwnedBooks(@PathVariable String name) {
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        ArrayList<Book> bookList = new ArrayList<Book>();
        for (Transaction transaction : transactionList) {
            if (transaction.getUserName().equals(name)) {
                for (Book book : bookService.getBookFromIds(transaction.getBookIds())) {
                    bookList.add(book);
                }
            }
        }

        return new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getSellerTransactions/{seller}")
    public ResponseEntity<?> getSellerTransactions(@PathVariable String seller) {
        ArrayList<Book> sellerBookTransactions = transactionService.getTransactionByBookSeller(seller);
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving seller transactions");

        return new ResponseEntity<Iterable<Book>>(sellerBookTransactions, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cancelTransaction")
    public void cancelTransaction(@RequestBody Long id) {
        System.out.println("I AM IN BACKEND");
        System.out.println(id);
        transactionService.deleteTransactionById(id);
    }

}
