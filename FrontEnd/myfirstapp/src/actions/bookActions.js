import axios from "axios";
import { GET_ERRORS, GET_PENDING_BOOK_LIST, GET_BOOK_LIST, UPDATE_BOOK, GET_SEARCHED_BOOKS } from "./types";

export const bookEdit = (book) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        console.log("bookInfoAction", book)
        const res = await axios.post(`http://localhost:8082/api/books/saveBook/`, book, config);
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
        const res = await axios.get(`http://localhost:8082/api/books/getAllApprovedBooks`, config)
        console.log(res.data)
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
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8082/api/books/getAllPendingBooks`, config)
        console.log(res.data)
        console.log(axios.defaults.headers.common)
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

//Define cancelToken outside the function so that the previous token is retained
let cancelToken;
export const getSearchedBook = (query) => async dispatch => {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            cancelToken: cancelToken.token
        }
        const res = await axios.get(`http://localhost:8082/api/books/getSearchedBooks/${query}`, config)
        // console.log(res.data)
        dispatch({
            type: GET_SEARCHED_BOOKS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
