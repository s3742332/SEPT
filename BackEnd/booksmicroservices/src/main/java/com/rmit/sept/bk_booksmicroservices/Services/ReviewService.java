package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Exceptions.ReviewException;
import com.rmit.sept.bk_booksmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.bk_booksmicroservices.model.Review;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService
{
    private static final Logger logger = LogManager.getLogger(ReviewService.class);

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional
    public Review saveOrUpdateReview(Review review)
    {
        try
        {
            review.setReview(review.getReview());
            review.setRating(review.getRating());
            review.setUsername(review.getUsername());
            review.setBookId(review.getBookId());

            return reviewRepository.save(review);
        }
        catch (Exception e)
        {
            logger.log(Level.ERROR, "Unable to save review");

            throw new ReviewException("Unable to save review.");
        }
    }

    @Transactional
    public Iterable<Review> getReviewsByBook(int bookId)
    {
        try
        {
            return reviewRepository.findReviewsByBookId(bookId);
        }
        catch (Exception e)
        {
            logger.log(Level.INFO, "No reviews for this book");

            throw new ReviewException("No book reviews for this book");
        }
    }

    @Transactional
    public Iterable<Review> getAllReviews()
    {
        try
        {
            return reviewRepository.findAll();
        }
        catch (Exception e)
        {
            logger.log(Level.ERROR, "Unable to retrieve reviews");

            throw new ReviewException("No reviews");
        }
    }

    @Transactional
    public void deleteReview(Long id)
    {
        try
        {
            reviewRepository.deleteById(id);
        }
        catch (Exception e)
        {
            logger.log(Level.ERROR, "Unable to delete review");

            throw new ReviewException("Unable to delete review.");
        }
    }


}
