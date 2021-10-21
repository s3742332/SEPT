package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.TransactionException;
import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomTransactionServiceDetails {

    private static final Logger logger = LogManager.getLogger(CustomTransactionServiceDetails.class);

    @Autowired
    private TransactionRepository transactionRepository;

    // public List<Transaction> loadTransactionByUserName(String username)
    // {
    //     List<Transaction> transactions = transactionRepository.findBooksByUserName(username);

    //     if(transactions == null)
    //     {
    //         new TransactionException("Unable to find transaction");
    //     }

    //     return transactions;
    // }

    @Transactional
    public Transaction loadTransactionById(Long id)
    {
        Transaction transaction = transactionRepository.getById(id);

        if(transaction == null)
        {
            new TransactionException("Unable to find transaction");
        }
        logger.log(Level.ERROR, "Unable to save review");

        return transaction;
    }

}
