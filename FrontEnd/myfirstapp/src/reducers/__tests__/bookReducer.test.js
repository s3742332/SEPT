import bookReducer from "../bookReducer";
import {
    GET_PENDING_BOOK_LIST,
    GET_BOOK_LIST,
    GET_SEARCHED_BOOKS,
    BOOK_LOADING,
    BOOK_EDIT_LOADING,
    UPDATE_BOOK,
    GET_CATEGORY
} from "../../actions/types";

const initialState = {
    bookList: [],
    pendingBookList: [],
    searchedBooks: [],
    loading: false,
    editLoading: false
};

describe('authenticate book reducer', () => {
    test('returns the initial state', () => {
        expect(bookReducer(undefined, {})).toEqual(initialState);
    });

    test('handles get book loading', () => {
        expect(bookReducer(initialState, { type: BOOK_LOADING })).toEqual({
            ...initialState,
            loading: true,
        });
    });

    test('handles get book edit loading', () => {
        expect(bookReducer(initialState, { type: BOOK_EDIT_LOADING })).toEqual({
            ...initialState,
            editLoading: true,
        });
    });

    test('handles get update book', () => {
        expect(bookReducer(initialState, { type: UPDATE_BOOK })).toEqual({
            ...initialState,
            editLoading:false,
        });
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

    test('handles get category', () => {
        expect(bookReducer(initialState, { type: GET_CATEGORY })).toEqual({
            ...initialState,
            searchedBooks: GET_CATEGORY.payload,
            loading: false,
        });
    });
});