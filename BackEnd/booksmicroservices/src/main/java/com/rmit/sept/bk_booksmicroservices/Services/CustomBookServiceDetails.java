package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.BookNotFoundException;
import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomBookServiceDetails {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> loadBooksByAuthor(String author)
    {
        List<Book> books = bookRepository.findBooksByAuthor(author);

        if(books == null)
        {
            new BookNotFoundException("No books found");
        }

        return books;
    }

    public List<Book> loadBooksByTitle(String title)
    {
        List<Book> books = bookRepository.findBooksByAuthor(title);

        if(books == null)
        {
            new BookNotFoundException("No books found");
        }

        return books;
    }

//    public Book loadBooksByAuthorAndTitle(String author, String title)
//    {
//        Book book = bookRepository.findByAuthorAndTitle(author, title);
//
//        if(book == null)
//        {
//            new BookNotFoundException("No books found");
//        }
//
//        return book;
//    }

    @Transactional
    public Book loadBookById(Long id){
        Book book = bookRepository.getById(id);
        if(book==null) new BookNotFoundException("Book not found");
        return book;
    }


}
