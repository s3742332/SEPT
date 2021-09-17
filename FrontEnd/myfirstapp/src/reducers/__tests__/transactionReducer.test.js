import transactionReducer from "../transactionReducer";
import { CREATE_TRANSACTION, GET_TRANSACTIONS } from "../../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    loading: true
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

});