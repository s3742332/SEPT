package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.TransactionException;
import com.rmit.sept.bk_booksmicroservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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
    public ArrayList<Book> getTransactionByBookSeller(String seller) {
        try {
            Iterable<Transaction> transactions = transactionRepository.findAll();
            ArrayList<Book> soldBySeller = new ArrayList<>();

            for (Transaction transaction : transactions) {
                Long[] ids = transaction.getBookIds();

                ArrayList<Book> bookIds = new ArrayList<>();

                for (Long id : ids) {
                    bookIds.add(bookService.getBookFromId(id));
                }

                System.out.println(bookIds.size());

                for (Book book : bookIds) {
                    if (book.getSeller().equals(seller)) {
                        soldBySeller.add(book);
                    }
                }
            }

            return soldBySeller;

        } catch (Exception e) {
            throw new TransactionException("No transactions for that seller.");
        }
    }

    @Transactional
    public void deleteTransactionById(Long id) {
        try {
            transactionRepository.deleteById(id);
        } catch (Exception e) {
            throw new TransactionException("Error deleting.");
        }
    }

}
