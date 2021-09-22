package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;

import java.util.ArrayList;
import java.util.Arrays;

import com.rmit.sept.bk_booksmicroservices.Exceptions.TransactionException;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookService bookService;

    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        try {

            System.out.println("BOOK IDS:");
            System.out.println(transaction.getBookIds());
            Iterable<Book> books = bookService.getBookFromIds(transaction.getBookIds());
            double totalCost = 0;
            for (Book book : books) {
                book.setStockLevel(book.getStockLevel() - 1);
                totalCost += book.getBookCost();
            }
            transaction.setTransactionCost(totalCost);

            return transactionRepository.save(transaction);
        } catch (Exception e) {
            System.out.println("HELLO I AM HERE");
            System.out.println(e);
            throw new TransactionException("Unable to create transaction");
        }
    }

    @Transactional
    public Iterable<Transaction> getAllTransactions() {
        try {
            return transactionRepository.findAll();
        } catch (Exception e) {
            throw new TransactionException("Unable to retrieve transaction list.");
        }
    }

    @Transactional
    public Transaction getTransactionById(Long id) {
        try {
            return transactionRepository.getById(id);
        } catch (Exception e) {
            throw new TransactionException("No transaction with that ID.");
        }
    }

    // @Transactional
    // public Transaction getTransactionByOrderId(int id)
    // {
    // try
    // {
    // return transactionRepository.getById(id);
    // }
    // catch(Exception e)
    // {
    // throw new TransactionException("No transaction with that order ID.");
    // }
    // }

    // @Transactional
    // public Transaction updateOrderStatus(Transaction transaction)
    // {
    // try {
    // transaction.setOrderComplete(true);

    // return transactionRepository.save(transaction);
    // }
    // catch (Exception e)
    // {
    // throw new TransactionException("Unable to create transaction");
    // }
    // }
}
