package com.rmit.sept.bk_booksmicroservices.model;

import javax.persistence.*;

@Entity(name = "ShoppingCart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long[] cartContents;

    private String userName;

    private double cartTotal;

    private Book[] books;

    public ShoppingCart() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public double getCartTotal() {
        return cartTotal;
    }

    public void setCartTotal(double cartTotal) {
        this.cartTotal = cartTotal;
    }

    public Long[] getCartContents() {
        return cartContents;
    }

    public void setCartContents(Long[] cartContents) {
        this.cartContents = cartContents;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setBooks(Book[] books) {

        this.books = books;

    }

    public Book[] getBooks() {

        return books;

    }
}
