package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.TransactionException;
import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookService bookService;

    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        try {

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

    @Transactional
    public List<Book> getTransactionByBookSeller(String seller) {
        try {
            Iterable<Transaction> transactions = transactionRepository.findAll();
            List<Book> soldBySeller = new ArrayList<>();

            for (Transaction transaction : transactions)
            {
                Long[] ids = transaction.getBookIds();

                Iterable<Book> books = bookService.getBookFromIds(ids);

                for (Book book : books)
                {
                    if (book.getSeller().equals(seller))
                    {
                        soldBySeller.add(book);
                    }
                }
            }

            return soldBySeller;

        } catch (Exception e)
        {
            throw new TransactionException("No transaction with that ID.");
        }
    }

    @Transactional
    public List<Transaction> getTransactionBySeller(String seller) {
        try {
            Iterable<Transaction> transactions = transactionRepository.findAll();
            List<Transaction> soldBySeller = new ArrayList<>();

            for (Transaction transaction : transactions)
            {
                Long[] ids = transaction.getBookIds();

                Iterable<Book> books = bookService.getBookFromIds(ids);

                for (Book book : books)
                {
                    if (book.getSeller().equals(seller))
                    {
                        soldBySeller.add(transaction);
                    }
                }
            }

            return soldBySeller;

        } catch (Exception e)
        {
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
