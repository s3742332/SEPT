package com.rmit.sept.bk_booksmicroservices.web;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.Services.ShoppingCartService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shoppingcarts")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private BookService bookService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveShoppingCart")
    public ResponseEntity<ShoppingCart> createNewShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        ShoppingCart shoppingCart1 = shoppingCartService.saveShoppingCart(shoppingCart);
        return new ResponseEntity<ShoppingCart>(shoppingCart1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllShoppingCarts")
    public ResponseEntity<?> getAllShoppingCarts() {
        Iterable<ShoppingCart> carts = shoppingCartService.getAllShoppingCarts();

        return new ResponseEntity<Iterable<ShoppingCart>>(carts, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/getUserCart/{name}")

    public ResponseEntity<?> getUserCart(@PathVariable String name) {
        Iterable<ShoppingCart> carts = shoppingCartService.getAllShoppingCarts();
        ShoppingCart cart = new ShoppingCart();
        for (ShoppingCart shoppingCart : carts) {
            if (shoppingCart.getUserName().equals(name)) {
                cart = shoppingCart;
                ArrayList<Book> bookData = new ArrayList<Book>();
                Iterable<Book> bookData1 = bookService.getBookFromIds(cart.getCartContents());
                List<Long> IdList = new ArrayList<>(Arrays.asList(shoppingCart.getCartContents()));

                for (Long id : IdList) {
                    for (Book book : bookData1) {
                        if (book.getId().equals(id)) {
                            bookData.add(book);
                        }
                    }
                }

                Book[] temp = new Book[bookData.size()];
                temp = bookData.toArray(temp);
                cart.setBooks(temp);
            }

        }

        return new ResponseEntity<ShoppingCart>(cart, HttpStatus.OK);

    }
}