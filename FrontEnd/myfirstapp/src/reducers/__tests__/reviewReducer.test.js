import reviewReducer from "../reviewReducer";
import { UPDATE_REVIEW, GET_REVIEW } from "../../actions/types";

const initialState = {
    review: [],
    loading: false,
};

describe('authenticate review reducer', () => {
    test('returns the initial state', () => {
        expect(reviewReducer(undefined, {})).toEqual(initialState);
    });

    test('handles update cart', () => {
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
});