package com.rmit.sept.bk_transactionsmicroservices.Services;

import com.rmit.sept.bk_transactionsmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionsmicroservices.exceptions.TransactionException;
import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public Transaction saveTransaction(Transaction transaction)
    {
        try {
            transaction.setBooks(transaction.getBooks());
            transaction.setTransactionCost(transaction.getTransactionCost());
            transaction.setUserName(transaction.getUserName());
            transaction.setOrderComplete(transaction.isOrderComplete());

            return transactionRepository.save(transaction);
        }
        catch (Exception e)
        {
            throw new TransactionException("Unable to create transaction");
        }
    }
    
    @Transactional
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

    @Transactional
    public Transaction getTransactionById(Long id)
    {
        try
        {
            return transactionRepository.getById(id);
        }
        catch(Exception e)
        {
            throw new TransactionException("No transaction with that ID.");
        }
    }

    @Transactional
    public Transaction updateOrderStatus(Transaction transaction)
    {
        try {
            transaction.setOrderComplete(true);

            return transactionRepository.save(transaction);
        }
        catch (Exception e)
        {
            throw new TransactionException("Unable to create transaction");
        }
    }
}
