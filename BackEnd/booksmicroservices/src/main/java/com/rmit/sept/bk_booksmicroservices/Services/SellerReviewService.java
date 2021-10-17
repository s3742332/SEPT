package com.rmit.sept.bk_booksmicroservices.Services;

import java.util.ArrayList;

import com.rmit.sept.bk_booksmicroservices.Exceptions.ReviewException;
import com.rmit.sept.bk_booksmicroservices.Repositories.SellerReviewRepository;
import com.rmit.sept.bk_booksmicroservices.model.SellerReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SellerReviewService
{
    @Autowired
    private SellerReviewRepository sellerReviewRepository;

    @Transactional
    public SellerReview saveOrUpdateSellerReview(SellerReview review)
    {
        try
        {
            review.setReview(review.getReview());

            return sellerReviewRepository.save(review);
        }
        catch (Exception e)
        {
            throw new ReviewException("Unable to save review.");
        }
    }

    @Transactional
    public Iterable<SellerReview> getReviewsByUsername(String username)
    {
        try
        {
            ArrayList<SellerReview> reviews = new ArrayList<SellerReview>();
            for (SellerReview review : sellerReviewRepository.findAll()) {
                if (review.getUsername().equals(username)) {
                    reviews.add(review);
                }
            }
            return reviews;
        }
        catch (Exception e)
        {
            throw new ReviewException("No reviews for this user");
        }
    }
}
