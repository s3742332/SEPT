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

    //TODO CUSTOM LOGIC
    @PostMapping("")
    public ResponseEntity<Book> createNewBook(@RequestBody Book book)
    {
        Book book1 = bookService.saveOrUpdateBook(book);
        return new ResponseEntity<Book>(book, HttpStatus.CREATED);
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<?> getAllUsers(){
        Iterable<Book> bookList = bookService.g;

        return  new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }


}
