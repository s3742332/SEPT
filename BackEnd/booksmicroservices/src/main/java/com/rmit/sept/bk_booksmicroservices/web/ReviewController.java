package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.ReviewService;
import com.rmit.sept.bk_booksmicroservices.model.Review;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController
{
    private static final Logger logger = LogManager.getLogger(ReviewController.class);

    @Autowired
    private ReviewService reviewService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveReview")
    public ResponseEntity<Review> createNewReview(@Valid @RequestBody Review review)
    {
        Review review1 = reviewService.saveOrUpdateReview(review);
        logger.log(org.apache.logging.log4j.Level.INFO, "Saving review");
        return new ResponseEntity<Review>(review1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBookReviews/{bookId}")
    public ResponseEntity<?> getAllBooksByBookId(@PathVariable int bookId)
    {
        Iterable<Review> reviews = reviewService.getReviewsByBook(bookId);
        logger.log(org.apache.logging.log4j.Level.INFO, "Getting reviews for book " + bookId);

        return new ResponseEntity<Iterable<Review>>(reviews, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllReviews")
    public ResponseEntity<?> getAllReviews()
    {
        Iterable<Review> reviews = reviewService.getAllReviews();
        logger.log(org.apache.logging.log4j.Level.INFO, "Retrieving all reviews");

        return new ResponseEntity<Iterable<Review>>(reviews, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/deleteReview/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId)
    {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
