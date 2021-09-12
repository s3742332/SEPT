package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BookServiceTests {

    private static Book book1, book2;

    @Autowired
    private BookService bookService;

    @MockBean
    private BookRepository bookRepository;


    @Test
    void saveOrUpdateBookTest() {
        createDummyBooks();

        when(bookRepository.save(book1)).thenReturn(book1);

        assertEquals(book1, bookService.saveOrUpdateBook(book1));
    }

    @Test
    void getAllBooksTest() {
        createDummyBooks();

        when(bookRepository.findAll()).thenReturn(Stream
                .of(book1, book2).collect(Collectors.toList()));
        
        assertEquals(2, ((List<Book>) bookService.getAllBooks()).size());
        
    }

    private void createDummyBooks() {
        book1 = new Book();
        book1.setBookTitle("Station Eleven");
        book1.setAuthor("Emily Mandel");
        book1.setBookCost(9.99);
        book1.setBookDescription("A disease kills 95% of humanity. A group of travellers suffer through the new technology-less world.");
        book1.setCompanyName("Company 1");
        book1.setStockLevel(1);

        book2 = new Book();
        book2.setBookTitle("Handmaids Tale");
        book2.setAuthor("Margaret Atwood");
        book2.setBookCost(15.99);
        book2.setBookDescription("A new patriotic world where chosen women are forced to breed with high ranking men to create offspring.");
        book2.setCompanyName("Company 2");
        book2.setStockLevel(1);
    }

}
