package com.rmit.sept.bk_booksmicroservices.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

//    @NotBlank(message = "Username required.")
    private String userName;

//    private String bookTitle;
////    @NotBlank(message = "Author required")
//    private String author;
//    @NotBlank(message = "Cost needed")
    private double transactionCost;

    @ElementCollection
    private List<String> books;

    private boolean orderComplete;

    private int orderId;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public boolean isOrderComplete() {
        return orderComplete;
    }

    public void setOrderComplete(boolean orderComplete) {
        this.orderComplete = orderComplete;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public List<String> getBooks() {
        return books;
    }

    public void setBooks(List<String> books) {
        this.books = books;
    }

    public double getTransactionCost() {
        return transactionCost;
    }

    public void setTransactionCost(double transactionCost) {
        this.transactionCost = transactionCost;
    }

}
