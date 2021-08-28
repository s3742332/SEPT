package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // TODO CUSTOM LOGIC
    public Book saveOrUpdateBook(Book book)
    {
        return bookRepository.save(book);
    }
}
