package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.ShoppingCart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long> {

    ShoppingCart getById(Long id);
    List<ShoppingCart> findShoppingCartByUserName(String username);
    Iterable<ShoppingCart> findAll();
}
