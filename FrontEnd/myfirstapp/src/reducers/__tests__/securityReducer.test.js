import securityReducer from "../securityReducer";
import { SET_CURRENT_USER, SET_CURRENT_USER_DETAILS, GET_CURRENT_USER_DETAILS, GET_CURRENT_USER } from "../../actions/types";

const initialState = {
    validToken: false,
    user: {},
    userDetails: {}
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

    test('handles set current user details', () => {
        expect(securityReducer(initialState, { type: SET_CURRENT_USER_DETAILS })).toEqual({
            ...initialState,
            userDetails: SET_CURRENT_USER_DETAILS.payload,
        });
    });

    test('handles get current user details', () => {
        expect(securityReducer(initialState, { type: GET_CURRENT_USER_DETAILS })).toEqual({
            ...initialState,
            userDetails: initialState.userDetails,
        });
    });

    test('handles get current user', () => {
        expect(securityReducer(initialState, { type: GET_CURRENT_USER })).toEqual({
            ...initialState,
        });
    });

});