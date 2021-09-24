package com.rmit.sept.bk_booksmicroservices.model;

import javax.persistence.*;
import java.util.List;


@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private double transactionCost;

    private Long[] bookIds;

    private String username;

    public String getUserName() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public Long[] getBookIds() {
        return bookIds;
    }

    public void setBooks(Long[] bookIds) {
        this.bookIds = bookIds;
    }

    public double getTransactionCost() {
        return transactionCost;
    }

    public void setTransactionCost(double transactionCost) {
        this.transactionCost = transactionCost;
    }
}