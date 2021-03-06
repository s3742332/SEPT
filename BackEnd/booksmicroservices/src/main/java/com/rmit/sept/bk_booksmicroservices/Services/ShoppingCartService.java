package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Repositories.ShoppingCartRepository;
import com.rmit.sept.bk_booksmicroservices.Exceptions.ShoppingCartException;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShoppingCartService {
    private static final Logger logger = LogManager.getLogger(ShoppingCartService.class);

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private BookService bookService;

    @Transactional
    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart)
    {
        try{
            Iterable<Book> books = bookService.getBookFromIds(shoppingCart.getCartContents());
            double totalCost = 0;
            for (Long id: shoppingCart.getCartContents()) {
                for (Book book : books) {
                    if (id == book.getId()) {
                        book.setStockLevel(book.getStockLevel() - 1);
                        totalCost += book.getBookCost();
                    }
                }
            }
            shoppingCart.setCartTotal(totalCost);

            return shoppingCartRepository.save(shoppingCart);
        }
        catch (Exception e)
        {
            logger.log(Level.ERROR, "Unable to create shopping cart");

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
            logger.log(Level.ERROR, "Unable to retrieve shopping cart");

            throw new ShoppingCartException("Unable to retrieve shopping carts.");
        }
    }
}
