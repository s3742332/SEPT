// maz todo
import axios from "axios"
import {BOOK_BASE_URL, config, fetchReviewEdit, fetchGetReview} from "../../../utils" // change to my methods + add to utils.

jest.mock("axios");

describe("fetchReviewEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful review edit", async () => {
            const review = {bookId: 1}
            axios.post.mockResolvedValueOnce(review, config);

            const result = await fetchReviewEdit();

            expect(axios.post).toHaveBeenCalledWith("${BOOK_BASE_URL}/api/reviews/saveReview", review, config);

            expect(result).toEqual(review);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful review edit", async () => {
            const review = {bookId: 1}
            const message = "Error editing review";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchReviewEdit();

            expect(axios.post).toHaveBeenCalledWith("${BOOK_BASE_URL}/api/reviews/saveReview", review, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchGetReview", () => {
    describe("when API call is successful", () => {
        test("should return successful get review", async () => {
         
            const bookId = 1;
            axios.get.mockResolvedValueOnce(bookId, config);

            const result = await fetchGetReview();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/reviews/getBookReviews/${bookId}`, config);
            expect(result).toEqual(bookId);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful get reviews", async () => {
         
            const bookId = 1;
            const message = "Error retrieving reviews";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchGetReview();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/reviews/getBookReviews/${bookId}`, config);
            expect(result).toEqual([]);
        });
    });
});