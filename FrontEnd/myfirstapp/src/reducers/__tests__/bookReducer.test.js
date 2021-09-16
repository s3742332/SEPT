import bookReducer from "../bookReducer";
import { GET_PENDING_BOOK_LIST, GET_BOOK_LIST, GET_SEARCHED_BOOKS } from "../../actions/types";

const initialState = {
    bookList: [],
    pendingBookList: [],
    searchedBooks: [],
    loading: true
};

describe('authenticate book reducer', () => {
    test('returns the initial state', () => {
        expect(bookReducer(undefined, {})).toEqual(initialState);
    });

    test('handles get book list', () => {
        expect(bookReducer(initialState, { type: GET_BOOK_LIST })).toEqual({
            ...initialState,
            bookList: GET_BOOK_LIST.payload,
            loading: false,
        });
    });

    test('handles get pending book list', () => {
        expect(bookReducer(initialState, { type: GET_PENDING_BOOK_LIST })).toEqual({
            ...initialState,
            pendingBookList: GET_PENDING_BOOK_LIST.payload, 
            loading: false,
        });
    });

    test('handles get searched books', () => {
        expect(bookReducer(initialState, { type: GET_SEARCHED_BOOKS })).toEqual({
            ...initialState,
            searchedBooks: GET_SEARCHED_BOOKS.payload,
            loading: false,
        });
    });
});