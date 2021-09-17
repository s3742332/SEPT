package com.rmit.sept.bk_shoppingcart.Services;

import com.rmit.sept.bk_shoppingcart.Repositories.ShoppingCartRepository;
import com.rmit.sept.bk_shoppingcart.exceptions.ShoppingCartException;
import com.rmit.sept.bk_shoppingcart.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomShoppingCartServiceDetails {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> loadShoppingCartByUserName(String username)
    {
        List<ShoppingCart> carts = shoppingCartRepository.findShoppingCartByUserName(username);

        if(carts == null)
        {
            new ShoppingCartException("Unable to find cart");
        }

        return carts;
    }

    @Transactional
    public ShoppingCart loadShoppingCartById(Long id)
    {
        ShoppingCart cart = shoppingCartRepository.getById(id);

        if(cart == null)
        {
            new ShoppingCartException("Unable to find shopping cart");
        }

        return cart;
    }
}
