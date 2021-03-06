package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private static final Logger logger = LogManager.getLogger(BookController.class);

    @Autowired
    private BookService bookService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveBook")
    public ResponseEntity<Book> createNewBook(@Valid @RequestBody Book book) {
        Book book1 = bookService.saveOrUpdateBook(book);
        logger.log(org.apache.logging.log4j.Level.INFO, "Saving book");
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllBooks")
    public ResponseEntity<?> getAllBook() {
        Iterable<Book> bookList = bookService.getAllBooks();
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving books");
        return new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllPendingBooks")
    public ResponseEntity<?> getAllPendingBooks() {
        Iterable<Book> bookList = bookService.getAllBooks();
        ArrayList<Book> unapprovedBooks = new ArrayList<Book>();
        for (Book book : bookList) {
            if (book.getApproved().equals(false)) {
                unapprovedBooks.add(book);
            }
        }
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving pending books");
        return new ResponseEntity<Iterable<Book>>(unapprovedBooks, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllApprovedBooks")
    public ResponseEntity<?> getAllApprovedBooks() {
        Iterable<Book> bookList = bookService.getAllBooks();
        ArrayList<Book> approvedBooks = new ArrayList<Book>();
        for (Book book : bookList) {
            if (book.getApproved().equals(true)) {
                approvedBooks.add(book);
            }
        }
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving approved books");
        return new ResponseEntity<Iterable<Book>>(approvedBooks, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getSearchedBooks/{query}")
    public ResponseEntity<?> getSearchedBooks(@PathVariable String query) {
        System.out.println(query);
        Iterable<Book> bookList = bookService.getAllBooks();
        ArrayList<Book> searchedBooks = new ArrayList<Book>();
        for (Book book : bookList) {
            if (book.getApproved().equals(true) && (book.getAuthor().toLowerCase().contains(query.toLowerCase())
                    || book.getBookDescription().toLowerCase().contains(query.toLowerCase())
                    || book.getSeller().toLowerCase().contains(query.toLowerCase())
                    || book.getIsbn().toLowerCase().contains(query.toLowerCase())
                    || book.getBookTitle().toLowerCase().contains(query.toLowerCase()))) {
                searchedBooks.add(book);
            }
        }
        bookList = searchedBooks;
        System.out.println(bookList);
        return new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBooksInCategory/{category}")
    public ResponseEntity<?> getBooksInCategory(@PathVariable String category) {

        Iterable<Book> bookList = bookService.getAllBooks();
        ArrayList<Book> approvedBooks = new ArrayList<Book>();
        for (Book book : bookList) {
            List<String> arrayList = Arrays.asList(book.getCategory());
            if (book.getApproved().equals(true) && arrayList != null && arrayList.contains(category)) {
                approvedBooks.add(book);
            }
        }

        return new ResponseEntity<Iterable<Book>>(approvedBooks, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBooksByCondition/{used}")
    public ResponseEntity<?> getBooksByCondition(@PathVariable String used) {
        boolean usedStatus = Boolean.valueOf(used);
        Iterable<Book> bookList = bookService.getAllBooksByCondition(usedStatus);

        return new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/sellUsedBook")
    public ResponseEntity<Book> createNewUsedBook(@Valid @RequestBody Book book) {
        Iterable<Book> bookList = bookService.getAllBooks();
        for (Book item : bookList) {
            if (item.getBookTitle().equals(book.getBookTitle())) {
                book.setAuthor(item.getAuthor());
                book.setBookDescription(item.getBookDescription());
                book.setCategory(item.getCategory());
                book.setUsed(true);
                book.setCover(item.getCover());
            }
        }
        Book book1 = bookService.saveOrUpdateBook(book);
        logger.log(org.apache.logging.log4j.Level.INFO, "Adding book to sell");
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/shareBook")
    public void shareBook(@Valid @RequestBody Book book) throws IOException {
        File file = new File("../../" + book.getBookTitle() + ".txt");
        FileWriter fw = new FileWriter(file);
        PrintWriter pw = new PrintWriter(fw);

        pw.println("Title: " + book.getBookTitle());
        pw.println("Author: " + book.getAuthor());
        pw.println("Description: " + book.getBookDescription());
        pw.println("Seller: " + book.getSeller());
        pw.println("Price: " + book.getBookCost());

        pw.close();
    }

}
