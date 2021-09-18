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
    @GetMapping("/getAllUserTransactions/{name}")
    public ResponseEntity<?> getAllUserSellerTransactions(@PathVariable String name){
        Iterable<Transaction> transactionList = transactionService.getAllTransactions();
        ArrayList<Transaction> userTransactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionList){
            if (transaction.getUserName().equals(name)) {
                userTransactions.add(transaction);
            }
        }

        return  new ResponseEntity<Iterable<Transaction>>(userTransactions, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/completeOrder/{transactionId}")
    public ResponseEntity<?> completeOrder(@PathVariable String transactionId)
    {
        Transaction transaction = transactionService.getTransactionById(Long.valueOf(transactionId));
        Transaction transaction1 = transactionService.updateOrderStatus(transaction);

        return new ResponseEntity<Transaction>(transaction1, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getByOrderId/{orderId}")
    public ResponseEntity<?> getByOrderId(@PathVariable String orderId)
    {
        int ordId = Integer.parseInt(orderId);
        Transaction transaction = transactionService.getTransactionByOrderId(ordId);
        
        return new ResponseEntity<Transaction>(transaction, HttpStatus.OK);
    }

}
