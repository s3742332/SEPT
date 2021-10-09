import reviewReducer from "../reviewReducer";
import { UPDATE_REVIEW, GET_REVIEW, GET_ALL_REVIEWS, REVIEW_LOADING } from "../../actions/types";

const initialState = {
    review: [],
    allReviews: [],
    loading: false,
};

describe('authenticate review reducer', () => {
    test('returns the initial state', () => {
        expect(reviewReducer(undefined, {})).toEqual(initialState);
    });

    test('handles review loading', () => {
        expect(reviewReducer(initialState, { type: REVIEW_LOADING })).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('handles update review', () => {
        expect(reviewReducer(initialState, { type: UPDATE_REVIEW })).toEqual({
            ...initialState,
            loading: false
        });
    });

    test('handles get review', () => {
        expect(reviewReducer(initialState, { type: GET_REVIEW })).toEqual({
            ...initialState,
            review: GET_REVIEW.payload,
            loading: false
        });
    });

    test('handles get all reviews', () => {
        expect(reviewReducer(initialState, { type: GET_ALL_REVIEWS })).toEqual({
            ...initialState,
            allReviews: GET_ALL_REVIEWS.payload,
            loading: false
        });
    });
});