package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.ReviewService;
import com.rmit.sept.bk_booksmicroservices.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController
{

    @Autowired
    private ReviewService reviewService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveReview")
    public ResponseEntity<Review> createNewReview(@Valid @RequestBody Review review)
    {
        Review review1 = reviewService.saveOrUpdateReview(review);
        return new ResponseEntity<Review>(review1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getBookReviews/{bookId}")
    public ResponseEntity<?> getAllBooksByBookId(@PathVariable int bookId)
    {
        Iterable<Review> reviews = reviewService.getReviewsByBook(bookId);
        return new ResponseEntity<Iterable<Review>>(reviews, HttpStatus.OK);
    }
}
