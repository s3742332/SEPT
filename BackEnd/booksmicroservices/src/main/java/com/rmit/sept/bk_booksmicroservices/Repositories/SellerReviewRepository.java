package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.SellerReview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerReviewRepository extends CrudRepository<SellerReview, Long>
{
    Iterable<SellerReview> findAll();
}
