package com.rmit.sept.bk_booksmicroservices.CartTestFiles;

import com.rmit.sept.bk_booksmicroservices.Repositories.ShoppingCartRepository;
import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.Services.ShoppingCartService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import com.rmit.sept.bk_booksmicroservices.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ShoppingCartServiceTests {

    private static ShoppingCart cart1, cart2;
    private static Long[] cartContents_1, cartContents_2;

    @InjectMocks
    private ShoppingCartService cartService;

    @Mock
    private ShoppingCartRepository cartRepository;

    @Mock
    private BookService bookService;

    @BeforeEach
    void setup() {
        cartContents_1 = new Long[]{1L};
        cart1 = new ShoppingCart();
        cart1.setId(1L);
        cart1.setCartTotal(39.99);
        cart1.setCartContents(cartContents_1);
        cart1.setUserName("user@user.com");

        cartContents_2 = new Long[]{1L, 2L};
        cart2 = new ShoppingCart();
        cart2.setId(2L);
        cart2.setCartTotal(49.99);
        cart2.setCartContents(cartContents_2);
        cart2.setUserName("user2@user.com");
    }

    @Test
    @DisplayName("Should pass if shopping cart being saved to repo is same as provided")
    void saveShoppingCartTest() {
        Book book = new Book();
        book.setId(1L);
        book.setStockLevel(150);
        book.setBookCost(39.99);
        bookService.saveOrUpdateBook(book);

        Mockito.when(cartRepository.save(cart1)).thenReturn(cart1);

        assertEquals(cart1, cartService.saveShoppingCart(cart1));
    }

    @Test
    @DisplayName("Should pass if shopping cart list matches")
    void getAllShoppingCartsTest() {
        Mockito.when(cartRepository.findAll()).thenReturn(Stream
                .of(cart1, cart2).collect(Collectors.toList()));

        assertEquals(2, ((List<ShoppingCart>) cartService.getAllShoppingCarts()).size());
    }
}
