package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.BookNotFoundException;
import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class BookService {

    private static final Logger logger = LogManager.getLogger(BookService.class);

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
            book.setCover(book.getCover());
            book.setPreview(book.getPreview());
            return bookRepository.save(book);

        }catch (Exception e){
            logger.log(Level.ERROR, "Unable to create book");
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
            logger.log(Level.ERROR, "Unable to get books");
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
            logger.log(Level.ERROR, "Unable to retrieve books by category");
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
            logger.log(Level.ERROR, "Unable to retrieve books by condition");
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
            logger.log(Level.ERROR, "Unable to retrieve books from IDs");
            throw new BookNotFoundException("Unable to retrieve book list");
        }
    }

    @Transactional
    public Book getBookFromId (Long id) {
        try
        {
            return bookRepository.findById(id).get();
        }
        catch (Exception e)
        {
            logger.log(Level.ERROR, "Unable to retrieve books from ID");
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
            logger.log(Level.ERROR, "Unable to retrieve books from ID and seller");
            throw new BookNotFoundException("Unable to retrieve book list");
        }
    }
}
