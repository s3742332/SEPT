import securityReducer from "../securityReducer";
import { SET_CURRENT_USER, GET_CURRENT_USER } from "../../actions/types";

const initialState = {
    validToken: false,
    user: {}
};

describe('authenticate security reducer', () => {
    test('returns the initial state', () => {
        expect(securityReducer(undefined, {})).toEqual(initialState);
    });

    test('handles set current user', () => {
        expect(securityReducer(initialState, { type: SET_CURRENT_USER })).toEqual({
            ...initialState,
            validToken: !(!SET_CURRENT_USER.payload),
            user: SET_CURRENT_USER.payload,
        });
    });

    test('handles get current user', () => {
        expect(securityReducer(initialState, { type: GET_CURRENT_USER })).toEqual({
            ...initialState,
        });
    });

});