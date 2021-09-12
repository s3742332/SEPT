package com.rmit.sept.bk_transactionsmicroservices.Services;

import com.rmit.sept.bk_transactionsmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionsmicroservices.exceptions.TransactionException;
import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction)
    {
        try {
            transaction.setAuthor(transaction.getAuthor());
            transaction.setBookTitle(transaction.getBookTitle());
            transaction.setTransactionCost(transaction.getTransactionCost());
            transaction.setUserName(transaction.getUserName());

            return transactionRepository.save(transaction);
        }
        catch (Exception e)
        {
            throw new TransactionException("Unable to create transaction");
        }
    }

    public Iterable<Transaction> getAllTransactions()
    {
        try
        {
            return transactionRepository.findAll();
        }
        catch (Exception e)
        {
            throw new TransactionException("Unable to retrieve transaction list.");
        }
    }
}
