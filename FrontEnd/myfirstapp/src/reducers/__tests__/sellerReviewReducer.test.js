import sellerReviewReducer from "../sellerReviewReducer";
import {REVIEW_LOADING, SAVE_SELLER_REVIEW, SELLER_REVIEWS} from "../../actions/types";
import reviewReducer from "../reviewReducer";

const initialState = {
    reviews: [],
    loading: false,
};

describe('authenticate sellerReview reducer', () => {
    test('returns the initial state', () => {
        expect(sellerReviewReducer(undefined, {})).toEqual(initialState);
    });

    test('handles save seller review', () => {
        expect(sellerReviewReducer(initialState, { type: SAVE_SELLER_REVIEW })).toEqual({
            ...initialState,
            loading: false
        });
    });

    test('handles seller reviews', () => {
        expect(sellerReviewReducer(initialState, { type: SELLER_REVIEWS })).toEqual({
            ...initialState,
            reviews: SELLER_REVIEWS.payload,
            loading: false
        });
    });
});