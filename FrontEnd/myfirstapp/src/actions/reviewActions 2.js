import axios from "axios";
import { GET_ERRORS, UPDATE_REVIEW, GET_REVIEW } from "./types";

export const reviewEdit = (data, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/reviews/saveReview`, data, config );
        dispatch({
            type: UPDATE_REVIEW,
            payload: res.data
        })
        console.log("FETCHING CART AFTER EDIT")
        dispatch(getReview(data.bookId, history, devTool))
        
    } catch (err) {
        console.log('error', err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getReview = (bookid, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8081/api/reviews/getBookReviews/${bookid}`,config)
        dispatch({
            type: GET_REVIEW,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};


