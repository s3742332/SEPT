package com.rmit.sept.bk_transactionsmicroservices.Web;

import com.rmit.sept.bk_transactionsmicroservices.Services.TransactionService;
import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveTransaction")
    public ResponseEntity<Transaction> createNewTransaction(@RequestBody Transaction transaction)
    {
        Transaction transaction1 = transactionService.saveTransaction(transaction);
        return new ResponseEntity<Transaction>(transaction1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllTransactions")
    public ResponseEntity<?> getAllTransactions()
    {
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();

        return new ResponseEntity<Iterable<Transaction>>(transactionList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllUserTransactions")
    public ResponseEntity<?> getAllApprovedBooks(String username){
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        ArrayList<Transaction> userTransactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionList){
            if (transaction.getUserName().equals(username)) {
                userTransactions.add(transaction);
            }
        }

        return  new ResponseEntity<Iterable<Transaction>>(userTransactions, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBookTransaction")
    public ResponseEntity<?> getAllTransactionsOfBook(String title, String author){
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        ArrayList<Transaction> bookTransactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionList){
            if (transaction.getBookTitle().equals(title) && transaction.getAuthor().equals(author)) {
                bookTransactions.add(transaction);
            }
        }

        return  new ResponseEntity<Iterable<Transaction>>(bookTransactions, HttpStatus.OK);
    }
}
