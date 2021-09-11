package com.rmit.sept.bk_transactionsmicroservices.Web;

import com.rmit.sept.bk_transactionsmicroservices.Services.TransactionService;
import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
