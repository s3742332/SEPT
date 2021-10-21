package com.rmit.sept.bk_booksmicroservices.ReviewTestFiles;

import com.rmit.sept.bk_booksmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.bk_booksmicroservices.Services.BookService;
import com.rmit.sept.bk_booksmicroservices.Services.ReviewService;
import com.rmit.sept.bk_booksmicroservices.model.Book;
import com.rmit.sept.bk_booksmicroservices.model.Review;
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

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ReviewServiceTest {

    private static Review review;
    private LocalDateTime ldt;

    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private BookService bookService;

    @BeforeEach
    void setup() {
        ldt = LocalDateTime.now();
        review = new Review();
        review.setId(1L);
        review.setUsername("user@user.com");
        review.setReview("abcdefghijklmnopqrstuvwxyz");
        review.setBookId(1);
        review.setCreatedAt(ldt);
        review.setUpdatedAt(ldt);
        review.setRating(7);
    }

    @Test
    @DisplayName("Should pass if review is saved or updated to repository")
    void saveOrUpdateReviewTest() {
        // Add a book to the book repository
        Book book = new Book();
        book.setId(1L);
        book.setStockLevel(150);
        book.setBookCost(39.99);
        bookService.saveOrUpdateBook(book);

        Mockito.when(reviewRepository.save(review)).thenReturn(review);
        assertEquals(review, reviewService.saveOrUpdateReview(review));
    }

    @Test
    @DisplayName("Should pass if review by book id is correctly returned")
    void getReviewsByBookTest() {
        Book book = new Book();
        book.setId(1L);
        book.setStockLevel(150);
        book.setBookCost(39.99);
        bookService.saveOrUpdateBook(book);

        Mockito.when(reviewRepository.findReviewsByBookId(1)).thenReturn(Collections.singleton(review));
        assertEquals(Collections.singleton(review), reviewService.getReviewsByBook(1));
    }
    
    @Test
    @DisplayName("Should pass if review list matches")
    void getAllReviewsTest() {
        Mockito.when(reviewRepository.findAll()).thenReturn(Stream
                .of(review).collect(Collectors.toList()));

        assertEquals(1, ((List<Review>) reviewService.getAllReviews()).size());
    }

    @Test
    void deleteReviewTest() {
        Mockito.when(reviewRepository.save(review)).thenReturn(review);

        reviewService.deleteReview(1L);

        Mockito.verify(reviewRepository).deleteById(1L);
    }
}
