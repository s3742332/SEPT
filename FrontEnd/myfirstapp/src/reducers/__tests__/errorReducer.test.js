import errorReducer from "../errorReducer";
import { GET_ERRORS } from "../../actions/types";

const initialState = {
    error: {},
};

describe('authenticate error reducer', () => {
    test('returns the initial state', () => {
        expect(errorReducer(undefined, {})).toEqual(initialState);
    });

    test('handles get errors', () => {
        expect(errorReducer(initialState, { type: GET_ERRORS })).toEqual({
            error: GET_ERRORS.payload
        });
    });
});