import { CREATE_TRANSACTION, GET_TRANSACTIONS, GET_SELLER_TRANSACTIONS, GET_USER_BOOKS, GET_ALL_TRANSACTIONS } from "../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    sellerTransaction: [],
    allTransactions: [],
    loading: true,
    userBooks: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return { ...state, createTransaction: action.payload, loading: false }
        case GET_ALL_TRANSACTIONS:
            return { ...state, allTransactions: action.payload, loading: false }
        case GET_TRANSACTIONS:
            return { ...state, userTransaction: action.payload, loading: false }
        case GET_SELLER_TRANSACTIONS:
            return { ...state, sellerTransaction: action.payload, loading: false }
        case GET_USER_BOOKS:
            return { ...state, userBooks: action.payload, loading: false }
        default:
            return state;
    }
}