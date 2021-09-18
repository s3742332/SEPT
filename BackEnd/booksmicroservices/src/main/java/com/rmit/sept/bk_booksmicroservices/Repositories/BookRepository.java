package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

//    Book findByAuthorAndTitle(String author, String title);
    Book getById(Long id);
    List<Book> findBooksByAuthor(String author);
    List<Book> findBooksByBookTitle(String title);
    List<Book> findBooksByCategory(String category);
    List<Book> findBooksByUsed(boolean used);

}
