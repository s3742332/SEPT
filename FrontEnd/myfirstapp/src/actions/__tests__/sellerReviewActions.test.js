import axios from "axios";
import {
    BOOK_BASE_URL,
    config,
    fetchSellerReviewSave,
    fetchGetSellerReviews,
    fetchReviewEdit,
    fetchGetReview, fetchGetAllReviews
} from "../../../utils";

jest.mock("axios");

describe("fetchSellerReviewSave", () => {
    describe("when API call is successful", () => {
        test("should return successful seller review save", async () => {
            const review = "abcdefg"
            axios.post.mockResolvedValueOnce(review, config);

            const result = await fetchSellerReviewSave();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/sellerreviews/saveSellerReview`, review, config);

            expect(result).toEqual(review);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful seller review save", async () => {
            const review = "abcdefg"
            const message = "Error saving seller review";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchReviewEdit();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/sellerreviews/saveSellerReview`, review, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchGetSellerReviews", () => {
    describe("when API call is successful", () => {
        test("should return successful get seller reviews", async () => {
            const username = "user@user.com"
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchGetSellerReviews();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/sellerreviews/getSellerReviews/${username}`,config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful get seller reviews", async () => {

            const username = "user@user.com"
            const message = "Error retrieving seller reviews";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchGetSellerReviews();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/sellerreviews/getSellerReviews/${username}`,config);
            expect(result).toEqual([]);
        });
    });
});