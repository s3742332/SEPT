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
    @Transactional
    public List<Book> loadBooksByAuthor(String author)
    {
        List<Book> books = bookRepository.findBooksByAuthor(author);

        if(books == null)
        {
            new BookNotFoundException("No books found");
        }

        return books;
    }
    @Transactional
    public List<Book> loadBooksByTitle(String title)
    {
        List<Book> books = bookRepository.findBooksByAuthor(title);

        if(books == null)
        {
            new BookNotFoundException("No books found");
        }

        return books;
    }

    @Transactional
    public List<Book> loadBooksByCategory(String category)
    {
        List<Book> books = bookRepository.findBooksByCategory(category);

        if(books == null)
        {
            new BookNotFoundException("No books found");
        }

        return books;
    }

    @Transactional
    public Book loadBookById(Long id){
        Book book = bookRepository.getById(id);
        if(book==null) new BookNotFoundException("Book not found");
        return book;
    }


}
