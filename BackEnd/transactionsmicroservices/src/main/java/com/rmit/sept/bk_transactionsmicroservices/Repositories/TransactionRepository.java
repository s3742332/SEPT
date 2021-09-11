package com.rmit.sept.bk_transactionsmicroservices.Repositories;

import com.rmit.sept.bk_transactionsmicroservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    Transaction getById(Long id);
    List<Transaction> findBooksByOrderNumber(int orderNumber);

}
