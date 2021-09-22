package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    Transaction getById(Long id);
    // List<Transaction> findBooksByUserName(String username);
    // Transaction findTransactionByOrderId(int id);

}
