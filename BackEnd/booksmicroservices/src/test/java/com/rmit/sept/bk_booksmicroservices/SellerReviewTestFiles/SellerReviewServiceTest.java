package com.rmit.sept.bk_booksmicroservices.SellerReviewTestFiles;

import com.rmit.sept.bk_booksmicroservices.Repositories.SellerReviewRepository;
import com.rmit.sept.bk_booksmicroservices.Services.SellerReviewService;
import com.rmit.sept.bk_booksmicroservices.model.SellerReview;
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

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class SellerReviewServiceTest {

    private static SellerReview sellerReview;

    @InjectMocks
    private SellerReviewService sellerReviewService;

    @Mock
    private SellerReviewRepository sellerReviewRepository;

    @BeforeEach
    void setup() {
        sellerReview = new SellerReview();
        sellerReview.setId(1L);
        sellerReview.setUsername("user@user.com");
        sellerReview.setReview("abcdefg");
    }

    @Test
    @DisplayName("Should pass if seller review is saved or updated to repository")
    void saveOrUpdateSellerReviewTest() {
        Mockito.when(sellerReviewRepository.save(sellerReview)).thenReturn(sellerReview);
        assertEquals(sellerReview, sellerReviewService.saveOrUpdateSellerReview(sellerReview));
    }
}
