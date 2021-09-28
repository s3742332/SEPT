package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long>
{
    Review getById(Long id);
    List<Review> findReviewByUsername(String username);
    Iterable<Review> findAll();
    Iterable<Review> findReviewsByBookId(int bookId);

}
