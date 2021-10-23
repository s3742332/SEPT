package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    Transaction getById(Long id);
}
