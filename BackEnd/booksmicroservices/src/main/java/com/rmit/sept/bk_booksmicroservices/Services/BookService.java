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
            book.setSeller(book.getSeller());
            book.setStockLevel(book.getStockLevel());
            book.setCategory(book.getCategory());
            book.setUsed(book.isUsed());

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
            // System.out.println("GET ALL BOOKS");
            // System.out.println(bookRepository);
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
            System.out.println(bookRepository.findBooksByCategory(category));
            return bookRepository.findBooksByCategory(category);
        }
        catch (Exception e)
        {
            throw new BookNotFoundException("Unable to retrieve book list");
        }

    }

    @Transactional
    public Iterable<Book> getAllBooksByCondition (Boolean used)
    {
        try
        {
            return bookRepository.findBooksByUsed(used);
        }
        catch (Exception e)
        {
            throw new BookNotFoundException("Unable to retrieve book list");
        }
    }

    @Transactional
    public Iterable<Book> getBookFromIds (Long[] idList) {
        try
        {
            return bookRepository.findBooksByIds(idList);
        }
        catch (Exception e)
        {
            System.out.println("ERROR IN BOOK RETRIEVAL");
            System.out.println(e);
            throw new BookNotFoundException("Unable to retrieve book list");
        }
    }

    @Transactional
    public Iterable<Book> getBookFromIdsAndSeller (Long[] idList, String seller) {
        try
        {
            return bookRepository.findBooksByIds(idList);
        }
        catch (Exception e)
        {
            System.out.println("ERROR IN BOOK RETRIEVAL");
            System.out.println(e);
            throw new BookNotFoundException("Unable to retrieve book list");
        }
    }
}
