import axios from "axios";
import { GET_ERRORS, SELLER_REVIEWS, SAVE_SELLER_REVIEW, REVIEW_LOADING } from "./types";

export const sellerReviewSave = (review) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/sellerreviews/saveSellerReview`, review, config );
        dispatch({
            type: SAVE_SELLER_REVIEW,
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

export const getSellerReviews = (username) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({ type: REVIEW_LOADING })
        const res = await axios.get(`http://localhost:8081/api/reviews/getAllReviews/${username}`,config)
        dispatch({
            type: SELLER_REVIEWS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};