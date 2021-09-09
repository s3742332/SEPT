package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/saveBook")
    public ResponseEntity<Book> createNewBook(@RequestBody Book book)
    {
        Book book1 = bookService.saveOrUpdateBook(book);
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<?> getAllBook(){
        Iterable<Book> bookList = bookService.getAllBooks();

        return  new ResponseEntity<Iterable<Book>>(bookList, HttpStatus.OK);
    }


}
