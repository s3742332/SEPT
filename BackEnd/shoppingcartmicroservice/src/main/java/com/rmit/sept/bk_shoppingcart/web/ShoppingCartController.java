package com.rmit.sept.bk_shoppingcart.web;

import com.rmit.sept.bk_shoppingcart.Services.ShoppingCartService;
import com.rmit.sept.bk_shoppingcart.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shoppingcarts")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveShoppingCart")
    public ResponseEntity<ShoppingCart> createNewShoppingCart(@RequestBody ShoppingCart shoppingCart)
    {
        ShoppingCart shoppingCart1 = shoppingCartService.saveShoppingCart(shoppingCart);
        return new ResponseEntity<ShoppingCart>(shoppingCart1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllShoppingCarts")
    public ResponseEntity<?> getAllShoppingCarts()
    {
        Iterable<ShoppingCart> carts = shoppingCartService.getAllShoppingCarts();

        return new ResponseEntity<Iterable<ShoppingCart>>(carts, HttpStatus.OK);
    }
}
