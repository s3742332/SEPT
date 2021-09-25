import { CREATE_TRANSACTION, GET_TRANSACTIONS, GET_USER_BOOKS } from "../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    loading: true,
    userBooks: []
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return { ...state, createTransaction: action.payload, loading: false }
        case GET_TRANSACTIONS:
            return { ...state, userTransaction: action.payload, loading: false }
        case GET_USER_BOOKS:
            return { ...state, userBooks: action.payload, loading: false }
        default:
            return state;
    }
}