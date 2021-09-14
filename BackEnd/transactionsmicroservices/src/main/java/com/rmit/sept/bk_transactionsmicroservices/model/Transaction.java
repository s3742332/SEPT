package com.rmit.sept.bk_transactionsmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

//    @NotBlank(message = "Username required.")
    private String userName;
//    @NotBlank(message = "Book Title required")
    private String sellerName;

    private String bookTitle;
//    @NotBlank(message = "Author required")
    private String author;
//    @NotBlank(message = "Cost needed")
    private double transactionCost;

    private String bookType;

    private boolean bookSold;

    private boolean bookBought;

    public boolean isBookSold() {
        return bookSold;
    }

    public void setBookSold(boolean bookSold) {
        this.bookSold = bookSold;
    }

    public boolean isBookBought() {
        return bookBought;
    }

    public void setBookBought(boolean bookBought) {
        this.bookBought = bookBought;
    }

    public String getBookType() {
        return bookType;
    }

    public void setBookType(String bookType) {
        this.bookType = bookType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getTransactionCost() {
        return transactionCost;
    }

    public void setTransactionCost(double transactionCost) {
        this.transactionCost = transactionCost;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

}
