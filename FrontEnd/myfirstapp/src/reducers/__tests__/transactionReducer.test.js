import transactionReducer from "../transactionReducer";
import {CREATE_TRANSACTION, GET_TRANSACTIONS, GET_USER_BOOKS} from "../../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    loading: true,
    userBooks: []
};

describe('authenticate transaction reducer', () => {
    test('returns the initial state', () => {
        expect(transactionReducer(undefined, {})).toEqual(initialState);
    });

    test('handles create transaction', () => {
            expect(transactionReducer(initialState, { type: CREATE_TRANSACTION })).toEqual({
            ...initialState,
            createTransaction: CREATE_TRANSACTION.payload,
            loading: false,
        });
    });

    test('handles get transactions', () => {
        expect(transactionReducer(initialState, { type: GET_TRANSACTIONS })).toEqual({
            ...initialState,
            userTransaction: GET_TRANSACTIONS.payload, 
            loading: false
        });
    });

    test('handles get user books', () => {
        expect(transactionReducer(initialState, { type: GET_USER_BOOKS })).toEqual({
            ...initialState,
            userBooks: GET_USER_BOOKS.payload,
            loading: false
        });
    });

});