package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Repositories.ShoppingCartRepository;
import com.rmit.sept.bk_booksmicroservices.Exceptions.ShoppingCartException;
import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart)
    {
        try{
            shoppingCart.setCartContents(shoppingCart.getCartContents());
            shoppingCart.setCartTotal(shoppingCart.getCartTotal());
            shoppingCart.setUserName(shoppingCart.getUserName());

            return shoppingCartRepository.save(shoppingCart);
        }
        catch (Exception e)
        {
            throw new ShoppingCartException("Unable to create shopping cart");
        }
    }

    @Transactional
    public Iterable<ShoppingCart> getAllShoppingCarts()
    {
        try
        {
            return shoppingCartRepository.findAll();
        }
        catch (Exception e)
        {
            throw new ShoppingCartException("Unable to retrieve shopping carts.");
        }
    }
}
