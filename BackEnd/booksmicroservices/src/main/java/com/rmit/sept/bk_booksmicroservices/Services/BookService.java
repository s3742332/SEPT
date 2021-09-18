package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.BookNotFoundException;
import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    
    @Transactional
    public Book saveOrUpdateBook(Book book)
    {
        try{
            book.setBookTitle(book.getBookTitle());
            book.setAuthor(book.getAuthor());
            book.setBookCost(book.getBookCost());
            book.setBookDescription(book.getBookDescription());
            book.setCompanyName(book.getCompanyName());
            book.setStockLevel(book.getStockLevel());
            book.setCategory(book.getCategory());

            return bookRepository.save(book);

        }catch (Exception e){
            throw new BookNotFoundException("Unable to create book");
        }
    }

    @Transactional
    public Iterable<Book> getAllBooks ()
    {
        try
        {
            return bookRepository.findAll();
        }
        catch (Exception e)
        {
            throw new BookNotFoundException("Unable to retrieve book list");
        }

    }

    @Transactional
    public Iterable<Book> getAllBooksByCategory (String category)
    {
        try
        {
            return bookRepository.findBooksByCategory(category);
        }
        catch (Exception e)
        {
            throw new BookNotFoundException("Unable to retrieve book list");
        }

    }
}
