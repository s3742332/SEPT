import axios from "axios";
import { GET_ERRORS, SAVE_MESSAGE } from "./types";

export const saveMessage = (message) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/messages/saveMessage/`, message, config);
        dispatch({
            type: SAVE_MESSAGE,
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
        const res = await axios.get(`http://localhost:8081/api/books/getAllApprovedBooks`, config)
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
