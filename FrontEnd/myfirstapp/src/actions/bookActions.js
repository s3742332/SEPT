import axios from "axios";
import { GET_ERRORS, GET_PENDING_BOOK_LIST, GET_BOOK_LIST, UPDATE_BOOK } from "./types";

export const bookEdit = (book) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        console.log("bookInfoAction", book)
        const res = await axios.post(`http://localhost:8082/api/books/saveBook/`, book, config );
        dispatch({
            type: UPDATE_BOOK,
            payload: res.data
        })
    } catch (err) {
        console.log('error', err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getBookList = () => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8082/api/books/getAllBooks`, config)
        dispatch({
            type: GET_BOOK_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};

export const getPendingBookList = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8082/api/books/getAllPendingBooks`)
        dispatch({
            type: GET_PENDING_BOOK_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
