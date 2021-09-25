package com.rmit.sept.bk_booksmicroservices.web;

import java.util.ArrayList;
import java.util.Arrays;

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
            }
        }

        return new ResponseEntity<ShoppingCart>(cart, HttpStatus.OK);
    }

    // @CrossOrigin(origins = "*")
    // @PostMapping("/addToCart")
    // public ResponseEntity<ShoppingCart> addToCart(@RequestBody String name, Long id) {
    //     Iterable<ShoppingCart> carts = shoppingCartService.getAllShoppingCarts();

    //      for (ShoppingCart shoppingCart : carts) {
    //         if (shoppingCart.getUserName().equals(name)) {
    //             Long[] newContent = Arrays.copyOf(shoppingCart.getCartContents(), shoppingCart.getCartContents().length + 1);
    //             newContent[newContent.length - 1 ] = id;
    //             shoppingCart.setCartContents(newContent);
    //             return new ResponseEntity<ShoppingCart>(shoppingCart, HttpStatus.CREATED);
    //         }
    //     }
    //     return null;
    // }

    // @CrossOrigin(origins = "*")
    // @PostMapping("/removeFromCart")
    // public ResponseEntity<ShoppingCart> removeFromCart(@RequestBody String name, Long id) {
    //     Iterable<ShoppingCart> carts = shoppingCartService.getAllShoppingCarts();

    //      for (ShoppingCart shoppingCart : carts) {
    //         if (shoppingCart.getUserName().equals(name)) {
    //             Long[] newContent = Arrays.copyOf(shoppingCart.getCartContents(), shoppingCart.getCartContents().length - 1);
    //             shoppingCart.setCartContents(newContent);
    //             return new ResponseEntity<ShoppingCart>(shoppingCart, HttpStatus.CREATED);
    //         }
    //     }
    //     return null;
    // }
}