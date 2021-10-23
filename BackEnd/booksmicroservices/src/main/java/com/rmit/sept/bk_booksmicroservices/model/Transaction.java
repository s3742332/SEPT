package com.rmit.sept.bk_booksmicroservices.model;

import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity  (name="Transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private double transactionCost;

    private Long[] bookIds;

    private String username;
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    public Transaction() {

    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
