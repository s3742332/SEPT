package com.rmit.sept.bk_transactionsmicroservices.Services;

import com.rmit.sept.bk_transactionsmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionsmicroservices.exceptions.TransactionException;
import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomTransactionServiceDetails {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> loadTransactionByUserName(String username)
    {
        List<Transaction> transactions = transactionRepository.findBooksByUserName(username);

        if(transactions == null)
        {
            new TransactionException("Unable to find transaction");
        }

        return transactions;
    }

    @Transactional
    public Transaction loadTransactionById(Long id)
    {
        Transaction transaction = transactionRepository.getById(id);

        if(transaction == null)
        {
            new TransactionException("Unable to find transaction");
        }

        return transaction;
    }

}
