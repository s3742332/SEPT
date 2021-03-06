import axios from "axios";
import { GET_ERRORS, SAVE_MESSAGE, GET_MESSAGES } from "./types";

export const saveMessage = (message) => async dispatch => {
    
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_BOOK_URL}/api/messages/saveMessage/`, message, config);
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

export const getMessages = () => async dispatch => {
    
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`${process.env.REACT_APP_BOOK_URL}/api/messages/getMessages`, config)
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
