package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.web.BookController;

import static org.junit.Assert.assertEquals;

import com.rmit.sept.bk_booksmicroservices.Services.BookService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.MvcResult;

@ExtendWith(SpringExtension.class)
@WebMvcTest(BookController.class)
//@SpringBootTest
public class BookControllerTests {

    private static Book book1, book2;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @BeforeEach
    void setup() {
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

    @Test
    void createNewBookTest() throws Exception {
        
        //when(bookService.saveOrUpdateBook(any())).thenReturn(book1);
        
        Mockito.when(bookService.saveOrUpdateBook(Mockito.any(Book.class))).thenReturn(book1);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                        .post("/saveBook")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
    }
}
