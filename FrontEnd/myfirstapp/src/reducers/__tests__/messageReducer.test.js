import messageReducer from "../messageReducer";
import {SAVE_MESSAGE, GET_MESSAGES} from "../../actions/types";

const initialState = {
    loading: false,
    messageList: []
};

describe('authenticate message reducer', () => {
    test('returns the initial state', () => {
        expect(messageReducer(undefined, {})).toEqual(initialState);
    });

    test('handles save message', () => {
        expect(messageReducer(initialState, { type: SAVE_MESSAGE })).toEqual({
            ...initialState,
            loading: false
        });
    });

    test('handles get messages', () => {
        expect(messageReducer(initialState, { type: GET_MESSAGES })).toEqual({
            ...initialState,
            loading: false,
            messageList: GET_MESSAGES.payload
        });
    });
});