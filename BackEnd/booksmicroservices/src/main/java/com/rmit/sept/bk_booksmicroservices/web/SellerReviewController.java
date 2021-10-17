package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Services.SellerReviewService;
import com.rmit.sept.bk_booksmicroservices.model.SellerReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/sellerreviews")
public class SellerReviewController
{
    @Autowired
    private SellerReviewService sellerReviewService;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveSellerReview")
    public ResponseEntity<SellerReview> createNewSellerReview(@Valid @RequestBody SellerReview review)
    {
        SellerReview review1 = sellerReviewService.saveOrUpdateSellerReview(review);
        return new ResponseEntity<SellerReview>(review1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getSellerReviews/{username}")
    public ResponseEntity<?> getSellerReviews(@PathVariable String username)
    {
        Iterable<SellerReview> reviews = sellerReviewService.getReviewsByUsername(username);
        return new ResponseEntity<Iterable<SellerReview>>(reviews, HttpStatus.OK);
    }
}
