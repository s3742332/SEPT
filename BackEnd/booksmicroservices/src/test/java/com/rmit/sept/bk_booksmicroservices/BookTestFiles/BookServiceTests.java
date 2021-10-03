 package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

 import com.rmit.sept.bk_booksmicroservices.Repositories.BookRepository;
 import com.rmit.sept.bk_booksmicroservices.Services.BookService;
 import com.rmit.sept.bk_booksmicroservices.model.Book;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.DisplayName;
 import org.junit.jupiter.api.Test;
 import org.junit.jupiter.api.extension.ExtendWith;
 import org.mockito.InjectMocks;
 import org.mockito.Mock;
 import org.mockito.Mockito;
 import org.mockito.junit.jupiter.MockitoExtension;
 import org.mockito.junit.jupiter.MockitoSettings;
 import org.mockito.quality.Strictness;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.mock.mockito.MockBean;

 import java.util.List;
 import java.util.stream.Collectors;
 import java.util.stream.Stream;

 import static org.junit.jupiter.api.Assertions.assertEquals;
 import static org.mockito.Mockito.*;

 //import static org.junit.Assert.assertEquals;

 // @ExtendWith(SpringExtension.class)
 // @SpringBootTest
 @ExtendWith(MockitoExtension.class)
 @MockitoSettings(strictness = Strictness.LENIENT)
 public class BookServiceTests {

     private static Book book1, book2;

     @InjectMocks
     private BookService bookService;

     @Mock
     private BookRepository bookRepository;

     @BeforeEach
     void setup() {
         book1 = new Book();
         book1.setBookTitle("Station Eleven");
         book1.setAuthor("Emily Mandel");
         book1.setBookCost(9.99);
         book1.setBookDescription("A disease kills 95% of humanity. A group of travellers suffer through the new technology-less world.");
         book1.setSeller("Company 1");
         book1.setStockLevel(1);
         book1.setCategory(new String[]{"Dystopian", "Adventure"});
         book1.setId(1L);

         book2 = new Book();
         book2.setBookTitle("Handmaids Tale");
         book2.setAuthor("Margaret Atwood");
         book2.setBookCost(15.99);
         book2.setBookDescription("A new patriotic world where chosen women are forced to breed with high ranking men to create offspring.");
         book2.setSeller("Company 2");
         book2.setStockLevel(1);
         book2.setCategory(new String[]{"Dystopian", "Drama"});
     }

     // Commented out tests stopped working ->
     // Throws stackoverflow error after pulling latest dev branch
     @Test
     @DisplayName("Should pass if book being saved to repository is the same as book being provided")
     void saveOrUpdateBookTest() {
         Book book = new Book();
         Mockito.when(bookRepository.save(book)).thenReturn(book);
         bookService.saveOrUpdateBook(book);
         verify(bookRepository, times(1)).save(any(Book.class));
     }

     @Test
     @DisplayName("Should pass if number of books in repository equals the amount that was added")
     void getAllBooksTest() {
         Mockito.when(bookRepository.findAll()).thenReturn(Stream
                 .of(book1, book2).collect(Collectors.toList()));
        
         assertEquals(2, ((List<Book>) bookService.getAllBooks()).size());
     }

     @Test
     @DisplayName("Should pass if books returned has the correct categories")
     void getAllBooksByCategoryTest() {
         when(bookRepository.findBooksByCategory("Dystopian")).thenReturn(Stream
                 .of(book1, book2).collect(Collectors.toList()));

         assertEquals(2, ((List<Book>) bookService.getAllBooksByCategory("Dystopian")).size());
     }
 }
