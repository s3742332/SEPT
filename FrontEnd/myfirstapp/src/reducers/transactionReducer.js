import { CREATE_TRANSACTION, GET_TRANSACTIONS } from "../actions/types";

const initialState = {
    createTransaction: [],
    userTransaction: [],
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return { ...state, createTransaction: action.payload, loading: false }
        case GET_TRANSACTIONS:
            return { ...state, userTransaction: action.payload, loading: false }
        default:
            return state;
    }
}