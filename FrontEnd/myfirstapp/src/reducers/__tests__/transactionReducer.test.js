import transactionReducer from "../transactionReducer";
import {CREATE_TRANSACTION, GET_ALL_TRANSACTIONS, GET_SELLER_TRANSACTIONS, GET_USER_BOOKS} from "../../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    sellerTransaction: [],
    allTransactions: [],
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

    test('handles get all transactions', () => {
        expect(transactionReducer(initialState, { type: GET_ALL_TRANSACTIONS })).toEqual({
            ...initialState,
            allTransactions: GET_ALL_TRANSACTIONS.payload,
            loading: false
        });
    });

    test('handles get transactions', () => {
        expect(transactionReducer(initialState, { type: GET_TRANSACTIONS })).toEqual({
            ...initialState,
            userTransaction: GET_TRANSACTIONS.payload, 
            loading: false
        });
    });

    test('handles get seller transactions', () => {
        expect(transactionReducer(initialState, { type: GET_SELLER_TRANSACTIONS })).toEqual({
            ...initialState,
            sellerTransaction: GET_SELLER_TRANSACTIONS.payload,
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