package com.rmit.sept.bk_booksmicroservices.BookTestFiles;

import com.rmit.sept.bk_booksmicroservices.web.BookController;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = BookController.class)
public class BookControllerTests {

    @Autowired
    MockMvc mockMvc;

//     @Test
//     public void getAllBooksTest() throws Exception {
//         mockMvc.perform(MockMvcRequestBuilders.get("/api/books/getAllBooks"))
//                 .andExpect(MockMvcResultMatchers.status().isOk());
//     }
}
    
