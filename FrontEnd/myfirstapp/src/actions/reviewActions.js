import axios from "axios";
import { GET_ERRORS, UPDATE_REVIEW, GET_REVIEW,  GET_ALL_REVIEWS,REVIEW_LOADING } from "./types";

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


export const getAllReviews = () => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({ type: REVIEW_LOADING })
        const res = await axios.get(`http://localhost:8081/api/reviews/getAllReviews/`,config)
        dispatch({
            type: GET_ALL_REVIEWS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};

export const removeReview = (id, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        
        const res = await axios.post(`http://localhost:8081/api/reviews/deleteReview/${id}`,config)
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        });
        dispatch(getAllReviews())
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};