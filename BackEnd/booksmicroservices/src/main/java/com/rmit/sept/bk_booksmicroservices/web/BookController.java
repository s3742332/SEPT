package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveBook")
    public ResponseEntity<Book> createNewBook(@Valid @RequestBody Book book) {
        Book book1 = bookService.saveOrUpdateBook(book);
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllBooks")
    public ResponseEntity<?> getAllBook() {
        Iterable<Book> bookList = bookService.getAllBooks();

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
    public ResponseEntity<?> getBooksInCategory(@PathVariable String category)
    {
        // System.out.println(category);
        // Iterable<Book> bookList = bookService.getAllBooksByCategory(category);

        Iterable<Book> bookList = bookService.getAllBooks();
        ArrayList<Book> approvedBooks = new ArrayList<Book>();
        for (Book book : bookList) {
            List<String> arrayList = Arrays.asList(book.getCategory());
            if (book.getApproved().equals(true) && arrayList != null && arrayList.contains(category)) {
                approvedBooks.add(book);
            }
        }

        return new ResponseEntity<Iterable<Book>>(approvedBooks, HttpStatus.OK);
        // return "helo";
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBooksByCondition/{used}")
    public ResponseEntity<?> getBooksByCondition(@PathVariable String used)
    {
        boolean usedStatus = Boolean.valueOf(used);
        Iterable<Book> bookList = bookService.getAllBooksByCondition(usedStatus);

        return new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/sellUsedBook")
    public ResponseEntity<Book> createNewUsedBook(@Valid @RequestBody Book book) {
        book.setUsed(true);
        Book book1 = bookService.saveOrUpdateBook(book);
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

}
